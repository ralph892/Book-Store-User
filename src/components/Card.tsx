import Image from "next/image";
import React from "react";

type Props = {};

const Card = (props: Props) => {
  return (
    <div className="card_wrapper medium">
      <div className="card">
        <div className="card_image_wrapper">
          <Image
            src="/images/hero.jpg"
            alt="card image"
            width={1000}
            height={1000}
            className="card_image"
          />
          <span className="card_label">Work-Book</span>
        </div>
        <div className="card_content">
          <p className="card_content_subtitle">10 Jan 2023/ WorkDo</p>
          <h3 className="card_content_title">Learn Once Read Everywhere</h3>
          <p className="card_content_subtitle">
            A book is a medium for recording information in the form of writing
            or images, typically composed of many pages...
          </p>
        </div>
        <div className="card_action">
          <button className="btn-primary btn-sz-xmedium">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
