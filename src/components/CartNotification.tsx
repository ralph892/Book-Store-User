import React from "react";
import Image from "next/image";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";

type Props = {};

const CartNotification = (props: Props) => {
  return (
    <div className="cartNotification_wrapper">
      <div className="cartNotification">
        <div className="cartNotification_header">
          <span className="flex gap-[8px] flex-grow items-center">
            {" "}
            <RiCheckFill />
            Item added to your cart
          </span>
          <button className="btn-type-icon-only">
            <RiCloseFill />
          </button>
        </div>
        <div className="cartNotification_body">
          <div className="cartNotification_product">
            <div className="cartNotification_image_wrapper">
              <Image
                src="/images/giraffescan_tdance_600x600.webp"
                alt="product image"
                width={100}
                height={100}
                loading="lazy"
                className="cartNotification_image"
              />
            </div>
            <div className="cartNotification_content">
              <h3 className="cartNotification_content_title">
                Giraffes can't dance
              </h3>
              <div className="cartNotification_content_subtitle">
                <span>Author</span>
                <span>Jack</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cartNotification_footer">
          <button className="btn-tertiary btn-sz-small btn-st-square">
            View my cart (1)
          </button>
          <button className="btn-primary btn-sz-small">
            Proceed To Checkout
          </button>
          <button className="btn-type-link">Continue shopping</button>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
