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

type Props = {};

const NavigationBar = (props: Props) => {
  const dispatch = useDispatch();

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
              <ul className="navbar-category">Latest Categories</ul>
            </li>
          </div>
          <div className="navbar-menus_wrapper">
            <li className="navbar-menus">
              <ul className="navbar-menu">
                <RiUserLine />
              </ul>
              <ul className="navbar-menu">
                <RiSearchLine />
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
                  data-content={Object.keys(localStorage).length}
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
