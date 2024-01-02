"use client";
import React from "react";
import { RootState } from "@/redux/store";
import CartNotification from "@/components/CartNotification";
import Overlay from "@/components/Overlay";
import Loading from "@/components/Loading";
import CartMini from "@/components/CartMini";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { IBook } from "@/interfaces/customInterface";
import { Toaster } from "sonner";
import Cookies from "js-cookie";
import { handleRequestInformation } from "@/api/handleAuth";
import { useDispatch } from "react-redux";
import { assignUser } from "@/redux/features/user/userSlice";

type Props = {
  children: React.ReactNode;
};

const RootPage = (props: Props) => {
  const dispatch = useDispatch();
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
  const loadingState = useSelector(
    (state: RootState) => state.loading.isMounted
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookData, setBookData] = React.useState<IBook>();

  React.useEffect(() => {
    const authFunction = async () => {
      if (Cookies.get("refreshToken")) {
        const result = await handleRequestInformation();
        if (result.response && result.response.length > 0) {
          dispatch(assignUser(result.response[0]));
        }
      }
    };
    authFunction();
  }, [Cookies.get("refreshToken")]);

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
    const loading = document.querySelector("#loading");
    const html = document.querySelector("html");
    if (loading && html) {
      if (loadingState === true) {
        loading.classList.add("active");
        html.style.overflow = "hidden";
        setIsLoading(true);
      } else {
        loading.classList.remove("active");
        setIsLoading(false);
        html.style.overflow = "auto";
      }
    }
  }, [loadingState]);

  React.useEffect(() => {
    if (notificationData) setBookData(notificationData);
  }, [notificationData]);

  return (
    <React.Fragment>
      <NavigationBar />
      <CartNotification data={bookData} />
      <CartMini />
      <Overlay />
      {props.children}
      <Footer />
      <Loading />
      <Toaster richColors={true} visibleToasts={3} />
    </React.Fragment>
  );
};

export default RootPage;
