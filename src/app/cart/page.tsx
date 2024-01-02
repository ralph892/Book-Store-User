"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import { useDispatch } from "react-redux";
import { RiArrowLeftLine, RiDeleteBin6Line } from "react-icons/ri";
import { IBook } from "@/interfaces/customInterface";

type Props = {};

const page = (props: Props) => {
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    dispatch(unmountLoading());
  }, []);

  const updateProducts = () => {
    if (hasExecutedEffect.current !== localStorage.length) {
      const storage = Object.keys(localStorage).filter(
        (key) => key !== "ally-supports-cache"
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
        localStorage.setItem(id, JSON.stringify(parseItem));
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="section both bg-[var(--bg-secondary)]">
        <div className="cart_wrapper">
          <div className="cart">
            <div className="cart_header">
              <Link href="/">
                <button className="btn-type-link-icon mb-[35px]">
                  <RiArrowLeftLine />
                  Continue shopping
                </button>
              </Link>
              <h3 className="cart_header_title">Your cart</h3>
            </div>
            <div className="cart_body">
              <table className="cart_table">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((product, index) => {
                      return (
                        <tr>
                          <td>
                            <Image
                              src={
                                product.image_book ||
                                "/images/giraffescan_tdance_600x600.webp"
                              }
                              alt="product image"
                              width={90}
                              height={90}
                            />
                          </td>
                          <td>{product.title}</td>
                          <td>{`${product.price.toFixed(2)} USD`}</td>
                          <td>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  handleDecreaseQuantity(product.book_id, index)
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={quantities[index]}
                                min={1}
                                onChange={(e) =>
                                  handleChangeQuantity(
                                    e,
                                    product.book_id,
                                    index
                                  )
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
                          </td>
                          <td>
                            <div>
                              {`${(quantities[index] * product.price).toFixed(
                                2
                              )} USD`}
                              <button
                                className="btn-type-icon-only"
                                onClick={() =>
                                  handleRemoveProduct(product.book_id)
                                }
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="cart_footer">
            <div className="cart_note">
              <label>ORDER SPECIAL INSTRUCTIONS</label>
              <textarea placeholder="Order special instructions"></textarea>
            </div>
            <div className="cart_subtotal">
              <h3 className="text-[var(--cl-primary)]">Subtotal</h3>
              <h3>{`${total.toFixed(2)} USD`}</h3>
              <p>Taxes and shipping calculated at checkout</p>
              <button className="btn-primary btn-sz-xmedium">
                <Link href="/checkouts">Proceed To Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
