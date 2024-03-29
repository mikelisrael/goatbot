// import { useState } from "react";
import EmptyData from "./EmptyData";
import "./styles/table.css";

const Table = ({ headData, renderHead, bodyData, renderBody, limit }) => {
  // pagination the real deal
  const initialData =
    limit && bodyData ? bodyData.slice(0, Number(limit)) : bodyData;
  // const [dataShow, setDataShow] = useState(initialData);

  // let pages = 1;

  // let range = [];

  // if (limit) {
  //   let page = Math.floor(bodyData.length / Number(limit));
  //   pages = bodyData.length % Number(limit) === 0 ? page : page + 1;
  //   range = [...Array(pages).keys()];
  // }

  // const [currPage, setCurrPage] = useState(0);

  // const selectPage = (page) => {
  //   const start = Number(limit) * page;
  //   const end = start + Number(limit);

  //   setDataShow(bodyData.slice(start, end));
  //   setCurrPage(page);
  // };

  return (
    <div className="table-wrapper">
      <table>
        {headData && renderHead && (
          <thead>
            <tr>{headData.map((item, index) => renderHead(item, index))}</tr>
          </thead>
        )}
        {bodyData && renderBody && (
          <tbody>
            {initialData.map((item, index) => renderBody(item, index))}
          </tbody>
        )}
      </table>

      {initialData.length === 0 && <EmptyData />}

      {/* {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index && "active"
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null} */}
    </div>
  );
};

export default Table;
