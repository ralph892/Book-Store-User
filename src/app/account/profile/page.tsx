"use client";
import React from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import Link from "next/link";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { RootState } from "@/redux/store";
import { IUser } from "@/interfaces/customInterface";
import Image from "next/image";
import { handleGetCartDetail, handleUpdateUser } from "@/api/handleApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

type Props = {};

const page = (props: Props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.information);
  const [userInfo, setUserInfo] = React.useState<IUser>();
  const [cartsDetail, setCartsDetail] = React.useState<any[]>();

  const validateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Your first name is too short")
      .max(50, "Your first name is too long")
      .required("Required"),
    lastName: Yup.string()
      .min(3, "Your last name is too short")
      .max(50, "Your last name is too long")
      .required("Required"),
    address: Yup.string()
      .min(3, "The address too short")
      .max(99, "The address too long")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: userInfo ? userInfo.firstName : "",
      lastName: userInfo ? userInfo.lastName : "",
      address: userInfo ? userInfo.address : "",
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (userInfo !== undefined) {
        const result = await handleUpdateUser(userInfo.user_id, {
          firstName: values.firstName,
          lastName: values.lastName,
          address: userInfo.address,
        });
        if (result.error) {
          toast.error(result.error, {
            action: {
              label: "Cancel",
              onClick: () => {},
            },
            position: "top-right",
            duration: 2000,
          });
        } else {
          window.location.reload();
        }
      }
    },
  });

  const handleActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget.parentElement;
    if (target && target.classList.contains("active")) {
      target.classList.remove("active");
    } else if (target) {
      target.classList.add("active");
    }
  };

  React.useEffect(() => {
    if (userInfo !== undefined) {
      const fetchApi = async () => {
        const result = await handleGetCartDetail(userInfo.user_id);
        if (result.response) {
          setCartsDetail(result.response);
        }
      };
      fetchApi();
    }
  }, [userInfo]);

  React.useEffect(() => {
    if (userState !== undefined) {
      dispatch(unmountLoading());
      setUserInfo(userState);
    }
  }, [userState]);

  return (
    <DefaultLayout>
      <div className="section both">
        <div className="w-full flex">
          <div className="card-form_wrapper w-1/2">
            <div className="card-form_header">
              <Link href="/">
                <button className="btn-type-link-icon mb-[15px]">
                  <RiArrowLeftLine />
                  Back to Shop
                </button>
              </Link>
              <h3>Profile</h3>
            </div>
            <form className="card-form_body" onSubmit={formik.handleSubmit}>
              <div className="form_header">Customer's Information</div>
              <div className="form-content has-border">
                <div className="w-full flex flex-wrap mb-[10px]">
                  <div className="w-1/2 px-[10px]">
                    <div className="form-label">
                      E-mail<sup>*</sup>:
                    </div>
                    <input
                      className="form-input input-sz-xsmall"
                      value={userInfo && userInfo.email}
                      disabled
                    ></input>
                  </div>
                  <div className="w-1/2 px-[10px]">
                    <div className="form-label">
                      Phone number<sup>*</sup>:
                    </div>
                    <input
                      className="form-input input-sz-xsmall"
                      type="text"
                      value={userInfo && userInfo.phoneNumber}
                      disabled
                    ></input>
                  </div>
                </div>
                <div className="w-full px-[10px] mb-[10px]">
                  <div className="form-label">First name</div>
                  <input
                    className="form-input input-sz-xsmall"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  ></input>
                </div>
                <div className="w-full px-[10px] mb-[10px]">
                  <div className="form-label">Last name</div>
                  <input
                    className="form-input input-sz-xsmall"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  ></input>
                </div>
                <div className="w-full px-[10px] mb-[10px]">
                  <div className="form-label">Address</div>
                  <input
                    className="form-input input-sz-xsmall"
                    type="text"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form_section"></div>
              <div className="form_section justify-end has-border">
                <button className="btn-type-link">
                  Change your phone number ?
                </button>
                <button
                  className="btn-primary btn-sz-xsmall btn-st-icon max-w-[200px] w-full"
                  type="submit"
                >
                  Update <RiArrowRightLine />
                </button>
              </div>
              <div className="form_section justify-center">
                <span>If you want to change account</span>
                <Link
                  href="/account/login"
                  className="btn-primary btn-sz-xsmall btn-st-icon max-w-[200px] w-full"
                >
                  Switch <RiArrowRightLine />
                </Link>
              </div>
            </form>
          </div>
          <div className="history_wrapper">
            <div className="history_header">
              <h3>Purchase History</h3>
            </div>
            <div className="history_body">
              {cartsDetail &&
                cartsDetail.map((cart, index) => {
                  return (
                    <div className="history_item" key={index}>
                      <div
                        className="item_info"
                        onClick={(e) => handleActive(e)}
                      >
                        <p>{cart.cart_id}</p>
                        <p>- {cart.date}</p>
                        <p>- {cart.total} USD</p>
                      </div>
                      <div className="item_detail">
                        <table>
                          <thead>
                            <tr>
                              <td>Image</td>
                              <td>Name</td>
                              <td>Price</td>
                              <td>Quantity</td>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.products.map(
                              (product: any, index: number) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <Image
                                        src={
                                          product.image_book ||
                                          "/images/giraffescan_tdance_600x600.webp"
                                        }
                                        alt="item image"
                                        width={100}
                                        height={100}
                                      />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.price} USD</td>
                                    <td>{product.quantity}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                        <div className="flex justify-end w-full my-[10px]">
                          <button className="btn-success btn-sz-small">
                            Received the goods
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
