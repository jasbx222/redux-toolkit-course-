import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/redcer/CartSlice";
import { toggleTheme } from "./redux/redcer/ThemeSlice";
import Cart from "./Cart";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Badge,
} from "@mui/material";



import { useQuery } from "@tanstack/react-query";
import { api } from "./api/api";

export default function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("product?page=1&perPage=30");
      return res.data;
    },
  });

  const [cartOpen, setCartOpen] = useState(false);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;

  return (
    <div>
      {/* ================= HEADER ================= */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">MyStore</Typography>

            <Button
              variant="outlined"
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
            >
              Toggle Theme
            </Button>
          </Box>

          <IconButton color="inherit" onClick={() => setCartOpen(!cartOpen)}>
            <Badge badgeContent={cartItems.length} color="error">
             
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ================= CART ================= */}
      {cartOpen && <Cart />}

      {/* ================= PRODUCTS ================= */}
      <Box p={3}>
        <Typography variant="h5">Products</Typography>

        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {data?.data?.map((product) => (
            <Card key={product.id} sx={{ width: 200 }}>
              <CardContent>
                {/* ✅ عرض أول صورة فقط بشكل آمن */}
                {product?.image?.[0] && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "140px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      mb: 1,
                    }}
                  >
                    <img
                      src={product.image[0].image_url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}

                <Typography variant="h6">{product.name}</Typography>
                <Typography>${product.price}</Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
}
