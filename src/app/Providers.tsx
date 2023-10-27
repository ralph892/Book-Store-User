"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import RootPage from "./rootPage";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <Provider store={store}>
      <RootPage>{props.children}</RootPage>
    </Provider>
  );
};

export default Providers;
