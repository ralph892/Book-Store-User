"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { RiArrowLeftLine, RiShoppingBagLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import { handleGetBook, handleGetBooks } from "@/api/handleApi";
import { IBook } from "@/interfaces/customInterface";
import Product from "@/components/Product";
import Comment from "@/components/Comment";

type Props = {
  params: { id: string };
};

const page = (props: Props) => {
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState<IBook>();
  const [relatedProducts, setRelatedProducts] = React.useState<IBook[]>();

  React.useEffect(() => {
    const fetchApi = async () => {
      const result = await handleGetBook(props.params.id);
      if (result.response) {
        setProduct(result.response[0]);
        dispatch(unmountLoading());
      }
    };
    fetchApi();
  }, []);

  React.useEffect(() => {
    const fetchApi = async () => {
      const result = await handleGetBooks("category", product?.category, 3);
      if (result) {
        if (result.response) {
          setRelatedProducts(result.response);
        }
      }
    };
    fetchApi();
  }, [product]);

  return (
    <DefaultLayout>
      <div className="section both flex py-[80px]">
        <div className="px-[15px] w-5/12">
          <Link href="/">
            <button className="btn-type-link-icon mb-[35px]">
              <RiArrowLeftLine />
              Back to Shop
            </button>
          </Link>
          <div className="detail_content">
            <h3 className="detail_content_title">{product?.title}</h3>
            <h5 className="detail_content_subtitle">
              <span>Author:</span>{" "}
              <span className="text-[var(--cl-primary)]">
                {product?.author}
              </span>
            </h5>
            <p>{product?.description}</p>
          </div>
          <div className="detail_action">
            <div className="flex items-end text-[1.4rem] gap-[15px] mt-[15px]">
              <div className="max-w-[150px] w-full">
                <span>Quantity:</span>
                <div className="w-full flex h-[35px] mt-[5px]">
                  <button className="bg-transparent flex-1">-</button>
                  <input
                    type="number"
                    className="bg-transparent flex-1 appearance-none outline-none w-full max-w-[100px] text-center"
                  ></input>
                  <button className="bg-transparent flex-1">+</button>
                </div>
              </div>
              <span className="text-[2rem] font-[var(--font-primary-regular)] font-bold">
                65.00 USD
              </span>
            </div>
            <div className="flex mt-[15px] gap-[10px]">
              <button className="btn-primary btn-st-icon btn-sz-xmedium">
                <RiShoppingBagLine />
                Add To Cart
              </button>
              <button className="btn-secondary interact btn-sz-xmedium">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
        <div className="w-4/12 px-[15px]">
          <div className="flex items-center justify-center p-[20px] border border-solid border-[var(--bg-gray)] rounded-[var(--border-radius-image)]">
            <Image
              src={
                product?.image_book || "/images/giraffescan_tdance_600x600.webp"
              }
              alt="product image"
              width={1000}
              height={1000}
              className="max-h-[350px] max-w-[350px] rounded-[var(--border-radius-image)]"
            />
          </div>
        </div>
        <div className="w-3/12 px-[15px]">
          <div className="w-full flex flex-col">
            {relatedProducts &&
              relatedProducts.map((product, index) => {
                return <Product data={product} key={index} optimize />;
              })}
          </div>
        </div>
      </div>
      <Comment />
    </DefaultLayout>
  );
};

export default page;
