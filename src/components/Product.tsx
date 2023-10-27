"use client";
import React from "react";
import Image from "next/image";
import {
  RiEyeLine,
  RiHeartLine,
  RiShareForwardLine,
  RiShoppingBagLine,
  RiStarSmileFill,
} from "react-icons/ri";
import { IBook } from "@/interfaces/customInterface";
import { useDispatch } from "react-redux";
import { mountNotification } from "@/redux/features/notification/notificationSlice";

type Props = {
  optimize?: boolean;
  extend?: boolean;
  data?: IBook;
};

const Product = (props: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (props.data && props.data.book_id) {
      const item = localStorage.getItem(props.data.book_id);
      if (item === null) {
        localStorage.setItem(
          props.data.book_id,
          JSON.stringify([props.data, { count: 1 }])
        );
      } else {
        const parseItem = JSON.parse(item);
        parseItem[1].count++;
        localStorage.setItem(props.data.book_id, JSON.stringify(parseItem));
      }
      dispatch(mountNotification(props.data));
    }
  };

  return (
    <React.Fragment>
      {!props.optimize && !props.extend && (
        <div className="product_wrapper">
          <div className="product">
            <div className="product_image_wrapper">
              <Image
                src={props.data?.image_book || "/images/hero.jpg"}
                alt="product image"
                width={1000}
                height={1000}
                className="product_image"
              />
              <div className="product_menu">
                <a href="#">
                  <RiHeartLine />
                </a>
                <a href="#">
                  <RiShareForwardLine />
                </a>
                <a href="#">
                  <RiEyeLine />
                </a>
              </div>
            </div>
            <div className="product_content">
              <h3 className="product_content_title">{props.data?.title}</h3>
              <div className="product_content_subtitle">
                Author <span className="empathize">{props.data?.author}</span>
              </div>
              <div className="product_content_subtitle">
                <span>Rating </span>
                <span className="empathize flex items-center gap-[4px]">
                  {props.data?.rate} <RiStarSmileFill />
                </span>
              </div>
              <div className="product_content_price">
                {props.data?.price} USD
              </div>
            </div>
            <div className="product_action">
              <button
                className="btn-primary btn-sz-xmedium btn-st-icon"
                onClick={handleAddToCart}
              >
                <RiShoppingBagLine />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      {props.optimize && (
        <div className="product_wrapper-optimize">
          <div className="product-optimize">
            <div className="product_image_wrapper">
              <Image
                src={"/images/giraffescan_tdance_600x600.webp"}
                alt="product image"
                width={1000}
                height={1000}
                className="product_image"
              />
            </div>
            <div className="product_content-optimize">
              <div>
                <div className="product_content_subtitle">Jack</div>
                <h3 className="product_content_title">
                  Let's know about Animals
                </h3>
                <div className="product_content_price">65.00 USD</div>
              </div>
              <button className="btn-type-optimize btn-st-icon">
                <RiShoppingBagLine />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
      {props.extend && (
        <div className="product_wrapper-extend">
          <div className="product-extend">
            <div className="product_image_wrapper">
              <Image
                src={"/images/giraffescan_tdance_600x600.webp"}
                alt="product image"
                width={1000}
                height={1000}
                className="product_image"
              />
            </div>
            <div className="product_content-extend">
              <div>
                <div className="product_content_subtitle">Jack</div>
                <h3 className="product_content_title">
                  Let's know about Animals
                </h3>
                <p className="product_content_subtitle">
                  Donec sodales sagittis magna. SedMaecenas nec odio et ante
                  tincidunt tempus. Donec vitae sapien ut libero.
                </p>
                <div className="product_content_subtitle flex items-center gap-[8px] my-[8px]">
                  <img src="/images/rating.png"></img>
                  <span>4.5/5</span>
                </div>
                <div className="product_content_price">65.00 USD</div>
              </div>
              <button className="btn-type-optimize btn-st-icon">
                <RiShoppingBagLine />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Product;
