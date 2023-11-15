import React from "react";
import { IBook } from "@/interfaces/customInterface";
import Image from "next/image";
import {
  RiArrowRightDoubleFill,
  RiDeleteBin6Line,
  RiShoppingBagLine,
} from "react-icons/ri";
import Link from "next/link";

type Props = {};

const CartMini = (props: Props) => {
  const [products, setProducts] = React.useState<IBook[]>([]);
  const [quantities, setQuantities] = React.useState<number[]>([]);
  const [total, setTotal] = React.useState(0);
  const [removeItem, setRemoveItem] = React.useState("");
  const hasExecutedEffect = React.useRef(0);

  React.useEffect(() => {
    updateProducts();
  });

  React.useEffect(() => {
    localStorage.removeItem(removeItem);
    updateProducts();
  }, [removeItem]);

  const updateProducts = () => {
    if (hasExecutedEffect.current !== localStorage.length) {
      const storage = Object.keys(localStorage).filter(
        (key) => key !== "ally-supports-cache" && key !== "total"
      );
      if (storage.length > 0) {
        setTotal(0);
        setProducts([]);
        setQuantities([]);
        for (let i = 0; i < storage.length; i++) {
          const item = localStorage.getItem(storage[i]);
          if (item !== null) {
            setTotal(
              (prev) =>
                prev + JSON.parse(item)[0].price * JSON.parse(item)[1].count
            );
            setProducts((prev) => [...prev, JSON.parse(item)[0]]);
            setQuantities((prev) => [...prev, JSON.parse(item)[1].count]);
          }
        }
      } else {
        setProducts([]);
        setQuantities([]);
        setTotal(0);
      }
      localStorage.setItem("total", JSON.stringify(total));
      hasExecutedEffect.current = localStorage.length;
    }
  };

  const handleRemoveProduct = (id?: string) => {
    if (id) setRemoveItem(id);
  };

  const handleIncreaseQuantity = (id?: string, index?: number) => {
    if (id !== undefined && index !== undefined) {
      const item = localStorage.getItem(id);
      if (item !== null) {
        const parseItem = JSON.parse(item);
        parseItem[1].count++;
        const q = [...quantities];
        q[index]++;
        setQuantities(q);
        setTotal(total + parseItem[0].price);
        localStorage.setItem(id, JSON.stringify(parseItem));
        localStorage.setItem("total", JSON.stringify(total));
      }
    }
  };

  const handleDecreaseQuantity = (id?: string, index?: number) => {
    if (id !== undefined && index !== undefined && quantities[index] > 1) {
      const item = localStorage.getItem(id);
      if (item !== null) {
        const parseItem = JSON.parse(item);
        parseItem[1].count--;
        const q = [...quantities];
        q[index]--;
        setQuantities(q);
        setTotal(total - parseItem[0].price);
        localStorage.setItem(id, JSON.stringify(parseItem));
        localStorage.setItem("total", JSON.stringify(total));
      }
    }
  };

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    id?: string,
    index?: number
  ) => {
    if (id !== undefined && index !== undefined && e.target !== undefined) {
      e.preventDefault();
      const item = localStorage.getItem(id);
      const value = e.target.value;
      if (item !== null) {
        const parseItem = JSON.parse(item);
        const prevCount = parseItem[1].count;
        parseItem[1].count = +value;
        const q = [...quantities];
        q[index] = +value;
        setQuantities(q);
        setTotal(
          total - parseItem[0].price * prevCount + parseItem[0].price * +value
        );
        localStorage.setItem("total", JSON.stringify(total));
        localStorage.setItem(id, JSON.stringify(parseItem));
      }
    }
  };

  return (
    <div className="cart-mini_wrapper" id="cart-mini_wrapper">
      <div className="cart-mini">
        <div className="cart-mini_header">
          <h3>My Cart</h3>
          <h4>{`${products.length} ITEMS`}</h4>
        </div>
        <div className="cart-mini_body">
          {products.length > 0 &&
            products.map((product, index) => {
              return (
                <div className="cart-mini_item" key={index}>
                  <div className="cart-mini_image_wrapper">
                    <Image
                      src={
                        product.image_book ||
                        "/images/giraffescan_tdance_600x600.webp"
                      }
                      alt="item image"
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className="cart-mini_content">
                    <h3 className="mb-[8px]">
                      {product.title || "Giraffes Can't Dance"}
                    </h3>
                    <h3 className="mb-[5px]">
                      Author: <span>{product.author || "Jack"}</span>
                    </h3>
                    <div className="cart-mini_control-quantity">
                      <button
                        onClick={() =>
                          handleDecreaseQuantity(product.book_id, index)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={quantities[index]}
                        onChange={(e) =>
                          handleChangeQuantity(e, product.book_id, index)
                        }
                      ></input>
                      <button
                        onClick={() =>
                          handleIncreaseQuantity(product.book_id, index)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="flex justify-between mt-[12px] items-center">
                      <h2>{product.price.toFixed(2) || 82.0} USD</h2>
                      <button
                        className="btn-type-icon-only"
                        onClick={() => handleRemoveProduct(product.book_id)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="cart-mini_footer">
          <div className="flex justify-between mb-[20px]">
            <h1>Subtotal:</h1>
            <h1>{total.toFixed(2)} USD</h1>
          </div>
          <div className="flex flex-col px-[15px] items-center gap-[20px]">
            <Link
              href="/checkouts"
              className="btn-primary btn-sz-xmedium btn-st-icon"
            >
              Proceed To Checkout
              <RiShoppingBagLine />
            </Link>
            <Link href="/cart" className="flex gap-[10px] items-center">
              View Cart <RiArrowRightDoubleFill />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMini;
