import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProduct, updateCart } from "../rect-redux/action/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.listCard);
  const totalPrice = data.reduce(
    (total: number, product: any) => total + product.price * product.quantity,
    0
  );

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleDown = (id: number) => {
    const newList = data.map((item: any) => {
      if (item.productId === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    dispatch(updateCart(newList));
  };

  const handleUp = (id: number) => {
    const newList = data.map((item: any) => {
      if (item.productId === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    dispatch(updateCart(newList));
  };

  const handleCheckout = () => {
    alert("Do you want to purchase");

    fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paySuccess: true,
        productsInOrder: [
          {
            productId: 1,
            quantity: 9,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Checkout successful!");
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        toast.success("Thanks your for purchased", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <ToastContainer />
      <div className="bg-white text-center mt-5 rounded rounded-3 ">
        <p className="p-2 font-weight-bold ">My Shopping Cart</p>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 font-weight-bold text-center pt-5">
          {data.length > 0 ? (
            data.map((product) => (
              <div key={product.productId}>
                <div className="row bg-white rounded rounded-5 mb-3 p-3">
                  <div className="col">
                    <img
                      style={{ width: "70%" }}
                      src={product.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <div className="row pt-4">
                      <div className="col">
                        <div
                          className="fw-bold text-left"
                          style={{ marginLeft: "-15px" }}
                        >
                          <h5>{product.productName}</h5>
                        </div>
                      </div>
                      <div className="col">
                        <p
                          style={{ color: "#EF4444", cursor: "pointer" }}
                          className="fw-bold text-right font-weight-bold"
                          onClick={() => handleDelete(product.productId)}
                        >
                          <i className="fas fa-trash"></i>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <p style={{ color: "#bebebe" }}>{product.description}</p>
                    </div>
                    <div className="row pt-2">
                      <div className="col">
                        <div
                          className="fw-bold text-left"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="d-inline-block bg-light px-3 py-1 rounded">
                            <i
                              style={{ color: "#FF7300" }}
                              onClick={() => handleDown(product.productId)}
                              className="fas fa-minus"
                            ></i>
                            <span className="fw-bold pr-3 pl-3 font-weight-bold">
                              {product.quantity}
                            </span>
                            <i
                              style={{ color: "#FF7300" }}
                              onClick={() => handleUp(product.productId)}
                              className="fas fa-plus"
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="fw-bold d-flex justify-content-end align-items-baseline">
                          <p
                            className=" font-weight-bold"
                            style={{ fontSize: "23px" }}
                          >
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5>You have no products in cart</h5>
          )}
        </div>
        <div className="col-12 col-md-4">
          <div className="bg-white rounded rounded-5  p-3 mb-3">
            <p>Order Info</p>
            <div className="row">
              <div className="col">
                <p className="fw-bold">Subtotal</p>
              </div>
              <div className="col">
                <p className="fw-bold text-right">
                  <strong>${parseFloat(totalPrice).toFixed(2)}</strong>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="fw-bold">Shipping Cost:</p>
              </div>
              <div className="col">
                <p className="fw-bold text-right">
                  {data.length > 0 ? <strong>$10</strong> : <strong>$0</strong>}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="fw-bold">Total:</p>
              </div>
              <div className="col">
                <p className="fw-bold text-right">
                  {data.length > 0 ? (
                    <strong>${(parseFloat(totalPrice) + 10).toFixed(2)}</strong>
                  ) : (
                    <strong>$0</strong>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <button
              type="button"
              className={`btn btn-primary w-100 ${
                data.length > 0 ? "" : "disabled"
              }`}
              disabled={data.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
          <div className="">
            <NavLink to="/products">
              {" "}
              <button
                type="button"
                className="btn btn-outline-primary w-100 mt-3"
              >
                Continue shopping
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
