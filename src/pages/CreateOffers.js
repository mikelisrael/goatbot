import { useState } from "react";
import AccountsDropdown from "../components/AccountsDropdown";
import { toast } from "react-toastify";
import "./styles/createoffers.css";

const CreateOffers = () => {
  const [selected, setSelected] = useState("");
  const [itemQuantity, setItemQuantity] = useState({
    single: false,
    multiple: false,
  });
  const [itemSelected, setItemSelected] = useState({
    price: "",
    size: "",
    slug: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setItemSelected({ ...itemSelected, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selected) {
      toast.error("oops! select an account");
    } else if (selected && !(itemQuantity.single || itemQuantity.multiple)) {
      toast.error("choose quantity");
    } else if (!itemSelected.slug) {
      toast.error("enter slug");
    } else if (!itemSelected.size) {
      toast.error("enter size");
    } else if (!itemSelected.price) {
      toast.error("enter price");
    } else {
      setItemSelected({ price: "", size: "", slug: "" });
      toast.success("offer created");
    }
  };

  return (
    <div>
      <h2 className="page-header">Create Offers</h2>
      <div className="create-offers">
        <div className="create-offers-content">
          <AccountsDropdown selected={selected} setSelected={setSelected} />

          <form onSubmit={handleSubmit} autoComplete="off">
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
                  placeholder="e.g. air-jordan-2-retro-union-grey-fog"
                  name="slug"
                  value={itemSelected.slug}
                  onChange={handleChange}
                />
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

                <div className="final-pieces">
                  <div className="create-offers-checkbxs">
                    <span>
                      <input
                        id="repeat"
                        type="checkbox"
                        name="quantity"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="repeat">
                        <span></span>
                        Repeat purchasing mode
                      </label>
                    </span>

                    <span>
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
                    </span>
                  </div>

                  <div className="file-uploader">
                    <input
                      type="file"
                      id="upload"
                      style={{ display: "none" }}
                      accept=".txt"
                      disabled
                      // onChange={(e) => submitProxy(e)}
                    />

                    <label htmlFor="upload" style={{ cursor: "not-allowed" }}>
                      <i className="bx bx-cloud-upload"></i>
                      Upload Proxy
                    </label>
                  </div>
                </div>

                <button type="submit">Create</button>
              </div>
            </div>

            <div className="details-input-form "></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOffers;
