"use client";
import React from "react";
import Image from "next/image";
import {
  RiEarthLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiUserLine,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { mountMiniCart } from "@/redux/features/cart/cartSlice";
import { mountOverlay } from "@/redux/features/overlay/overlaySlice";
import Link from "next/link";

type Props = {};

const NavigationBar = (props: Props) => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = React.useState(0);
  const dropboxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined")
      setQuantities(
        Object.keys(localStorage).filter(
          (key) => key !== "total" && key !== "ally-supports-cache"
        ).length
      );
  });

  return (
    <div className="navbar_wrapper">
      <div className="navbar_container">
        <nav className="navbar">
          <div className="navbar-logo_wrapper">
            <Image
              src={"/images/logo.jpg"}
              alt="logo"
              width={80}
              height={80}
              className="navbar-logo"
            />
          </div>
          <div className="navbar-categories_wrapper">
            <li className="navbar-categories">
              <ul className="navbar-category active">Home</ul>
              <ul className="navbar-category">Products</ul>
              <ul className="navbar-category">Sale off</ul>
              <ul className="navbar-category">Contact</ul>
              <ul className="navbar-category">
                <Link href="/categories">Latest Categories</Link>
              </ul>
            </li>
          </div>
          <div className="navbar-menus_wrapper">
            <li className="navbar-menus">
              <ul className="navbar-menu">
                <RiSearchLine />
              </ul>
              <ul className="navbar-menu has-dropbox">
                <RiUserLine />
                <div className="dropbox_wrapper" ref={dropboxRef}>
                  <li className="dropbox">
                    <ul>
                      <Link href="/account/login">Login</Link>
                    </ul>
                    <ul>
                      <Link href="/account/register">Register</Link>
                    </ul>
                    <ul>My cart</ul>
                  </li>
                </div>
              </ul>
              <ul className="navbar-menu">
                <RiEarthLine />
              </ul>
              <ul className="navbar-menu">
                <select className="btn-secondary btn-sz-medium btn-st-bold btn-type-select">
                  <option>USD</option>
                </select>
              </ul>
              <ul className="navbar-menu">
                <div className="flex flex-col mr-[7px]">
                  <span>My Cart:</span> <span>0.00 USD</span>
                </div>
                <button
                  className="navbar-menu_figure"
                  data-content={quantities}
                  onClick={() => {
                    dispatch(mountMiniCart());
                    dispatch(mountOverlay());
                  }}
                >
                  <RiShoppingCartLine />
                </button>
              </ul>
            </li>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
