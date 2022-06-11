import { useEffect, useState } from "react";
// import { latestOrders } from "../assets/JsonData/tableData";
import StorageDialogue from "../components/StorageDialogue";
import Table from "../components/Table";
import { useGlobalContext } from "../context";
import { convertPriceToDollars } from "../utils/helperFunctions";

const Storage = () => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [storage, setStorage] = useState([]);
  const [offset, setOffset] = useState(0);
  const { customFetch } = useGlobalContext();

  //fetch storage
  useEffect(() => {
    const fetchStorage = async () => {
      const data = await customFetch(
        `http://137.184.44.121/api/storage/list?offset=${offset}`
      );

      setStorage(data.data);
    };

    fetchStorage();
  }, [customFetch, offset]);

  const storageHeader = [
    "s/n",
    "shoe name",
    "SKU",
    "size",
    "avg. purchase price",
    "qty. in storage",
    "",
  ];

  const next = () => {
    setOffset(offset + 10);
  };

  const prev = () => {
    if (offset < 1) {
      setOffset(0);
    } else {
      setOffset(offset - 10);
    }
  };

  const renderCustomHeader = (item, index) => <th key={index}>{item}</th>;

  const renderCustomBody = (item, index) => {
    const { title, sku: id, quantity, purchasePrice: price, size } = item;

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className="shoe-name">{title}</td>
        <td>{id}</td>
        <td>{size}</td>
        <td>${convertPriceToDollars(price)}</td>
        <td>{quantity}</td>
        <td className="expand-btn" onClick={() => setShowDialogue(true)}>
          Expand
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className={`${showDialogue && "blur"}`}>
        <h2 className="page-header">current storage</h2>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Table
                  headData={storageHeader}
                  renderHead={(item, index) => renderCustomHeader(item, index)}
                  bodyData={storage}
                  renderBody={(item, index) => renderCustomBody(item, index)}
                />

                <div className="table__pagination">
                  <div
                    className="table__pagination-item"
                    onClick={() => prev()}
                  >
                    <i className="bx bx-caret-left"></i>
                  </div>
                  <div
                    className="table__pagination-item"
                    onClick={() => next()}
                  >
                    <i className="bx bx-caret-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDialogue && <StorageDialogue setShowDialogue={setShowDialogue} />}
    </>
  );
};

export default Storage;
