import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import AreaPlot from "../components/AreaPlot";
import {
  // latestOrders,
  orderHistoryHead,
  outstandingOffersHead,
} from "../assets/JsonData/tableData";
import Badge from "../components/Badge";
import { useGlobalContext } from "../context";

import "../components/styles/statuscard.css";
import { convertPriceToDollars, formatDate } from "../utils/helperFunctions";

const Dashboard = () => {
  const { customFetch } = useGlobalContext();
  const [summary, setSummary] = useState();
  const [orderHistory, setOrderHistory] = useState([]);
  const [outstandingOffers, setOutstandingOffers] = useState([]);

  useEffect(() => {
    // fetching summary information
    const fetchSummary = async () => {
      const data = await customFetch("http://137.184.44.121/api/summary");

      setSummary(data);
    };

    fetchSummary();
  }, [customFetch]);

  // fetch summary data for order history
  useEffect(() => {
    const data = [];

    if (summary) {
      const { orders } = summary;
      orders.map(
        ({
          size,
          sku,
          accountEmail: email,
          priceCents: price,
          name,
          status,
          purchasedAt: date,
        }) => data.push({ size, sku, email, name, price, status, date })
      );
      setOrderHistory(data);
    }
  }, [summary]);

  // fetch summary data for outstanding offers
  useEffect(() => {
    const data = [];

    if (summary) {
      const { offers } = summary;
      offers.map(({ name, sku, offered, accountEmail: email, size }) =>
        data.push({ name, sku, offered, email, size })
      );
      setOutstandingOffers(data);
    }
  }, [summary]);

  const renderCustomHeader = (item, index) => <th key={index}>{item}</th>;

  const renderCustomBody = (item, index) => (
    <tr key={index}>
      <td className="shoe-name">{item.name}</td>
      <td>{item.sku}</td>
      <td>{item.size}</td>
      <td>${convertPriceToDollars(item.offered)}</td>
    </tr>
  );

  const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

  const renderOrderBody = (item, index) => (
    <tr key={index}>
      <td>{formatDate(item.date)}</td>
      <td className="shoe-name">{item.name}</td>
      <td>{item.sku}</td>
      <td>{item.size}</td>
      <td>${convertPriceToDollars(item.price)}</td>
      <td className="table-emails">{item.email}</td>
      <td>
        <Badge type={item.status} />
      </td>
    </tr>
  );

  return (
    <>
      <h2 className="page-header">Home</h2>
      <div className="grid-row">
        <section className="grid-section">
          <div className="grid-child-row">
            <article className="status-card">
              <div className="status-card__icon">
                <i className="bx bx-shopping-bag"></i>
              </div>
              <div className="status-card__info">
                <h4>{summary?.totalInventory || "loading..."}</h4>
                <span>Total shoes</span>
              </div>
            </article>

            <article className="status-card">
              <div className="status-card__icon">
                <i className="bx bx-dollar-circle"></i>
              </div>
              <div className="status-card__info">
                <h4>
                  {convertPriceToDollars(summary?.marketValue) || "loading..."}
                </h4>
                <span>Total Market Value</span>
              </div>
            </article>

            <article className="status-card">
              <div className="status-card__icon">
                <i className="bx bxs-user-account"></i>
              </div>
              <div className="status-card__info">
                <h4>{summary?.accounts || "loading..."}</h4>
                <span>Total Accounts</span>
              </div>
            </article>

            <article className="status-card">
              <div className="status-card__icon">
                <i className="bx bx-list-ol"></i>
              </div>
              <div className="status-card__info">
                <h4>{summary?.offerCount || "loading..."}</h4>
                <span>Outstanding offers</span>
              </div>
            </article>
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
                limit="5"
                headData={outstandingOffersHead}
                renderHead={(item, index) => renderCustomHeader(item, index)}
                bodyData={outstandingOffers}
                renderBody={(item, index) => renderCustomBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/outstanding-offers">View all</Link>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h3>order history</h3>
            </div>
            <div className="card__body">
              <Table
                limit="5"
                headData={orderHistoryHead}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={orderHistory}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/history">view all</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
