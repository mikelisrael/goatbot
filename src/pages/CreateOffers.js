import { useState } from "react";
import AccountsDropdown from "../components/AccountsDropdown";
import Alert from "../components/Alert";
import { useGlobalContext } from "../context";
import "./styles/createoffers.css";

const CreateOffers = () => {
  const [selected, setSelected] = useState("");
  const [itemQuantity, setItemQuantity] = useState({
    single: false,
    multiple: false,
  });
  const [itemSelected, setItemSelected] = useState({ price: "", size: "" });
  const { showAlert, displayAlert } = useGlobalContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setItemSelected({ ...itemSelected, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      displayAlert(true, "select an account", "danger");
    } else if (selected && !(itemQuantity.single || itemQuantity.multiple)) {
      displayAlert(true, "choose quantity", "danger");
    } else if (
      selected &&
      (itemQuantity.single || itemQuantity.multiple) &&
      !itemSelected.price &&
      itemSelected.size
    ) {
      displayAlert(true, "enter price", "danger");
    } else if (
      selected &&
      (itemQuantity.single || itemQuantity.multiple) &&
      itemSelected.price &&
      !itemSelected.size
    ) {
      displayAlert(true, "enter size", "danger");
    } else if (
      selected &&
      (itemQuantity.single || itemQuantity.multiple) &&
      !(itemSelected.price && itemSelected.size)
    ) {
      displayAlert(true, "Fill the form", "danger");
    } else {
      console.log(itemSelected);
      setItemSelected({ price: "", size: "" });
      displayAlert(true, "offer created", "success");
    }
  };

  return (
    <div>
      <h2 className="page-header">Create Offers</h2>
      <div className="create-offers">
        <div className="create-offers-content">
          <AccountsDropdown selected={selected} setSelected={setSelected} />

          <form onSubmit={handleSubmit}>
            <div className="form-checkboxes">
              <input id="one" type="radio" name="quantity" />
              <label
                htmlFor="one"
                onClick={() =>
                  setItemQuantity({ single: true, multiple: false })
                }
              >
                <span></span>
                Single item
              </label>

              <input id="multiple" type="radio" name="quantity" />
              <label
                htmlFor="multiple"
                onClick={() =>
                  setItemQuantity({ single: false, multiple: true })
                }
              >
                <span></span>
                multiple items
              </label>
            </div>

            <div className="details-input-form">
              <div className="form-control">
                <input
                  type="text"
                  placeholder={`Input ${
                    itemQuantity.multiple
                      ? "Sizes e.g. 7.5,8,9"
                      : "Size e.g. 7.5"
                  }`}
                  name="size"
                  value={itemSelected.size}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={`Input ${
                    itemQuantity.multiple
                      ? "Prices e.g. 300,450,700"
                      : "Price e.g. 300"
                  }`}
                  name="price"
                  value={itemSelected.price}
                  onChange={handleChange}
                />

                <input id="repeat" type="checkbox" name="quantity" />
                <label htmlFor="repeat">
                  <span></span>
                  Repeat purchasing mode
                </label>

                <button type="submit">Create</button>
              </div>
            </div>

            <div className="details-input-form "></div>
          </form>
        </div>
      </div>

      {showAlert.show && <Alert {...showAlert} removeAlert={displayAlert} />}
    </div>
  );
};

export default CreateOffers;
