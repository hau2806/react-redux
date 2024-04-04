import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../rect-redux/action/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductData {
  productId: number;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

const Product: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [data, setData] = useState<ProductData[] | null>(null);
  const [idData, setIdData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity >= 99) {
      return quantity;
    }
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: ProductData[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("❌ Get products failed!!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIdData = (id: number) => {
    setIdData(id - 1);
  };

  const handleAdd = (
    productId: number,
    productName: string,
    description: string,
    imageUrl: string,
    price: number
  ) => {
    dispatch(
      addProduct({
        productId: productId,
        productName: productName,
        description: description,
        imageUrl: imageUrl,
        price: price,
        quantity: quantity,
      })
    );
    setQuantity(1);
    toast.success("Added successfully!!", {
      autoClose: 3000,
    });
  };

  return (
    <div className="">
      <ToastContainer />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="col-11 pt-4 mx-auto">
          <div className="row">
            {data && data[idData] && (
              <div
                key={data[idData].productId}
                className="col-md-7 bg-white rounded rounded-5 mr-2 mb-5 p-5"
              >
                <div>
                  <img
                    className="p-5"
                    style={{ width: "100%" }}
                    src={data[idData].imageUrl}
                    alt=""
                  />
                </div>
                <div className="pt-4">
                  <h3>{data[idData].productName}</h3>
                  <p>{data[idData].description}</p>
                </div>
                <div className="row pt-5">
                  <div className="col">
                    <div className="fw-bold">
                      <div className="d-inline-block bg-light px-3 py-1 rounded">
                        <i
                          style={{ color: "#FF7300" }}
                          onClick={decreaseQuantity}
                          className="fas fa-minus"
                        ></i>
                        <span className="fw-bold pr-3 pl-3 font-weight-bold">
                          {quantity}
                        </span>

                        <i
                          style={{ color: "#FF7300" }}
                          onClick={increaseQuantity}
                          className="fas fa-plus"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="fw-bold d-flex justify-content-end align-items-baseline">
                      <p
                        className="pr-3 font-weight-bold"
                        style={{ fontSize: "23px" }}
                      >
                        ${data[idData].price}
                      </p>{" "}
                      <button
                        onClick={() =>
                          handleAdd(
                            data[idData].productId,
                            data[idData].productName,
                            data[idData].description,
                            data[idData].imageUrl,
                            data[idData].price
                          )
                        }
                        type="button"
                        className="btn btn-primary"
                      >
                        <i className="fas fa-cart-plus"></i> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-md-4 ml-2">
              {data &&
                data.map((list) => (
                  <div
                    onClick={() => handleIdData(list.productId)}
                    key={list.productId}
                  >
                    <div className="row bg-white rounded rounded-5 mb-3 p-2">
                      <div className="col">
                        {" "}
                        <img
                          style={{ width: "80%" }}
                          src={list.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="col">
                        <div className="row">
                          <h5>{list.productName}</h5>
                          <p>{list.description}</p>
                        </div>
                        <div className="row pt-2">
                          <div className="col">
                            <div
                              className="fw-bold"
                              style={{ marginLeft: "-15px" }}
                            >
                              <p
                                className=" font-weight-bold"
                                style={{ fontSize: "20px" }}
                              >
                                ${list.price}
                              </p>
                            </div>
                          </div>
                          <div className="col">
                            <p
                              style={{ color: "#3B82F6" }}
                              className="fw-bold text-right font-weight-bold"
                            >
                              Details
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
