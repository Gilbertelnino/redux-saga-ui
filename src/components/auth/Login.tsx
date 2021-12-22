import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoginType } from "../../types/interface";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../features/slices/user/userSlice";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const user = localStorage.getItem("user");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (user: LoginType) => {
    try {
      setLoading(true);
      dispatch(loginUser({ username: user.username, password: user.password }));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label className="label-email">Username</label>
            <input
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="form-group">
            <label className="label-password">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
