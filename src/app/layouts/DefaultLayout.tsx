import React from "react";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return <div className="wrapper">{children}</div>;
};

export default DefaultLayout;
