import React from "react";
import { useCart } from "../Createcontext/Shoppingcart";
import { Button, Snackbar, IconButton, Typography, Grid } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import './shoppingcart.css'

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, setCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCheckout = () => {
    setOpenSnackbar(true);

    setCart([]);
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="shopping-cart-container">
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.length > 0 ? (
        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <div className="cart-item">
                <img
                  src={item.image_front_small_url}
                  alt={item.product_name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <Typography variant="h6" className="cart-item-name">
                    {item.product_name}
                  </Typography>
                  <Typography variant="body2" className="cart-item-price">
                    ${item.price.toFixed(2)} each
                  </Typography>
                  <div className="cart-item-controls">
                    <IconButton
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <span className="cart-item-quantity">{item.quantity}</span>
                    <IconButton
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <Typography variant="body2" className="cart-item-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </div>
                <div className="cart-item-remove">
                  <Button
                    variant="outlined"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
          <Grid item xs={12}>
            <div className="cart-total">
              <Typography variant="h5" className="cart-total-text">
                Total Price:
              </Typography>
              <Typography variant="h5" className="cart-total-amount">
                ${calculateTotalPrice()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                className="checkout-button"
              >
                Proceed to Checkout
              </Button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Product(s) have been checked out!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ShoppingCart;
