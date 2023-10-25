import Image from "next/image";
import React from "react";
import {
  RiAddFill,
  RiArrowRightDoubleFill,
  RiDeleteBin6Line,
  RiShoppingBagLine,
  RiSubtractFill,
} from "react-icons/ri";

type Props = {};

const CartMini = (props: Props) => {
  return (
    <div className="cart-mini_wrapper">
      <div className="cart-mini">
        <div className="cart-mini_header">
          <h3>My Cart</h3>
          <h4>2 ITEMS</h4>
        </div>
        <div className="cart-mini_body">
          <div className="cart-mini_item">
            <div className="cart-mini_image_wrapper">
              <Image
                src="/images/giraffescan_tdance_600x600.webp"
                alt="item image"
                width={1000}
                height={1000}
              />
            </div>
            <div className="cart-mini_content">
              <h3 className="mb-[8px]">Giraffes Can't Dance</h3>
              <h3 className="mb-[5px]">
                Author: <span>Jack</span>
              </h3>
              <div className="cart-mini_control-quantity">
                <button>-</button>
                <input type="number" min={0}></input>
                <button>+</button>
              </div>
              <div className="flex justify-between mt-[12px] items-center">
                <h2>82.00 USD</h2>
                <button className="btn-type-icon-only">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-mini_footer">
          <div className="flex justify-between mb-[20px]">
            <h1>Subtotal:</h1>
            <h1>82.00 USD</h1>
          </div>
          <div className="flex flex-col px-[15px] items-center gap-[20px]">
            <button className="btn-primary btn-sz-xmedium btn-st-icon">
              Proceed To Checkout
              <RiShoppingBagLine />
            </button>
            <a href="#" className="flex gap-[10px] items-center">
              View Cart <RiArrowRightDoubleFill />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMini;
