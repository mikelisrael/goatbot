import { useState } from "react";
import Table from "../components/Table";
import customersList from "../assets/JsonData/customers-list.json";
import { FaTrash } from "react-icons/fa/"; //FaRegEye, FaRegEyeSlash,
import { v4 as uuidv4 } from "uuid";
import Alert from "../components/Alert";
import { useGlobalContext } from "../context";
import "./styles/accounts.css";

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
  const { showAlert, displayAlert } = useGlobalContext();

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={uuidv4()}>
      <td>{index + 1}</td>
      <td className="table-emails">{item.email}</td>
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

  return (
    <div className="accounts">
      <h2 className="page-header">Accounts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            placeholder="enter email"
            value={account.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="enter password"
            value={account.password}
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </div>
        <div className="switch">
          <span>{`${showPassword ? "Hide" : "Show"} `} passwords</span>
          <input type="checkbox" id="switch" />
          <label
            onClick={() => setShowPassword(!showPassword)}
            htmlFor="switch"
          >
            Toggle
          </label>
        </div>
      </form>

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
