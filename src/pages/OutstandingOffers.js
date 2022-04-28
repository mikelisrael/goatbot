import { useState } from "react";
import {
  latestOrders,
  outstandingOffersHead,
} from "../assets/JsonData/tableData";
import Table from "../components/Table";
import { FaTrash } from "react-icons/fa/";
import { useGlobalContext } from "../context";
import { toast } from "react-toastify";
import "./styles/outstanding.css";

const OutstandingOffers = () => {
  const tableHead = ["s/n", ...outstandingOffersHead, ""];
  const [outStandingOffers, setOutStandingOffers] = useState(latestOrders.body);
  const [selMultiple, setSelMultiple] = useState(false);
  const [selected, setSelected] = useState([]);
  const { toastOptions } = useGlobalContext();
  const [sortAtoZ, setSortAtoZ] = useState("asc");
  const [sortLength, setSortLength] = useState("asc");

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
    toast.error(
      `${selected.length} ${
        selected.length > 1 ? "accounts" : "account"
      } removed`,
      toastOptions
    );
    setSelected([]);
  };

  const sortAlphabetically = () => {
    if (sortAtoZ === "asc") {
      outStandingOffers.sort((a, b) => (a.id > b.id ? 1 : -1));
      setSortAtoZ("dsc");
    }
    if (sortAtoZ === "dsc") {
      outStandingOffers.sort((a, b) => (a.id > b.id ? -1 : 1));
      setSortAtoZ("asc");
    }
  };

  const sortByLength = () => {
    if (sortLength === "asc") {
      outStandingOffers.sort((a, b) => (a.id.length > b.id.length ? 1 : -1));
      setSortLength("dsc");
    }
    if (sortLength === "dsc") {
      outStandingOffers.sort((a, b) => (a.id.length > b.id.length ? -1 : 1));
      setSortLength("asc");
    }
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
                <span
                  className="tooltip"
                  data-title={`sort ${sortAtoZ === "asc" ? "a-z" : "z-a"}`}
                  onClick={sortAlphabetically}
                >
                  <i
                    className={` ${
                      sortAtoZ === "asc" ? "bx bx-sort-z-a" : "bx bx-sort-a-z"
                    } `}
                  ></i>
                </span>
                <span
                  className="tooltip"
                  data-title={`sort ${
                    sortLength === "asc"
                      ? "smallest to largest"
                      : "largest to smallest"
                  } `}
                  onClick={sortByLength}
                >
                  <i
                    className={`${
                      sortLength === "asc" ? "bx bx-sort-down" : "bx bx-sort-up"
                    }`}
                  ></i>
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
                  data-title="Delete Multiple"
                  className="delete-btn tooltip"
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
    </div>
  );
};

export default OutstandingOffers;
