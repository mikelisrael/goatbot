import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";
import "./styles/login.css";

const Login = () => {
  const { toastOptions, setToken } = useGlobalContext();
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://137.184.44.121/api/user/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.data) {
        toast.success("login successful", toastOptions);
        localStorage.setItem("GBTOKEN", result.data.token);
        setToken(localStorage.getItem("GBTOKEN"));
        // window.location.reload();
      } else {
        setIsError(true);
        toast.error("incorrect email or password", toastOptions);
      }
    } catch (error) {
      toast.warn("Check your connection", toastOptions);
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
