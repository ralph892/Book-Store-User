"use client";
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useDispatch } from "react-redux";
import { unmountLoading } from "@/redux/features/loading/loadingSlice";
import { handleGetBooks, handleGetCategories } from "@/api/handleApi";
import { IBook } from "@/interfaces/customInterface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Product from "@/components/Product";
import { RiSubtractFill } from "react-icons/ri";

type Props = {};

const page = (props: Props) => {
  const dispatch = useDispatch();

  const [products, setProducts] = React.useState<IBook[]>([]);
  const [groupProducts, setGroupProducts] = React.useState<IBook[][]>([]);
  const [categories, setCategories] = React.useState<
    {
      category_id: string;
      category_name: string;
    }[]
  >([]);
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(100);
  const [countInStock, setCountInStock] = React.useState(0);
  const [countOutStock, setCountOutStock] = React.useState(0);
  const [countCategory, setCountCategory] = React.useState<number[]>([]);
  const [countBooks, setCountBooks] = React.useState(0);
  const hasCallEffect = React.useRef(1);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  React.useEffect(() => {
    const fetchApi = async () => {
      const result = await handleGetCategories();
      if (result !== undefined) {
        if (result.response) setCategories(result.response);
      }
    };
    fetchApi();
  }, []);

  React.useEffect(() => {
    dispatch(unmountLoading());
  }, []);

  React.useEffect(() => {
    if (hasCallEffect.current !== 0) {
      const fetchApi = async () => {
        const result = await handleGetBooks();
        if (result !== undefined) {
          if (result.response) {
            setProducts(result.response);
            setGroupProducts(handleGroupProducts(result.response));
          }
        }
      };
      fetchApi();
      hasCallEffect.current = 0;
    }
  }, []);

  React.useEffect(() => {
    setCountInStock(
      products.filter((product) => {
        return product.quantity > 0;
      }).length
    );
    setCountOutStock(
      products.filter((product) => {
        return product.quantity === 0;
      }).length
    );
    if (categories) {
      for (let i = 0; i < categories.length; i++)
        setCountCategory((prev) => [
          ...prev,
          products.filter((product) => {
            return product.category_name === categories[i].category_name;
          }).length,
        ]);
    }
    setCountBooks(products.length);
  }, [products]);

  React.useEffect(() => {
    let arr = [...products];
    arr = arr.filter((product) => {
      return product.price >= minValue && product.price <= maxValue;
    });
    setGroupProducts(handleGroupProducts(arr));
  }, [minValue, maxValue]);

  const handleFilterCategories = () => {
    const nodes = document.querySelectorAll(".checkbox-category:checked");
    let arr = [...products];
    let filterArr = [];
    for (let i = 0; i < nodes.length; i++) {
      const category = nodes[i].id;
      filterArr.push(
        ...arr.filter((product) => {
          return product.category_name === category;
        })
      );
    }
    if (filterArr.length > 0) setGroupProducts(handleGroupProducts(filterArr));
    else setGroupProducts(handleGroupProducts(products));
  };

  const handleFilterStock = () => {
    const nodes = document.querySelectorAll(".checkbox-stock:checked");
    let arr = [...products];
    let filterArr = [];
    for (let i = 0; i < nodes.length; i++) {
      const stockStatus = nodes[i].id;
      if (stockStatus === "IStock") {
        filterArr.push(
          ...arr.filter((product) => {
            return product.quantity > 0;
          })
        );
      } else {
        filterArr.push(
          ...arr.filter((product) => {
            return product.quantity === 0;
          })
        );
        setGroupProducts(handleGroupProducts(filterArr));
        return;
      }
    }
    if (filterArr.length > 0) setGroupProducts(handleGroupProducts(filterArr));
    else setGroupProducts(handleGroupProducts(products));
  };

  const handleFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const arr = [...products];
    switch (value) {
      case "a-z":
        arr.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        setGroupProducts(handleGroupProducts(arr));
        break;
      case "z-a":
        arr.sort(
          (a, b) => -a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        setGroupProducts(handleGroupProducts(arr));
        break;
      case "price-low-high":
        arr.sort((a, b) => a.price - b.price);
        setGroupProducts(handleGroupProducts(arr));
        break;
      case "price-high-low":
        arr.sort((a, b) => -(a.price - b.price));
        setGroupProducts(handleGroupProducts(arr));
        break;
      case "date-old-new":
        arr.sort((a, b) => {
          const dateA = new Date(a.published_date).getTime();
          const dateB = new Date(b.published_date).getTime();
          return dateA - dateB;
        });
        setGroupProducts(handleGroupProducts(arr));
        break;
      case "date-new-old":
        arr.sort((a, b) => {
          const dateA = new Date(a.published_date).getTime();
          const dateB = new Date(b.published_date).getTime();
          return -(dateA - dateB);
        });
        setGroupProducts(handleGroupProducts(arr));
        break;
      default:
        setGroupProducts(handleGroupProducts(arr));
        break;
    }
  };

  const handleGroupProducts = (arr: IBook[]) => {
    const resultArr: IBook[][] = [];
    for (let i = 0; i < arr.length; i = i + 9) {
      let groupArr: IBook[] = [];
      for (let j = i; j < i + 9; j++) {
        if (arr[j]) groupArr.push(arr[j]);
      }
      resultArr.push(groupArr);
    }
    return resultArr;
  };

  return (
    <DefaultLayout>
      <div className="section both bg-[var(--bg-secondary)]">
        <div className="categories_header">
          <h3 className="w-3/12">FILTERS</h3>
          <div className="w-9/12 py-[14px] pl-[22px] flex justify-between items-center">
            <p>Product information</p>
            <div className="flex items-center">
              <p>Sort by:</p>
              <select
                className="form-input input-sz-xsmall input-type-select"
                onChange={(e) => handleFilterSelect(e)}
              >
                <option value={"best-selling"}>Best selling</option>
                <option value={"a-z"}>A-Z</option>
                <option value={"z-a"}>Z-A</option>
                <option value={"price-low-high"}>Price,Low to High</option>
                <option value={"price-high-low"}>Price,High to Low</option>
                <option value={"date-old-new"}>Date,Old to New</option>
                <option value={"date-new-old"}>Date, New to Old</option>
              </select>
            </div>
          </div>
        </div>
        <div className="categories_body">
          <div className="w-3/12">
            <div className="filter">
              <div className="filter_section">
                <div className="filter_section_header">
                  <div className="filter_section_title">
                    <h3>AVAILABILITY</h3>
                    <RiSubtractFill />
                  </div>
                  <div className="filter_section_subtitle">
                    <h5>0 Selected</h5>
                    <button>Reset</button>
                  </div>
                </div>
                <div className="filter_section_body">
                  <div className="filter_checkbox_wrapper">
                    <div className="filter_checkbox">
                      <input
                        type="checkbox"
                        id="IStock"
                        className="checkbox-stock"
                        onChange={handleFilterStock}
                      ></input>
                      <label>In Stock</label>
                    </div>
                    <div className="filter_count">{`(${countInStock})`}</div>
                  </div>
                  <div className="filter_checkbox_wrapper">
                    <div className="filter_checkbox">
                      <input
                        type="checkbox"
                        id="OStock"
                        className="checkbox-stock"
                        onChange={handleFilterStock}
                      ></input>
                      <label>Out Of Stock</label>
                    </div>
                    <div className="filter_count">{`(${countOutStock})`}</div>
                  </div>
                </div>
              </div>
              <div className="filter_section">
                <div className="filter_section_header">
                  <div className="filter_section_title">
                    <h3>PRICE</h3>
                    <RiSubtractFill />
                  </div>
                  <div className="filter_section_subtitle">
                    <h5>{`The highest price is ${maxValue.toFixed(2)} USD`}</h5>
                    <button>Reset</button>
                  </div>
                </div>
                <div className="filter_section_body">
                  <div className="flex w-full">
                    <div className="w-1/2 px-[5px]">
                      <label>Min price:</label>
                      <input
                        type="number"
                        value={minValue}
                        max={maxValue}
                        min={0}
                        step={10}
                        onChange={(e) => setMinValue(+e.target.value)}
                      ></input>
                    </div>
                    <div className="w-1/2 px-[5px]">
                      <label>Max price:</label>
                      <input
                        type="number"
                        value={maxValue}
                        min={minValue}
                        step={10}
                        onChange={(e) => setMaxValue(+e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter_section">
                <div className="filter_section_header">
                  <div className="filter_section_title">
                    <h3>AVAILABILITY</h3>
                    <RiSubtractFill />
                  </div>
                  <div className="filter_section_subtitle">
                    <h5>0 Selected</h5>
                    <button>Reset</button>
                  </div>
                </div>
                <div className="filter_section_body">
                  <div className="filter_checkbox_wrapper">
                    <div className="filter_checkbox">
                      <input type="checkbox"></input>
                      <label>Book</label>
                    </div>
                    <div className="filter_count">{`(${countBooks})`}</div>
                  </div>
                </div>
              </div>
              <div className="filter_section">
                <div className="filter_section_header">
                  <div className="filter_section_title">
                    <h3>MORE FILTERS</h3>
                    <RiSubtractFill />
                  </div>
                  <div className="filter_section_subtitle">
                    <h5>0 Selected</h5>
                    <button>Reset</button>
                  </div>
                </div>
                <div className="filter_section_body">
                  {categories.length > 0 &&
                    categories.map((category, index) => {
                      return (
                        <div className="filter_checkbox_wrapper" key={index}>
                          <div className="filter_checkbox">
                            <input
                              type="checkbox"
                              onChange={handleFilterCategories}
                              value={category.category_name}
                              className="checkbox-category"
                              id={category.category_name}
                            ></input>
                            <label>
                              {category.category_name.toLowerCase()}
                            </label>
                          </div>
                          <div className="filter_count">{`(${countCategory[index]})`}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-9/12 pt-[22px] pb-[36px] pl-[22px]">
            <Swiper
              pagination={pagination}
              modules={[Pagination]}
              className="mySwiper"
            >
              {groupProducts.map((items, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="categories_products">
                      {items.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            {item && <Product data={item} />}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </SwiperSlide>
                );
              })}
              <div className="w-full h-[60px] block select-none"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
