import React, { useEffect, useState } from "react";
import { useCart } from "../Createcontext/Shoppingcart";
import { styled } from "@mui/system";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const ProductCard = styled(Card)({
  width: "100%",
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const ProductContainer = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  "& img": {
    width: "100%",
    maxWidth: "200px",
    height: "auto",
  },
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://world.openfoodfacts.org/api/v0/product/737628064502.json"
        );
        const data = await response.json();
        if (data.status === 1) {
          // Add dummy price and rating for demonstration purposes
          const productWithExtras = {
            ...data.product,
            price: 5.99,
            rating: 4.5,
          };
          setProducts([productWithExtras]);
        } else {
          console.error("Product fetch failed:", data.status_verbose);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h2>Product List</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard>
                <ProductContainer>
                  <img
                    src={product.image_front_thumb_url}
                    alt={product.product_name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {product.rating} stars
                    </Typography>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="contained"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </ProductContainer>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to the shopping cart!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ProductList;
