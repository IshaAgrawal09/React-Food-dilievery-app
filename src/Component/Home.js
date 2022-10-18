import React, { useState } from "react";

import { styled } from "@mui/material/styles";
// import for Drawer
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Drawer, Typography } from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export default function Home() {
  // Food Array
  const FoodArray = [
    {
      Id: 1,
      Name: "Plain Dosa",
      Type: "veg",
      Price: "159",
      Image: "./Images/101.jpg",
    },
    {
      Id: 2,
      Name: "Poori",
      Type: "veg",
      Price: "399",
      Image: "./Images/102.jpg",
    },
    {
      Id: 3,
      Name: "Masala Dosa",
      Type: "veg",
      Price: "199",
      Image: "./Images/103.jpg",
    },
    {
      Id: 4,
      Name: "Mangalore Bajjii",
      Type: "veg",
      Price: "99",
      Image: "./Images/104.jpg",
    },
    {
      Id: 5,
      Name: "Andhra Veg Meals",
      Type: "veg",
      Price: "199",
      Image: "./Images/105.jpg",
    },
    {
      Id: 6,
      Name: "Andhra Non veg Meals",
      Type: "Non veg",
      Price: "59",
      Image: "./Images/105.jpg",
    },
    {
      Id: 7,
      Name: "Andhra Egg Meals",
      Type: "Non veg",
      Price: "159",
      Image: "./Images/107.jpg",
    },
  ];

  var [functionDrawer, setFunctionDrawer] = useState(false);

  var [cartArray, setCartArray] = useState([]);

  var totalAmount = 0;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "8px",
  }));

  // add to cart function
  var addToCart = (foodIndex) => {
    FoodArray.map((item, index) => {
      if (foodIndex === index) {
        var quantityFlag = 0;

        cartArray.map((value, key) => {
          if (item.Id === value.Id) {
            quantityFlag = 1;
            let temp = cartArray;
            temp[key].Quantity += 1;
            setCartArray([...temp]);
          }
        });

        if (quantityFlag === 0) {
          setCartArray((cartArray) => [
            ...cartArray,
            {
              Id: item.Id,
              Name: item.Name,
              Price: item.Price,
              Image: item.Image,
              Quantity: 1,
            },
          ]);
        }
      }
    });
  };

  // decrease quantity
  var decreaseItem = (itemIndex) => {
    cartArray.map((item, index) => {
      if (index === itemIndex) {
        let tempQuantity = cartArray;
        tempQuantity[index].Quantity -= 1;

        if (tempQuantity[index].Quantity === 0) {
          tempQuantity.splice(index, 1);
        }
        setCartArray([...tempQuantity]);
      }
    });
  };

  // increase quantity
  var increaseItem = (itemIndex) => {
    cartArray.map((item, index) => {
      if (index === itemIndex) {
        let tempQuantity = cartArray;
        tempQuantity[index].Quantity += 1;
        setCartArray([...tempQuantity]);
      }
    });
  };

  // delete order item
  var deleteItem = (itemIndex) => {
    cartArray.map((item, index) => {
      if (index === itemIndex) {
        let tempQuantity = cartArray;
        tempQuantity.splice(index, 1);
        setCartArray([...tempQuantity]);
      }
    });
  };

  var checkOut = () => {
    alert("Your Order is Placed");
    setCartArray([]);
  };
  return (
    <div className="foodList">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          {FoodArray.map((item, index) => {
            return (
              <Grid item xs={8}>
                <Item>
                  <div className="food-item">
                    <div className="Content-Div">
                      <h3>{item.Name}</h3>
                      <p>
                        <CurrencyRupeeIcon sx={{ fontSize: 18 }} /> {item.Price}
                      </p>
                      <p>
                        {item.Type === "veg" ? (
                          <FiberManualRecordIcon
                            style={{
                              height: "16px",
                              width: "16px",
                              color: "green",
                              border: "1.8px solid green",
                            }}
                          />
                        ) : (
                          <>
                            <FiberManualRecordIcon
                              style={{
                                height: "16px",
                                width: "16px",
                                color: "red",
                                border: "1.8px solid red",
                              }}
                            />
                          </>
                        )}{" "}
                        {item.Type}
                      </p>
                      <button onClick={() => addToCart(index)}>
                        Add to Cart
                      </button>
                    </div>

                    <div id="food-item-image">
                      <img src={item.Image} alt="food" />
                    </div>
                  </div>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Drawer
        PaperProps={{ style: { height: "80vh" } }}
        anchor="bottom"
        open={functionDrawer}
        onClose={() => setFunctionDrawer(false)}
      >
        <Box
          p={2}
          width="90%"
          flexDirection="column"
          marginLeft="5%"
          display="flex"
          justifyContent="space-between"
        >
          <div
            style={{
              position: "sticky",
              top: "3%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(255,255,255 , 0.9)",
            }}
          >
            <button
              className="closeCart"
              onClick={() => setFunctionDrawer(false)}
            >
              <KeyboardDoubleArrowDownIcon />
            </button>
            <h2 style={{ margin: "0", width: "65%" }}>Here is your order</h2>
          </div>
          {cartArray.length ? (
            <>
              <div className="cartDetails">
                <table>
                  <thead style={{ position: "sticky", top: "12%" }}>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                    <th>Total</th>
                  </thead>
                  <tbody>
                    {cartArray.map((value, key) => {
                      return (
                        <tr>
                          <td>
                            <img src={value.Image} alt="img" />
                          </td>
                          <td>{value.Name}</td>
                          <td>
                            <CurrencyRupeeIcon sx={{ fontSize: 18 }} />{" "}
                            {value.Price}
                          </td>
                          <td className="changeQuantity">
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                onClick={() => decreaseItem(key)}
                                style={{ color: "red" }}
                              >
                                <RemoveCircleOutlineIcon
                                  sx={{ fontSize: 25 }}
                                />
                              </button>{" "}
                              {value.Quantity}{" "}
                              <button
                                onClick={() => increaseItem(key)}
                                style={{ color: "blue" }}
                              >
                                <AddCircleOutlineIcon sx={{ fontSize: 25 }} />
                              </button>
                            </p>
                          </td>

                          <td>
                            <button
                              className="deleteBtn"
                              onClick={() => deleteItem(key)}
                            >
                              <DeleteIcon sx={{ fontSize: 27 }} />
                            </button>
                          </td>
                          <td>
                            <CurrencyRupeeIcon sx={{ fontSize: 18 }} />{" "}
                            {value.Price * value.Quantity}
                          </td>
                          <p style={{ display: "none" }}>
                            {(totalAmount += value.Price * value.Quantity)}
                          </p>
                        </tr>
                      );
                    })}
                    <tr className="PrintTotal">
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <h4>
                          {" "}
                          Total Amount :{" "}
                          <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                          {totalAmount}
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                style={{ textAlign: "right", position: "sticky", bottom: "5%" }}
              >
                <button className="Checkout" onClick={() => checkOut()}>
                  <ShoppingCartCheckoutIcon />
                </button>
              </div>
            </>
          ) : (
            <>
              <h3
                style={{ textAlign: "center", color: "red", marginTop: "15%" }}
              >
                <ProductionQuantityLimitsIcon sx={{ fontSize: 200 }} />
              </h3>
            </>
          )}
        </Box>
      </Drawer>
      <div className="footer">
        <button className="openCart" onClick={() => setFunctionDrawer(true)}>
          <KeyboardDoubleArrowUpIcon />
        </button>
        <h4>Your Orders ({cartArray.length})</h4>
        <h4>
          Subtotal: <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
          {totalAmount}
        </h4>
        {cartArray.length ? (
          <>
            <button className="Checkout" onClick={() => checkOut()}>
              <ShoppingCartCheckoutIcon />
            </button>
          </>
        ) : (
          <>
            <button
              className="Checkout"
              style={{ color: "red", background: "white", border: "none" }}
              onClick={() => alert("Your Cart Is empty")}
            >
              <RemoveShoppingCartIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
