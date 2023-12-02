"use client";
import React from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { useDispatch } from "react-redux";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleLogin } from "@/api/handleAuth";
import { toast } from "sonner";
import { assignUser } from "@/redux/features/user/userSlice";

type Props = {};

const page = (props: Props) => {
  const dispatch = useDispatch();

  const validateSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(3, "The password too short")
      .max(50, "The password too long")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const result = await handleLogin(values.email, values.password);
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
          window.location.assign("/");
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
            <h3>Log in</h3>
          </div>
          <form className="card-form_body" onSubmit={formik.handleSubmit}>
            <div className="form_header">If you are the returning customer</div>
            <div className="form-content has-border">
              <div className="w-full flex flex-wrap">
                <div className="w-1/2 px-[10px]">
                  <div className="form-label">
                    E-mail<sup>*</sup>:
                  </div>
                  <input
                    className="form-input input-sz-xsmall"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    autoFocus
                  ></input>
                  <span className="form-error">{formik.errors.email}</span>
                </div>
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
              </div>
            </div>
            <div className="form_section"></div>
            <div className="form_section justify-end has-border">
              <button className="btn-type-link">Forgot Password ?</button>
              <button
                className="btn-primary btn-sz-xsmall btn-st-icon max-w-[200px] w-full"
                type="submit"
              >
                Login <RiArrowRightLine />
              </button>
            </div>
            <div className="form_section justify-center">
              <span>If you don't have any account</span>
              <Link
                href="/account/register"
                className="btn-primary btn-sz-xsmall btn-st-icon max-w-[200px] w-full"
              >
                Register <RiArrowRightLine />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
