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
import { handleGetBooks, handleGetNewRelease } from "@/api/handleApi";
import { IBook } from "@/interfaces/customInterface";
import { Autoplay } from "swiper/modules";
import { useDispatch } from "react-redux";
import {
  mountLoading,
  unmountLoading,
} from "@/redux/features/loading/loadingSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [exploreBooks, setExploreBooks] = React.useState<IBook[]>();
  const [newReleaseBooks, setNewReleaseBooks] = React.useState<IBook[][]>([]);
  const [category, setCategory] = React.useState("kids");
  const hasCallEffect = React.useRef("");
  const sliderRefs: React.RefObject<SwiperRef>[] = [];
  for (let i = 0; i < 4; i++) sliderRefs.push(React.useRef<SwiperRef>(null));

  const handlePrev = React.useCallback((index: number) => {
    const button = sliderRefs[index].current;
    if (button !== null) button.swiper.slidePrev();
    else return;
  }, []);

  const handleNext = React.useCallback((index: number) => {
    const button = sliderRefs[index].current;
    if (button !== null) button.swiper.slideNext();
    else return;
  }, []);

  const handleCategories = (category: string, index: number) => {
    const filterButtons = document.querySelector("#filter-navbar")?.children;
    if (filterButtons) {
      for (let i = 0; i < filterButtons?.length; i++) {
        if (i === index) {
          filterButtons[i].classList.add("btn-primary");
          filterButtons[i].classList.remove("btn-secondary");
        } else {
          filterButtons[i].classList.remove("btn-primary");
          filterButtons[i].classList.add("btn-secondary");
        }
      }
    }
    if (category !== "" && category !== undefined) setCategory(category);
  };

  React.useLayoutEffect(() => {
    if (isLoading === true) dispatch(mountLoading());
    else dispatch(unmountLoading());
  }, [isLoading]);

  React.useEffect(() => {
    if (hasCallEffect.current !== category) {
      const fetchApi = async () => {
        const result1 = await handleGetBooks("category", category, 5);
        const result2 = await handleGetNewRelease(20);
        if (result1?.response) {
          setExploreBooks(result1.response);
        }
        if (result2?.response) {
          for (let i = 0; i < result2.response.length; i = i + 4) {
            const arr: IBook[] = [];
            for (let j = i; j < i + 4; j++) {
              if (result2.response[j]) arr.push(result2.response[j]);
            }
            if (arr.length === 4) setNewReleaseBooks((prev) => [...prev, arr]);
          }
        }
        if (result1?.response && result2?.response) setIsLoading(false);
      };
      fetchApi();
      hasCallEffect.current = category;
    }
  }, [category]);

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
            <div className="filter-navbar" id="filter-navbar">
              <button
                className="filter_button btn-sz-small btn-primary interact"
                onClick={() => handleCategories("kids", 0)}
              >
                Kids books
              </button>
              <button
                className="filter_button btn-sz-small btn-secondary interact"
                onClick={() => handleCategories("health", 1)}
              >
                Health
              </button>
            </div>
          </div>
          <div className="shopify_content">
            <Swiper
              ref={sliderRefs[0]}
              slidesPerView={1}
              spaceBetween={5}
              loop={true}
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
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {exploreBooks &&
                exploreBooks.map((book, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Product data={book}></Product>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <button
              className="btn-swiper btn-swiper-prev"
              onClick={() => handlePrev(0)}
            ></button>
            <button
              className="btn-swiper btn-swiper-next"
              onClick={() => handleNext(0)}
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
              <Swiper
                ref={sliderRefs[1]}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 1,
                  },
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
              >
                {newReleaseBooks &&
                  newReleaseBooks.map((books, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="w-full flex">
                          <div className="w-1/2 flex flex-col">
                            {books[0] && <Product optimize data={books[0]} />}
                            {books[1] && <Product optimize data={books[1]} />}
                          </div>
                          <div className="w-1/2 flex flex-col">
                            {books[2] && <Product optimize data={books[2]} />}
                            {books[3] && <Product optimize data={books[3]} />}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              <button
                className="btn-swiper btn-swiper-prev optimize"
                onClick={() => handlePrev(1)}
              ></button>
              <button
                className="btn-swiper btn-swiper-next optimize"
                onClick={() => handleNext(1)}
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
            <Swiper
              ref={sliderRefs[2]}
              slidesPerView={1}
              loop={true}
              spaceBetween={10}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
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
              onClick={() => handlePrev(2)}
            ></button>
            <button
              className="btn-swiper btn-swiper-next"
              onClick={() => handleNext(2)}
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
            <Swiper
              ref={sliderRefs[3]}
              slidesPerView={1}
              loop={true}
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
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
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
              onClick={() => handlePrev(3)}
            ></button>
            <button
              className="btn-swiper btn-swiper-next"
              onClick={() => handleNext(3)}
            ></button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
