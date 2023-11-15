import React from "react";
import Rating from "./features/Rating";

type Props = {};

const Comment = (props: Props) => {
  return (
    <div className="section both">
      <div className="shopify">
        <div className="shopify_header">
          <h3 className="shopify_header_title w-full mb-[30px]">
            Your <span className="empathize">Comments</span>
          </h3>
        </div>
        <div className="shopify_content w-full">
          <div className="comment_wrapper">
            <div className="comment_form_wrapper">
              <form className="comment_form">
                <h3>Email</h3>
                <div className="comment_rating">
                  <Rating />
                </div>
                <textarea></textarea>
                <button className="btn-primary btn-sz-xsmall w-max text-center">
                  Send Comment
                </button>
              </form>
            </div>
            <div className="comment_content">
              <div className="comment">
                <h3>Email</h3>
                <span className="flex gap-[20px] justify-center">
                  Rating: 5 <span>01-02-2022</span>
                </span>

                <p>This book is great!</p>
              </div>
              <div className="comment">
                <h3>Email</h3>
                <span className="flex gap-[20px] justify-center">
                  Rating: 5 <span>01-02-2022</span>
                </span>
                <p>This book is too bad!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
