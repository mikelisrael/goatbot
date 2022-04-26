import { useState } from "react";
import {
  latestOrders,
  outstandingOffersHead,
} from "../assets/JsonData/tableData";
import Table from "../components/Table";
import { FaTrash } from "react-icons/fa/";
import "./styles/outstanding.css";
import { useGlobalContext } from "../context";
import Alert from "../components/Alert";

const OutstandingOffers = () => {
  const tableHead = ["s/n", ...outstandingOffersHead, ""];
  const [outStandingOffers, setOutStandingOffers] = useState(latestOrders.body);
  const [selMultiple, setSelMultiple] = useState(false);
  const [selected, setSelected] = useState([]);
  const { showAlert, displayAlert } = useGlobalContext();

  const renderCustomHeader = (item, index) => <th key={index}>{item}</th>;

  const renderCustomBody = (item, index) => (
    <tr
      key={index}
      className={`${
        selMultiple && selected.includes(item.id) && "selected_item"
      }`}
    >
      <td>{index + 1}</td>
      <td className="shoe-name">{item.user}</td>
      <td>{item.id}</td>
      <td>{item.size}</td>
      <td>{item.size}</td>
      {!selMultiple ? (
        <td className="expand-btn">Expand</td>
      ) : (
        <td
          className="activated_sel"
          onClick={() => {
            selected.includes(item.id)
              ? setSelected(selected.filter((value) => value !== item.id))
              : setSelected([...selected, item.id]);
          }}
        >
          {selected.includes(item.id) ? "Deselect" : "Select"}
        </td>
      )}
    </tr>
  );

  const deleteMultiple = () => {
    setOutStandingOffers(
      outStandingOffers.filter((item) => !selected.includes(item.id))
    );
    displayAlert(
      true,
      `${selected.length} ${
        selected.length > 1 ? "accounts" : "account"
      } removed`,
      "danger"
    );
    setSelected([]);
  };

  return (
    <div>
      <h2 className="page-header">Outstanding Offers</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body inline">
              <div className="sort_filter_div">
                <span>Sort SKU:</span>
                <span title="sort a-z">
                  <i className="bx bx-sort-a-z"></i>
                </span>
                <span title="sort z-a">
                  <i className="bx bx-sort-z-a"></i>
                </span>
                <span title="sort smallest to largest">
                  <i className="bx bx-sort-up"></i>
                </span>
                <span title="sort largest to smallest">
                  <i className="bx bx-sort-down"></i>
                </span>
              </div>

              <div className="sort_filter_div">
                <span>Select Multiple:</span>
                <span
                  onClick={() => setSelMultiple(!selMultiple)}
                  className={`${selMultiple && "activate-del"}`}
                >
                  {!selMultiple ? (
                    <i className="bx bx-select-multiple"></i>
                  ) : (
                    <i className="bx bxs-select-multiple"></i>
                  )}
                </span>
                <span
                  title="Delete multiple"
                  className="delete-btn"
                  onClick={deleteMultiple}
                >
                  {selected.length > 0 && <FaTrash />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                headData={tableHead}
                renderHead={(item, index) => renderCustomHeader(item, index)}
                bodyData={outStandingOffers}
                renderBody={(item, index) => renderCustomBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
      {showAlert.show && <Alert {...showAlert} removeAlert={displayAlert} />}
    </div>
  );
};

export default OutstandingOffers;
