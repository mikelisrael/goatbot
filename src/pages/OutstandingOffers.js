import { useState, useEffect, useRef } from "react";
import {
  // latestOrders,
  outstandingOffersHead,
} from "../assets/JsonData/tableData";
import Table from "../components/Table";
import { FaTrash } from "react-icons/fa/";
import { useGlobalContext } from "../context";
import { toast } from "react-toastify";
import Dialogue from "../components/Dialogue";
import "./styles/outstanding.css";
import { convertPriceToDollars } from "../utils/helperFunctions";

const OutstandingOffers = () => {
  const tableHead = ["s/n", ...outstandingOffersHead, ""];
  const [outStandingOffers, setOutStandingOffers] = useState([]);
  const [selMultiple, setSelMultiple] = useState(false);
  const [selected, setSelected] = useState([]);
  const { toastOptions, customFetch } = useGlobalContext();
  const [sortAtoZ, setSortAtoZ] = useState("asc");
  const [sortLength, setSortLength] = useState("asc");
  const [showDialogue, setShowDialogue] = useState(false);
  const [previousSelected, setPreviousSelected] = useState(0);
  let currentSelected;

  // fetch outstanding offers
  useEffect(() => {
    const fetchOffers = async () => {
      const data = await customFetch("http://137.184.44.121/api/offer/list");

      setOutStandingOffers(data.data);
    };

    fetchOffers();
  }, [customFetch]);

  useEffect(() => {
    if (selected.length > 0) {
      setSelMultiple(true);
    }
  }, [selected]);

  const ClickHighlight = (event, item) => {
    if (event.ctrlKey) {
      setPreviousSelected(outStandingOffers.indexOf(item));

      selected.includes(item.id)
        ? setSelected(selected.filter((value) => value !== item.id))
        : setSelected([...selected, item.id]);
    }

    if (event.shiftKey) {
      currentSelected = outStandingOffers.indexOf(item);

      if (currentSelected < previousSelected) {
        setSelected(
          outStandingOffers
            .slice(currentSelected, previousSelected + 1)
            .map((item) => item.id)
        );
      } else {
        setSelected(
          outStandingOffers
            .slice(previousSelected, currentSelected + 1)
            .map((item) => item.id)
        );
      }
    }
  };

  // show image and remove image on timeout
  const preview = useRef(null);
  const [ID, setID] = useState(0);

  const displayImage = (e) => {
    setID(
      setTimeout(() => {
        if (!selMultiple) {
          preview?.current.classList.add("show-image");
        }
      }, 500)
    );

    var x = e.clientX;
    var y = e.clientY;

    preview.current.style.left = x + "px";
    preview.current.style.top = y + "px";
  };

  const removeImage = () => {
    preview?.current.classList.remove("show-image");
    clearTimeout(ID);
  };

  // render table head and body
  const renderCustomHeader = (item, index) => <th key={index}>{item}</th>;

  const renderCustomBody = (item, index) => {
    const { title, sku: id, imageURL, size, price } = item;

    // TODO: implement number of offers
    return (
      <tr
        key={index}
        className={`${
          selMultiple && selected.includes(item.id) && "selected_item"
        }`}
        onMouseDown={(e) => ClickHighlight(e, item)}
        style={{ userSelect: "none" }}
        onMouseOver={(e) => displayImage(e)}
        onMouseLeave={() => removeImage()}
      >
        <td>{index + 1}</td>
        <td className="shoe-name">{title}</td>
        <td>{id}</td>
        <td>{size}</td>
        <td>${convertPriceToDollars(price)}</td>
        {!selMultiple ? (
          <td className="expand-btn" onClick={() => setShowDialogue(true)}>
            Expand
          </td>
        ) : (
          <td
            className="activated_sel"
            onClick={() => {
              selected.includes(item.id)
                ? setSelected(selected.filter((value) => value !== item.id))
                : setSelected([...selected, item.id]);

              setPreviousSelected(outStandingOffers.indexOf(item));
            }}
          >
            {selected.includes(item.id) ? "Deselect" : "Select"}
          </td>
        )}

        <td ref={preview} className="image-container">
          <img src={imageURL} alt={title} />
        </td>
      </tr>
    );
  };

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
    setPreviousSelected(0);
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
    <>
      <div className={`outstanding-offers ${showDialogue && "blur"}`}>
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
                        sortLength === "asc"
                          ? "bx bx-sort-down"
                          : "bx bx-sort-up"
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

                  {selected.length > 0 && selMultiple && (
                    <>
                      <span
                        data-title="Delete Multiple"
                        className="delete-btn tooltip"
                        onClick={deleteMultiple}
                      >
                        <FaTrash />
                      </span>

                      <span>{selected.length}</span>
                    </>
                  )}
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

      {showDialogue && <Dialogue setShowDialogue={setShowDialogue} />}
    </>
  );
};

export default OutstandingOffers;
