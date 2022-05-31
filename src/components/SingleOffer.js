import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SingleOffer = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="single-offer-acct">
      <span className="title">mjunifer1@buzzfeed.com</span>

      <div className="single-offer-acct-child">
        <span>$120</span>

        <FaEdit className="edit-btn" onClick={() => setIsEditing(!isEditing)} />

        <div>
          <input
            id="repeat"
            type="checkbox"
            name="quantity"
            style={{ display: "none" }}
            // checked={true}
          />
          <label htmlFor="repeat">
            <span></span>
            Repeat purchasing mode
          </label>
        </div>

        <div>
          <input
            id="match"
            type="checkbox"
            name="quantity"
            style={{ display: "none" }}
          />
          <label htmlFor="match">
            <span></span>
            Match highest offer
          </label>
        </div>

        <FaTrash className="delete-btn" />
      </div>

      {isEditing && (
        <form className="single-offer-input">
          <input type="number" name="" placeholder="Enter price" />
          <button type="submit">Edit</button>
        </form>
      )}
    </div>
  );
};

export default SingleOffer;
