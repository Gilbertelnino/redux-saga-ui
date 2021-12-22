import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UserType } from "../../types/interface";
import "./addUser.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  userSelector,
  editUser,
  getUser,
} from "../../features/slices/user/userSlice";
import Header from "../header/Header";

const EditUser: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const { user, oneUser, isLoading } = useAppSelector(userSelector);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    name: Yup.object().shape({
      firstname: Yup.string().required("First Name is required"),
      lastname: Yup.string().required("Last Name is required"),
    }),
    address: Yup.object().shape({
      street: Yup.string().required("Street is required"),
      number: Yup.string().required("Number is required"),
      city: Yup.string().required("City is required"),
      zipcode: Yup.string().required("Zip code is required"),
      geolocation: Yup.object().shape({
        lat: Yup.string().required("Latitude is required"),
        long: Yup.string().required("Longitude is required"),
      }),
    }),
    phone: Yup.string().required("Phone is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: oneUser?.email,
      username: oneUser?.username,
      password: oneUser?.password,
      name: {
        firstname: oneUser?.name?.firstname,
        lastname: oneUser?.name?.lastname,
      },
      address: {
        street: oneUser?.address?.street,
        number: oneUser?.address?.number,
        city: oneUser?.address?.city,
        zipcode: oneUser?.address?.zipcode,
        geolocation: {
          lat: oneUser?.address?.geolocation?.lat,
          long: oneUser?.address?.geolocation?.long,
        },
      },
      phone: oneUser?.phone,
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditSubmit = async (user: UserType) => {
    try {
      setLoading(true);
      dispatch(editUser({ ...user }));
      if (!isLoading) {
        toast.success("User updated successfully");
        setLoading(false);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    if (user === null) {
      <Navigate to="/login" />;
    }
    dispatch(getUser(id));
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="adduser">
        <div className="adduser__container">
          <h1>Update User</h1>
          <form
            onSubmit={handleSubmit(handleEditSubmit)}
            className="form-container"
          >
            <div className="form-group">
              <label className="label-email">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""} `}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <label className="label-username">Username</label>
              <input
                type="text"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label className="label-password">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="form-group">
              <label className="lable-firstname">First Name</label>
              <input
                type="text"
                {...register("name.firstname")}
                className={`form-control ${
                  errors.name?.firstname ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.name?.firstname?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-lastname">Last Name</label>
              <input
                type="text"
                {...register("name.lastname")}
                className={`form-control ${
                  errors.name?.lastname ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.name?.lastname?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-street">Street</label>
              <input
                type="text"
                {...register("address.street")}
                className={`form-control ${
                  errors.address?.street ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.address?.street?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-number">Number</label>
              <input
                type="text"
                {...register("address.number")}
                className={`form-control ${
                  errors.address?.number ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.address?.number?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-city">City</label>
              <input
                type="text"
                {...register("address.city")}
                className={`form-control ${
                  errors.address?.city ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.address?.city?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-zipcode">Zip code</label>
              <input
                type="text"
                {...register("address.zipcode")}
                className={`form-control ${
                  errors.address?.zipcode ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.address?.zipcode?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-latitude">Latitude</label>
              <input
                type="text"
                {...register("address.geolocation.lat")}
                className={`form-control ${
                  errors.address?.geolocation?.lat ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.address?.geolocation?.lat?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-longitude">Longitude</label>
              <input
                type="text"
                {...register("address.geolocation.long")}
                className={`form-control ${
                  errors.address?.geolocation?.long ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.address?.geolocation?.long?.message}
              </div>
            </div>
            <div className="form-group">
              <label className="lable-phone">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.phone?.message}</div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {loading ? "Processing..." : "Update Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
