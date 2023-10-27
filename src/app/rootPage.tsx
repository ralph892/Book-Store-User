"use client";
import React from "react";
import { RootState } from "@/redux/store";
import CartNotification from "@/components/CartNotification";
import Overlay from "@/components/Overlay";
import CartMini from "@/components/CartMini";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { IBook } from "@/interfaces/customInterface";

type Props = {
  children: React.ReactNode;
};

const RootPage = (props: Props) => {
  const notificationState = useSelector(
    (state: RootState) => state.notification.isMounted
  );
  const notificationData = useSelector(
    (state: RootState) => state.notification.data
  );
  const cartState = useSelector((state: RootState) => state.cart.isMounted);
  const overlayState = useSelector(
    (state: RootState) => state.overlay.isMounted
  );
  const [bookData, setBookData] = React.useState<IBook>();

  React.useEffect(() => {
    const notification = document.querySelector("#cartNotification_wrapper");
    if (notificationData !== undefined && notification) {
      if (notificationState === true) notification.classList.add("active");
      else notification.classList.remove("active");
    }
  }, [notificationState]);

  React.useEffect(() => {
    const cartMini = document.querySelector("#cart-mini_wrapper");
    if (cartMini) {
      if (cartState === true) cartMini.classList.add("active");
      else cartMini.classList.remove("active");
    }
  }, [cartState]);

  React.useEffect(() => {
    const overlay = document.querySelector("#overlay");
    if (overlay) {
      if (cartState === true) overlay.classList.add("active");
      else overlay.classList.remove("active");
    }
  }, [overlayState]);

  React.useEffect(() => {
    if (notificationData) setBookData(notificationData);
  }, [notificationData]);

  return (
    <React.Fragment>
      <NavigationBar />
      <CartNotification data={bookData} />
      <CartMini />
      {props.children}
      <Overlay />
      <Footer />
    </React.Fragment>
  );
};

export default RootPage;
