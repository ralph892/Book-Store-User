import React from "react";
import Image from "next/image";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="loading_wrapper active" id="loading">
      <div className="loading">
        <Image
          src={"/images/book.gif"}
          alt="loading image"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default Loading;
