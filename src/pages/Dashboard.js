import React from "react";
import statusCards from "../assets/JsonData/status-card-data.json";
import Statuscard from "../components/StatusCard";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import AreaPlot from "../components/AreaPlot";
import {
  topSneakers,
  latestOrders,
  orderStatus,
} from "../assets/JsonData/tableData";
import Badge from "../components/Badge";

const renderCustomHeader = (item, index) => <th key={index}>{item}</th>;

const renderCustomBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  return (
    <>
      <h2 className="page-header">Home</h2>
      <div className="grid-row">
        <section className="grid-section">
          <div className="grid-child-row">
            {statusCards.map((item, index) => (
              <Statuscard {...item} key={index} />
            ))}
          </div>

          <div className="card full-height">
            <AreaPlot />
          </div>
        </section>

        <section className="grid-section-2">
          <div className="card">
            <div className="card__header">
              <h3>Outstanding offers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topSneakers.head}
                renderHead={(item, index) => renderCustomHeader(item, index)}
                bodyData={topSneakers.body}
                renderBody={(item, index) => renderCustomBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View all</Link>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h3>order history</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
