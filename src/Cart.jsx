import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "./redux/redcer/CartSlice";

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    })
      .then((res) => res.json())
      .then((data) => console.log("Server response:", data))
      .catch((err) => console.error("Error:", err));
  };

  if (cartItems.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Your Cart
      </Typography>

      <Stack spacing={2}>
        { cartItems.map((item) => (
          <Card key={item.id} sx={{ display: "flex", alignItems: "center", p: 1 }}>
          
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>${item.price}</Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={() => dispatch(decreaseQty(item.id))}
              >
                -
              </Button>
              <Typography mx={1}>{item.quantity}</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => dispatch(increaseQty(item.id))}
              >
                +
              </Button>
              <IconButton
                color="error"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                {/* <DeleteIcon /> */}
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Send Order
      </Button>
    </Box>
  );
};

export default Cart;
