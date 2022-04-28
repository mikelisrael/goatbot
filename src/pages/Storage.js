// import { useState } from "react";
import { latestOrders } from "../assets/JsonData/tableData";
import Table from "../components/Table";

const Storage = () => {
  const storage = latestOrders.body.filter((item) => item.status === true);

  const storageHeader = [
    "s/n",
    "shoe name",
    "SKU",
    "size",
    "average purchase price",
    "quantity in storage",
    "",
  ];

  const renderCustomHeader = (item, index) => <th key={index}>{item}</th>;

  const renderCustomBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="shoe-name">{item.user}</td>
      <td>{item.id}</td>
      <td>{item.size}</td>
      <td>{item.price}</td>
      <td>{item.size}</td>
      <td className="expand-btn">Expand</td>
    </tr>
  );

  return (
    <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
