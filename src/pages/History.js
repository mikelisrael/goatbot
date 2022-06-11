import React, { useState, useEffect } from "react";
import Badge from "../components/Badge";
import Table from "../components/Table";
// import { latestOrders } from "../assets/JsonData/tableData";
import { v4 as uuidv4 } from "uuid";
import AccountsDropdown from "../components/AccountsDropdown";
import "./styles/history.css";
import { useGlobalContext } from "../context";
import { convertPriceToDollars, formatDate } from "../utils/helperFunctions";

const History = () => {
  const [selected, setSelected] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [inStorage, setInStorage] = useState(false);
  const { customFetch } = useGlobalContext();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await customFetch(
        "http://137.184.44.121/api/order/list?limit=10"
      );

      if (data) {
        setOrderHistory(data.data);
      }
    };

    fetchOrders();
  }, [customFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const handleChange = useCallback(() => {
  //   let newHistory;

  //   // if none
  //   if (!searchTerm && !selected && !inStorage) {
  //     setOrderHistory(latestOrders.body);
  //   }

  //   // if searchterm all 3, 1st - searchterm
  //   if (searchTerm) {
  //     newHistory = latestOrders.body.filter((val) =>
  //       val.id.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     if (selected) {
  //       newHistory = latestOrders.body.filter(
  //         (val) =>
  //           val.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //           val.email === selected
  //       );
  //     }
  //     if (inStorage) {
  //       newHistory = latestOrders.body.filter(
  //         (val) =>
  //           val.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //           val.email === selected &&
  //           val.status === inStorage
  //       );
  //     }
  //     setOrderHistory(newHistory);
  //   }

  //   // if only email, then searchterm
  //   if (selected) {
  //     newHistory = latestOrders.body.filter((val) => val.email === selected);
  //     if (searchTerm) {
  //       newHistory = orderHistory.filter(
  //         (val) =>
  //           val.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //           val.email === selected
  //       );
  //     }
  //     setOrderHistory(newHistory);
  //   }

  //   // if only in storage
  //   if (inStorage) {
  //     newHistory = latestOrders.body.filter((val) => val.status === inStorage);
  //     if (searchTerm) {
  //       newHistory = orderHistory.filter(
  //         (val) =>
  //           val.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //           val.status === inStorage
  //       );
  //     }
  //     if (selected) {
  //       newHistory = orderHistory.filter(
  //         (val) => val.status === inStorage && val.email === selected
  //       );
  //     }
  //     setOrderHistory(newHistory);
  //   }
  // }, [inStorage, searchTerm, selected, orderHistory]);

  // useEffect(() => {
  //   handleChange();
  // }, [selected, inStorage, searchTerm, handleChange]);

  const tableHeader = [
    "s/n",
    "date/time",
    "shoe name",
    "sku",
    "size",
    "price",
    "account",
    "storage",
  ];

  const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

  const renderOrderBody = (item, index) => (
    <tr key={uuidv4()}>
      <td>{index + 1}</td>
      <td>{formatDate(item.purchasedAt)}</td>
      <td className="shoe-name">{item.title}</td>
      <td>{item.sku}</td>
      <td>{item.size}</td>
      <td>${convertPriceToDollars(item.priceCents)}</td>
      <td>{item.account}</td>
      <td>
        <Badge type={item.status} />
      </td>
    </tr>
  );

  return (
    <div className="history">
      <h2 className="page-header">Order history</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Search SKU or Shoe Name"
          name="sku"
          // onChange={(e) => {
          //   setSearchTerm(e.target.value);
          // }}
        />

        <AccountsDropdown selected={selected} setSelected={setSelected} />

        <div>
          <input id="storage" type="checkbox" />
          <label
            htmlFor="storage"
            onClick={() => {
              setInStorage(!inStorage);
            }}
          >
            <span></span>
            In storage?
          </label>
        </div>
      </form>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                headData={tableHeader}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={orderHistory}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(History);
