import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    return pwd.length >= 6; // Example: Minimum 6 characters
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      setError("Email must be a Gmail address");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!name || !birthday) {
      setError("All fields are required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/login");
    } catch (err) {
      setError("Signup failed: " + err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4">Create an Account</Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            label="Birthday"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;