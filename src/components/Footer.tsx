import Image from "next/image";
import React from "react";
import {
  RiInstagramFill,
  RiMessengerFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "react-icons/ri";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="footer_wrapper" id="footer">
      <div className="footer">
        <div className="footer_row">
          <div className="footer_col footer-primary">
            <h3 className="footer_col_title">Description:</h3>
            <p>
              This book describes how a detective tracks down a serial killer.
              Park Town is a renowned neighborhood in Berlin. In the city, the
              insane only brutally murder their lovers. Psycho will reveal the
              information before the couple is murdered. The story comes to a
              close with the investigator identifying the murderer using
              conflicting clues.
            </p>
          </div>
          <div className="footer_col">
            <h3 className="footer_col_title">Shop:</h3>
            <p>Contact</p>
            <p>Privacy Policy</p>
            <p>Shipping & Delivery</p>
            <p>Term & Conditions</p>
          </div>
          <div className="footer_col">
            <h3 className="footer_col_title">Account:</h3>
            <p>About us</p>
            <p>Article Page</p>
            <p>Collections Page</p>
            <p>Blog Page</p>
            <p>FAQ's</p>
            <p>Contact us</p>
          </div>
          <div className="footer_col">
            <h3 className="footer_col_title">Share:</h3>
            <div className="flex gap-[4px]">
              <button className="btn-type-icon">
                <RiYoutubeFill />
              </button>
              <button className="btn-type-icon">
                <RiMessengerFill />
              </button>
              <button className="btn-type-icon">
                <RiInstagramFill />
              </button>
              <button className="btn-type-icon">
                <RiTwitterXFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
