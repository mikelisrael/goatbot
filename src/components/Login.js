import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";
import Cookies from "js-cookie";
import "./styles/login.css";

const Login = () => {
  const { setToken, customFetch } = useGlobalContext();
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const fetchData = await customFetch(
      "http://137.184.44.121/api/user/sign_in",
      options
    );

    if (fetchData && fetchData.data) {
      toast.success("Login successful");
      Cookies.set("GBTOKEN", fetchData.data.token);
      setToken(Cookies.get("GBTOKEN"));
    } else {
      toast.error("incorrect email or password");
      setIsError(true);
    }
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <input
            className={`${isError && "error-dey"}`}
            type="email"
            name="email"
            {...register("email", { required: true })}
            placeholder="Enter username..."
          />
          <span>
            {errors.email?.type === "required" && "Email is required"}
          </span>

          <input
            className={`${isError && "error-dey"}`}
            type="password"
            name="password"
            {...register("password", { required: true })}
            placeholder="Enter password..."
          />
          <span>
            {errors.password?.type === "required" && "Password is required"}
          </span>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
