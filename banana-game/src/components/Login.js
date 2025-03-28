import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Cookies from "js-cookie";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Cookies.set("user", JSON.stringify({ email }), { expires: 7 }); // Save cookie for 7 days
      navigate("/menu");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4">Login to Banana Game</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email (Gmail only)"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email.endsWith("@gmail.com") && email.length > 0}
            helperText={!email.endsWith("@gmail.com") && email.length > 0 ? "Must be a Gmail address" : ""}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;