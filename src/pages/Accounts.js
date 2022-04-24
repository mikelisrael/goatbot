import { useState, useRef } from "react";
import Table from "../components/Table";
import customersList from "../assets/JsonData/customers-list.json";
import { FaTrash } from "react-icons/fa/"; //FaRegEye, FaRegEyeSlash,
import { v4 as uuidv4 } from "uuid";
import Alert from "../components/Alert";
import { useGlobalContext } from "../context";
import "./styles/accounts.css";
import OutsideClickHandler from "react-outside-click-handler";

const customerTableHead = [
  "s/n",
  "email",
  "password",
  "Outstanding offers",
  "storage",
  "market value",
  "",
];

const Accounts = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountList, setAccountList] = useState(customersList);
  const [account, setAccount] = useState({ email: "", password: "" });
  const { showAlert, displayAlert, user } = useGlobalContext();
  const [checked, setChecked] = useState(false);
  const modalRef = useRef(null);
  const modalInputRef = useRef(null);

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={uuidv4()}>
      <td>{index + 1}</td>
      <td>{item.email}</td>
      <td className="account-password">
        {showPassword ? item.phone : "●●●●●●●●●"}
      </td>
      <td>{item.total_orders}</td>
      <td>{item.total_orders}</td>
      <td>{item.total_spend}</td>
      <td>
        <FaTrash
          className="delete-btn"
          onClick={() => removeAccount(item.id)}
        />
      </td>
    </tr>
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAccount({ ...account, [name]: value });
  };

  const emailValidation = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (account.password && account.email) {
      console.log(emailValidation(account.email));

      // handle email validation
      if (emailValidation(account.email)) {
        const newAccount = {
          id: uuidv4(),
          email: account.email,
          phone: account.password,
          total_spend: "$557248.44",
          total_orders: 24011,
        };
        setAccountList([newAccount, ...accountList]);
        setAccount({ email: "", password: "" });
        displayAlert(true, "Account added", "success");
      } else {
        displayAlert(true, "invald email", "danger");
      }
    } else if (account.email)
      displayAlert(true, "please include password", "danger");
    else if (account.password)
      displayAlert(true, "please include email", "danger");
    else if (!(account.password && account.email))
      displayAlert(true, "please enter details", "danger");
  };

  const removeAccount = (id) => {
    displayAlert(true, "account removed", "danger");
    setAccountList(accountList.filter((item) => item.id !== id));
  };

  const openModal = () => {
    modalRef.current.classList.add("show");
  };

  const closeModal = () => {
    modalRef.current.classList.remove("show");
    modalInputRef.current.value = "";
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalInputRef.current.value) {
      if (modalInputRef.current.value === user.pass) {
        setShowPassword(true);
        setChecked(true);
        closeModal();
      } else {
        displayAlert(true, "incorrect password", "danger");
      }
    } else {
      displayAlert(true, "invald entry", "danger");
    }
  };

  return (
    <div className="accounts">
      <h2 className="page-header">Accounts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter Email"
            value={account.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={account.password}
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </div>
        <div className="switch">
          <span>{`${showPassword ? "Hide" : "Show"} `} passwords</span>
          <input
            type="checkbox"
            id="switch"
            checked={checked}
            onChange={(e) => setChecked(false)}
          />
          <label
            onClick={() => {
              if (showPassword) {
                setShowPassword(false);
              } else {
                openModal();
              }
            }}
            htmlFor="switch"
          >
            Toggle
          </label>
        </div>
      </form>

      <OutsideClickHandler onOutsideClick={closeModal}>
        <div className="modal" ref={modalRef}>
          <p>
            <i className="bx bx-x-circle" onClick={closeModal}></i>
          </p>
          <h3>Confirm with password</h3>
          <form onSubmit={handleModalSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              ref={modalInputRef}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </OutsideClickHandler>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={accountList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
      {showAlert.show && (
        <Alert {...showAlert} removeAlert={displayAlert} list={accountList} />
      )}
    </div>
  );
};

export default Accounts;
