"use client";
import React from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { useDispatch } from "react-redux";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiGoogleFill,
} from "react-icons/ri";
import { IUser } from "@/interfaces/customInterface";
import Link from "next/link";
import { handleLoginByGoogle, handleSignUp } from "@/api/handleAuth";

type Props = {};

const page = (props: Props) => {
  const dispatch = useDispatch();

  const validateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    password: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    rePassword: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    address: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(9, "To Short")
      .max(15, "To Long")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      rePassword: "",
      address: "",
      phoneNumber: 0,
      email: "",
    },
    validationSchema: validateSchema,
    validateOnChange: false,
    validate: (values) => {
      const errors: any = {};
      if (values.rePassword !== values.password)
        errors.rePassword = "Re-Password is not correct";
      return errors;
    },
    onSubmit: async (values) => {
      const result = await handleSignUp(values as IUser);
      if (result !== undefined) {
        if (result.errors) {
          toast.error(result.errors.message, {
            action: {
              label: "Cancel",
              onClick: () => {},
            },
            position: "top-right",
            duration: 2000,
          });
        } else {
          window.location.assign("/account/login");
        }
      }
    },
  });

  React.useEffect(() => {
    dispatch(unmountLoading());
  }, []);

  return (
    <DefaultLayout>
      <div className="section center both bg-[var(--bg-secondary)]">
        <div className="card-form_wrapper">
          <div className="card-form_header">
            <Link href="/">
              <button className="btn-type-link-icon mb-[15px]">
                <RiArrowLeftLine />
                Back to Shop
              </button>
            </Link>
            <h3>Register</h3>
          </div>
          <form className="card-form_body" onSubmit={formik.handleSubmit}>
            <div className="form_header">If you are the new customer</div>
            <div className="form-content has-border">
              <div className="w-full flex flex-wrap mb-[10px]">
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    First Name<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="First name"
                    id="firstName"
                    name="firstName"
                    autoFocus
                    onChange={formik.handleChange}
                  ></input>
                  <span className="form-error">{formik.errors.firstName}</span>
                </div>
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    Last Name<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="Last name"
                    id="lastName"
                    name="lastName"
                    onChange={formik.handleChange}
                  ></input>
                  <span className="form-error">{formik.errors.lastName}</span>
                </div>
              </div>
              <div className="w-full px-[10px] mb-[10px]">
                <div className="form-label">
                  E-mail<sup>*</sup>:
                </div>
                <input
                  className="form-input input-sz-xsmall"
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                ></input>
                <span className="form-error">{formik.errors.email}</span>
              </div>
              <div className="w-full flex flex-wrap mb-[10px]">
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    Password<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                  ></input>
                  <span className="form-error">{formik.errors.password}</span>
                </div>
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    Re-Password<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="Password"
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    onChange={formik.handleChange}
                  ></input>
                  <span className="form-error">{formik.errors.rePassword}</span>
                </div>
              </div>
              <div className="w-full flex flex-wrap mb-[10px]">
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    Phone Number<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="Phone number"
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                  ></input>
                  <span className="form-error">
                    {formik.errors.phoneNumber}
                  </span>
                </div>
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    Address<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="Address"
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                  ></input>
                  <span className="form-error">{formik.errors.address}</span>
                </div>
              </div>
            </div>
            <div className="form_section"></div>
            <div className="form_section justify-between has-border">
              <div className="flex items-center gap-[10px]">
                <span>Or Register by:</span>
                <button
                  className="btn-type-icon-only"
                  onClick={async () => {
                    await handleLoginByGoogle();
                  }}
                >
                  <RiGoogleFill />
                </button>
              </div>
              <button
                className="btn-primary btn-sz-xsmall btn-st-icon max-w-[200px] w-full"
                type="submit"
              >
                Register <RiArrowRightLine />
              </button>
            </div>
            <div className="form_section justify-center">
              <Link
                href="/account/login"
                className="btn-primary btn-sz-xsmall btn-st-icon max-w-[200px] w-full"
              >
                Login <RiArrowLeftLine />
              </Link>
              <span>If you already have an account</span>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
