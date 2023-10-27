import React from "react";
import Image from "next/image";
import { memo } from "react";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { IBook } from "@/interfaces/customInterface";
import { useDispatch } from "react-redux";
import { unmountNotification } from "@/redux/features/notification/notificationSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  data?: IBook;
};

const CartNotification = (props: Props) => {
  const dispatch = useDispatch();

  const [product, setProduct] = React.useState<IBook>();

  React.useEffect(() => {
    if (props.data !== undefined) {
      setProduct(props.data);
    }
  }, [props.data]);

  return (
    <div className="cartNotification_wrapper" id="cartNotification_wrapper">
      <div className="cartNotification">
        <div className="cartNotification_header">
          <span className="flex gap-[8px] flex-grow items-center">
            {" "}
            <RiCheckFill />
            Item added to your cart
          </span>
          <button
            className="btn-type-icon-only"
            onClick={() => dispatch(unmountNotification())}
          >
            <RiCloseFill />
          </button>
        </div>
        <div className="cartNotification_body">
          <div className="cartNotification_product">
            <div className="cartNotification_image_wrapper">
              <Image
                src={
                  product?.image_book ||
                  "/images/giraffescan_tdance_600x600.webp"
                }
                alt="product image"
                width={100}
                height={100}
                loading="lazy"
                className="cartNotification_image"
              />
            </div>
            <div className="cartNotification_content">
              <h3 className="cartNotification_content_title">
                {product?.title || "Giraffes can't dance"}
              </h3>
              <div className="cartNotification_content_subtitle">
                <span>Author</span>
                <span>{product?.author || "Jack"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cartNotification_footer">
          <button className="btn-tertiary btn-sz-small btn-st-square">
            View my cart (1)
          </button>
          <button className="btn-primary btn-sz-small">
            Proceed To Checkout
          </button>
          <button className="btn-type-link">Continue shopping</button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartNotification);
