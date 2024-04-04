import { Suspense } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";


import { useSelector } from "react-redux";
import Home from "./component/Home";
import Product from "./component/Product";
import Review from "./component/Review";
import Cart from "./component/Cart";
import './App.css'
function App() {
  const newList = useSelector((state: any) => state.listCard);
  const navLinks = [
    {
      path: "",
      title: "Home",
    },

    {
      path: "products",
      title: "Products",
    },
    {
      path: "reviews",
      title: "Reviews",
    },
  ];

  const routes = [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Product />,
    },
    {
      path: "/reviews",
      element: <Review />,
    },
    {
      path: "checkout",
      element: <Cart />,
    },
  ];

  return (
    <>
      <div>
        <BrowserRouter>
          <div>
            <header>
              <nav
                style={{ backgroundColor: "#fff" }}
                className={`navbar navbar-expand navbar-light `}
              >
                <div className="container-fluid">
                  <div className="row w-100">
                    <div className="col d-flex justify-content-between align-items-center">
                      <ul className="navbar-nav">
                        {navLinks.map((link, index) => {
                          return (
                            <li className="nav-item pr-4 " key={index}>
                              <NavLink
                                className=" font-weight-bold text-decoration-none"
                                key={index}
                                to={link.path}
                                style={{ color: "#333" }}
                              >
                                {link.title}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                      <NavLink
                        to="/"
                        style={{
                          color: "#3B82F6",
                          fontSize: "24px",
                          fontWeight: "bold",
                          marginRight: "185px",
                        }}
                      >
                        Beauty.bd
                      </NavLink>
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <NavLink
                            className="nav-link"
                            to="/checkout"
                            style={{ color: "#3B82F6", fontSize: "24px" }}
                          >
                            <i className="fas fa-cart-plus"></i>
                            {1 > 0 && (
                              <span
                                className="position-absolute top-0 start-100 translate-middle badge bg-danger  rounded-circle"
                                style={{
                                  fontSize: "13px",
                                  color: "#fff",
                                  width: "20px",
                                  height: "20px",
                                  position: "relative",
                                  right: "12px",
                                  zIndex: 3,
                                }}
                              >
                                {newList.length}
                              </span>
                            )}
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <main>
              <Suspense fallback={<h2>Loading...</h2>}>
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
