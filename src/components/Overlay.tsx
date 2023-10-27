import { unmountMiniCart } from "@/redux/features/cart/cartSlice";
import { unmountOverlay } from "@/redux/features/overlay/overlaySlice";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {};

const Overlay = (props: Props) => {
  const dispatch = useDispatch();

  const handleOverlay = () => {
    dispatch(unmountOverlay());
    dispatch(unmountMiniCart());
  };

  return <div className="overlay" id="overlay" onClick={handleOverlay}></div>;
};

export default Overlay;
