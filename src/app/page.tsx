"use client";
import React from "react";
import Image from "next/image";
import DefaultLayout from "./layouts/DefaultLayout";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { RiArrowRightDoubleFill, RiSearchLine } from "react-icons/ri";
import Product from "@/components/Product";
import Card from "@/components/Card";
import { handleGetBooks } from "@/api/handleApi";
import { IBook } from "@/interfaces/customInterface";

export default function Home() {
  const sliderRef = React.useRef<SwiperRef>(null);
  const [books, setBooks] = React.useState<IBook[]>();

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  React.useEffect(() => {
    const fetchApi = async () => {
      const result = await handleGetBooks("category", "kids");
      if (result?.response) {
        setBooks(result.response);
      }
    };
    fetchApi();
  }, []);

  return (
    <DefaultLayout>
      <div className="section left">
        <div className="hero_wrapper">
          <div className="hero">
            <div className="hero_content">
              <div className="hero_content_title">
                +5000 books <br></br>
                <span className="text-[var(--cl-primary)]">
                  in one place
                </span>{" "}
              </div>
              <div className="hero_form_wrapper">
                <form className="hero_form flex">
                  <div className="col-px-10 w-7/12">
                    <input
                      className="form-input input-sz-medium"
                      placeholder="Search products..."
                    ></input>
                  </div>
                  <div className="col-px-10 w-5/12 flex items-center justify-between">
                    <select className="form-input input-sz-medium input-type-select max-w-[calc(100%-55px)]">
                      <option>Books</option>
                      <option>Category</option>
                    </select>
                    <button className="btn-type-icon">
                      <RiSearchLine />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="hero_image_wrapper">
              <Image
                src={"/images/hero.jpg"}
                alt="hero image"
                width={1000}
                height={1000}
                className="hero_image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section left">
        <div className="card_subscribe_wrapper">
          <div className="card_subscribe">
            <div className="card_subscribe_title px-[15px]">
              Subscribe newsletter and <br></br> <span>get -20% off</span>
            </div>
            <div className="card_subscribe_subtitle px-[15px]">
              The intellectual content in a physical book need not be a
              composition, nor even be called a book.
            </div>
            <form className="card_subscribe_form px-[15px] relative">
              <input
                placeholder="Enter email address..."
                className="form-input input-sz-medium input-secondary input-type-group"
              ></input>
              <button className="absolute top-0 right-[15px] btn-tertiary">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="section both pt-[80px] bg-[var(--bg-secondary)] pb-[80px]">
        <div className="shopify">
          <div className="shopify_header">
            <h3 className="shopify_header_title">
              Explore <span className="empathize">Books</span>
            </h3>
            <div className="filter">
              <button className="filter_button btn-sz-small btn-primary interact">
                Kids books
              </button>
              <button className="filter_button btn-sz-small btn-secondary interact">
                Biography
              </button>
            </div>
          </div>
          <div className="shopify_content">
            <Swiper
              ref={sliderRef}
              slidesPerView={1}
              spaceBetween={5}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              autoplay={{
                delay: 5000,
              }}
            >
              {books &&
                books.map((book, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Product data={book}></Product>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <button
              className="btn-swiper btn-swiper-prev"
              onClick={handlePrev}
            ></button>
            <button
              className="btn-swiper btn-swiper-next"
              onClick={handleNext}
            ></button>
          </div>
        </div>
      </div>
      <div className="section both bg-[var(--bg-secondary)] pb-[80px]">
        <div className="shopify">
          <div className="shopify_header flex-col">
            <h3 className="shopify_header_title w-full text-center mb-[30px]">
              New Release <span className="empathize">Books</span>
            </h3>
            <p className="shopify_header_subtitle">
              “Sometimes, you read a book and it fills you with this weird
              evangelical zeal, and you become convinced that the shattered
              world will never be put back together unless and until all living
              humans read the book.”
            </p>
            <p className="shopify_header_subtitle">
              - John Green, The Fault in Our Stars -
            </p>
          </div>
          <div className="shopify_content w-full">
            <div className="shopify_banner_wrapper optimize">
              <Image
                src="/images/hero.jpg"
                alt="banner"
                width={1000}
                height={1000}
                className="shopify_banner"
              />
              <div className="banner_overlay">
                <div className="banner_overlay_content">
                  <h3>Let's known about Animals</h3>
                  <button className="btn-type-link btn-st-icon">
                    <RiArrowRightDoubleFill />
                    More detail
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 px-[15px] relative">
              <Swiper>
                <SwiperSlide>
                  <div className="w-full flex">
                    <div className="w-1/2 flex flex-col">
                      <Product optimize />
                      <Product optimize />
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <Product optimize />
                      <Product optimize />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <button
                className="btn-swiper btn-swiper-prev optimize"
                onClick={handlePrev}
              ></button>
              <button
                className="btn-swiper btn-swiper-next optimize"
                onClick={handleNext}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="section both bg-[var(--bg-secondary)]">
        <div className="shopify">
          <div className="shopify_header">
            <h3 className="shopify_header_title w-full mb-[30px]">
              Featured <span className="empathize">Collections</span>
            </h3>
          </div>
          <div className="shopify_content w-full">
            <div className="shopify_banner_wrapper banner-featured">
              <div className="w-1/2 p-[30px] relative flex">
                <Image
                  src="/images/giraffescan_tdance_600x600.webp"
                  alt="banner"
                  width={1000}
                  height={1000}
                  className="shopify_banner"
                />
                <div className="banner_overlay_content">
                  <h3>Let's known about Animals</h3>
                  <p>
                    Literature is any collection of written work, but it is also
                    used more narrowly for writings specifically considered to
                    be an art form, especially prose fiction, drama, and poetry.
                    In recent centuries, the definition has...
                  </p>
                  <button className="btn-sz-xmedium btn-primary">
                    Items-5
                  </button>
                </div>
                <div className="banner_overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section both pt-[80px] bg-[var(--bg-secondary)] pb-[80px]">
        <div className="shopify">
          <div className="shopify_header">
            <h3 className="shopify_header_title text-center w-full">
              Best <span className="empathize">Sellers</span>
            </h3>
          </div>
          <div className="shopify_content">
            <Swiper ref={sliderRef} slidesPerView={2} spaceBetween={10}>
              <SwiperSlide>
                <Product extend />
              </SwiperSlide>
              <SwiperSlide>
                <Product extend />
              </SwiperSlide>
              <SwiperSlide>
                <Product extend />
              </SwiperSlide>
              <SwiperSlide>
                <Product extend />
              </SwiperSlide>
            </Swiper>
            <button
              className="btn-swiper btn-swiper-prev"
              onClick={handlePrev}
            ></button>
            <button
              className="btn-swiper btn-swiper-next"
              onClick={handleNext}
            ></button>
          </div>
        </div>
      </div>
      <div className="section right bg-[var(--bg-secondary)] pb-[80px]">
        <div className="newsletter">
          <div className="newsletter_content">
            <h3 className="newsletter_title">
              Subscribe newsletter and get -20% off
            </h3>
            <p className="mb-[20px]">
              Reading not only improves your vocabulary but also assists you in
              gaining a fresh perspective. Reading for content writers is
              necessary because it enables them to develop their thoughts, gives
              them endless knowledge on various topics, and provides a feeling
              like nothing else in this world.
            </p>
            <button className="btn-tertiary btn-sz-xmedium">
              Get Your Package
            </button>
          </div>
          <div className="newsletter_banner_wrapper">
            <Image
              src="/images/newsletter.webp"
              alt="banner"
              width={1000}
              height={1000}
              className="newsletter_banner"
            />
          </div>
        </div>
      </div>
      <div className="section both bg-[var(--bg-secondary)] pb-[80px]">
        <div className="shopify">
          <div className="shopify_header">
            <h3 className="shopify_header_title w-full mb-[30px]">
              From Our Blog
            </h3>
          </div>
          <div className="shopify_content">
            <Swiper ref={sliderRef} slidesPerView={4} spaceBetween={5}>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
            </Swiper>
            <button
              className="btn-swiper btn-swiper-prev"
              onClick={handlePrev}
            ></button>
            <button
              className="btn-swiper btn-swiper-next"
              onClick={handleNext}
            ></button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
