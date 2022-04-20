import { useState } from "react";
import Badge from "../components/Badge";
import Table from "../components/Table";
import { latestOrders } from "../assets/JsonData/tableData";
import { v4 as uuidv4 } from "uuid";
import AccountsDropdown from "../components/AccountsDropdown";
import "./styles/history.css";

const History = () => {
  const [selected, setSelected] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
      <td>{item.date}</td>
      <td>{item.user}</td>
      <td>{item.id}</td>
      <td>{item.size}</td>
      <td>{item.price}</td>
      <td className="table-emails">{item.email}</td>
      <td>
        <Badge type={item.status} />
      </td>
    </tr>
  );

  return (
    <div className="history">
      <h2 className="page-header">Order history</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="search sku" name="sku" />

        <AccountsDropdown selected={selected} setSelected={setSelected} />

        <div>
          <input id="storage" type="checkbox" name="quantity" />
          <label htmlFor="storage">
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
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
