"use client";
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import {
  RiBankCardLine,
  RiLockLine,
  RiMoneyDollarBoxFill,
} from "react-icons/ri";
import { IBook, IUser } from "@/interfaces/customInterface";
import Image from "next/image";
import { handleGetCurrentCountry, handlePurchase } from "@/api/handleApi";
import { toast } from "sonner";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RootState } from "@/redux/store";

type Props = {};

const page = (props: Props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.information);
  const [userInfo, setUserInfo] = React.useState<IUser>();
  const [products, setProducts] = React.useState<IBook[]>([]);
  const [quantities, setQuantities] = React.useState<number[]>([]);
  const [locationInfo, setLocationInfo] = React.useState<any>();
  const [total, setTotal] = React.useState(0);
  const hasExecutedEffect = React.useRef(0);

  React.useEffect(() => {
    dispatch(unmountLoading());
    const fetchApi = async () => {
      const result = await handleGetCurrentCountry();
      if (result !== undefined) setLocationInfo(result);
    };
    fetchApi();
  }, []);

  React.useEffect(() => {
    if (userState !== undefined) {
      setUserInfo(userState);
    }
  }, [userState]);

  React.useEffect(() => {
    updateProducts();
  });

  const validateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    address: Yup.string()
      .min(2, "To Short")
      .max(50, "To Long")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: userInfo ? userInfo.email : "",
      country: locationInfo !== undefined ? locationInfo.country : "",
      firstName: userInfo ? userInfo.firstName : "",
      lastName: userInfo ? userInfo.lastName : "",
      address: userInfo ? userInfo.address : "",
      phoneNumber: userInfo ? userInfo.phoneNumber : "",
      city: locationInfo !== undefined ? locationInfo.city : "",
      ward: "",
      district: "",
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const response = await handlePurchase(products, quantities);
      if (response !== undefined) {
        if (response.errors) {
          toast.error(response.errors, {
            action: {
              label: "Cancel",
              onClick: () => {},
            },
            position: "top-right",
            duration: 2000,
          });
        } else {
          localStorage.clear();
          toast.success("purchase successfully!", {
            action: {
              label: "Continue",
              onClick: () => {
                window.location.assign("/categories");
              },
            },
            position: "top-center",
            duration: 10000,
          });
        }
      }
    },
  });

  React.useEffect(() => {
    if (formik.errors) {
      if (formik.errors.firstName)
        toast.error("First Name is " + formik.errors.firstName);
      if (formik.errors.lastName)
        toast.error("Last Name is " + formik.errors.lastName);
      if (formik.errors.email) toast.error("Email is " + formik.errors.email);
      if (formik.errors.address)
        toast.error("Address is " + formik.errors.address);
    }
  }, [formik.errors]);

  const updateProducts = () => {
    if (hasExecutedEffect.current !== localStorage.length) {
      const storage = Object.keys(localStorage).filter(
        (key) => key !== "ally-supports-cache"
      );
      if (storage.length > 0) {
        setTotal(0);
        setProducts([]);
        setQuantities([]);
        for (let i = 0; i < storage.length; i++) {
          const item = localStorage.getItem(storage[i]);
          if (item !== null) {
            setTotal(
              (prev) =>
                prev + JSON.parse(item)[0].price * JSON.parse(item)[1].count
            );
            setProducts((prev) => [...prev, JSON.parse(item)[0]]);
            setQuantities((prev) => [...prev, JSON.parse(item)[1].count]);
          }
        }
      } else {
        setProducts([]);
        setQuantities([]);
        setTotal(0);
      }
      hasExecutedEffect.current = localStorage.length;
    }
  };

  return (
    <DefaultLayout>
      <div className="checkouts_wrapper bg-[var(--bg-secondary)]">
        <div className="w-1/12"></div>
        <div className="w-6/12 px-[26px]">
          <form className="checkouts_form" onSubmit={formik.handleSubmit}>
            <div className="checkouts_form-information">
              <div className="w-full mb-[26px]">
                <label className="form-label mb-[15px] block">
                  CONTACT<sup>*</sup>
                </label>
                <input
                  className="form-input input-tertiary input-sz-xsmall mb-[10px]"
                  placeholder="Email or Mobile phone number"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                ></input>
                <div className="flex items-center gap-[8px]">
                  <input type="checkbox" className="form-checkbox"></input>
                  <label className="form-label m-0 text-[1.1rem]">
                    Email me with news and offer
                  </label>
                </div>
              </div>
              <div className="w-full mb-[26px]">
                <label className="form-label mb-[15px] block">
                  DELIVERY<sup>*</sup>
                </label>
                <div className="input-custom-container mb-[15px]">
                  <input
                    placeholder="Country/Region"
                    className="input-custom input-sz-xsmall"
                    type="text"
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="input-custom" className="input-custom-label">
                    Country/Region
                  </label>
                  <span className="input-custom-highlight"></span>
                </div>
                <div className="w-full flex mb-[15px]">
                  <div className="w-1/2 pr-[5px]">
                    <div className="input-custom-container">
                      <input
                        placeholder="First name"
                        className="input-custom input-sz-xsmall"
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="input-custom"
                        className="input-custom-label"
                      >
                        First name
                      </label>
                      <span className="input-custom-highlight"></span>
                    </div>
                  </div>
                  <div className="w-1/2 pl-[5px]">
                    <div className="input-custom-container">
                      <input
                        placeholder="Last name"
                        className="input-custom input-sz-xsmall"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="input-custom"
                        className="input-custom-label"
                      >
                        Last name
                      </label>
                      <span className="input-custom-highlight"></span>
                    </div>
                  </div>
                </div>
                <div className="input-custom-container mb-[15px]">
                  <input
                    placeholder="Address"
                    className="input-custom input-sz-xsmall"
                    type="text"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="input-custom" className="input-custom-label">
                    Address
                  </label>
                  <span className="input-custom-highlight"></span>
                </div>
                <div className="w-full flex mb-[15px]">
                  <div className="w-1/3 pr-[5px]">
                    <div className="input-custom-container">
                      <input
                        placeholder="City"
                        className="input-custom input-sz-xsmall"
                        type="text"
                        name="city"
                        id="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="input-custom"
                        className="input-custom-label"
                      >
                        City
                      </label>
                      <span className="input-custom-highlight"></span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="input-custom-container">
                      <input
                        placeholder="Ward"
                        className="input-custom input-sz-xsmall"
                        type="text"
                        id="ward"
                        name="ward"
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="input-custom"
                        className="input-custom-label"
                      >
                        Ward
                      </label>
                      <span className="input-custom-highlight"></span>
                    </div>
                  </div>
                  <div className="w-1/3 pl-[5px]">
                    <div className="input-custom-container">
                      <input
                        placeholder="District"
                        className="input-custom input-sz-xsmall"
                        type="text"
                        id="district"
                        name="district"
                        value={formik.values.district}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="input-custom"
                        className="input-custom-label"
                      >
                        District
                      </label>
                      <span className="input-custom-highlight"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-[26px]">
                <label className="form-label mb-[15px] block">
                  SHIPPING METHOD
                </label>
                <input
                  className="form-input input-tertiary input-sz-xsmall mb-[10px]"
                  placeholder="Enter your shipping address to view available shipping methods."
                  disabled
                ></input>
              </div>
              <div className="w-full mb-[26px]">
                <label className="form-label mb-[15px] block">PAYMENT</label>
                <div className="form-payment">
                  <div className="payment_header">
                    Credit card <RiMoneyDollarBoxFill />
                  </div>
                  <div className="payment_body">
                    <div className="payment_body_section w-full">
                      <input
                        className="form-input input-tertiary input-sz-xsmall mb-[10px]"
                        placeholder="Card number"
                        disabled
                      ></input>
                      <RiBankCardLine />
                    </div>
                    <div className="payment_body_section w-full">
                      <input
                        className="form-input input-tertiary input-sz-xsmall mb-[10px] w-1/2"
                        placeholder="Expiration date (MM/YY)"
                        disabled
                      ></input>
                      <div className="w-1/2 payment_body_section">
                        <input
                          className="form-input input-tertiary input-sz-xsmall mb-[10px]"
                          placeholder="Security code"
                          disabled
                        ></input>
                        <RiLockLine />
                      </div>
                    </div>
                    <div>
                      <input
                        className="form-input input-tertiary input-sz-xsmall mb-[10px]"
                        placeholder="Name on card"
                        disabled
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn-sz-xmedium btn-primary"
              type="submit"
              // onClick={(e) => handleClickPurchase(e)}
            >
              Pay Now
            </button>
          </form>
        </div>
        <div className="w-5/12 px-[15px] py-[27px] bg-[var(--bg-gray-light)]">
          <div className=" flex flex-col sticky top-[15px] checkouts_products">
            {products.map((product, index) => {
              return (
                <div
                  className="checkouts_product"
                  key={index}
                  data-content={quantities[index]}
                >
                  <div className="flex gap-[14px]">
                    <Image
                      src={
                        product.image_book ||
                        "./image/giraffescan_tdance_600x600.webp"
                      }
                      alt="product image"
                      width={100}
                      height={100}
                      className="checkouts_product_image"
                    />
                    <div>
                      <h3>{product.title}</h3>
                      <span>{product.author}</span>
                    </div>
                  </div>
                  <div className="checkouts_product_price">{`${product.price.toFixed(
                    2
                  )} USD`}</div>
                </div>
              );
            })}
            <div className="flex flex-col gap-[10px] p-[15px] my-[10px]">
              <div className="flex justify-between">
                <h3>Subtotal</h3>
                <div className="checkouts_product_price">{`${total.toFixed(
                  2
                )} USD`}</div>
              </div>
              <div className="flex justify-between">
                <h3>Shipping</h3>
                <div className="checkouts_product_price">{`20.00 USD`}</div>
              </div>
              <div className="flex justify-between">
                <h2>Total</h2>
                <h2>{`${(total + 20).toFixed(2)} USD`}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
