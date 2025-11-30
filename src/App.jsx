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
  useColorScheme,
} from "@mui/material";


function App() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const products = [
    { id: 1, title: "Product 1", price: 20 },
    { id: 2, title: "Product 2", price: 35 },
    { id: 3, title: "Product 3", price: 15 },
  ];

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      {/* Header */}
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

          <Box>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Products</Button>

            <IconButton
              color="inherit"
              onClick={() => setCartOpen(!cartOpen)}
              sx={{ ml: 2 }}
            >
              <Badge badgeContent={totalQuantity} color="error">
                {/* <ShoppingCartIcon
                 /> */}
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Cart */}
      {cartOpen && <Cart />}

      <Box p={3}>
        <Typography variant="h5">Products</Typography>
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {products.map((product) => (
            <Card key={product.id} sx={{ width: 200 }}>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography>${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
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

export default App;
