import Avatar from "@mui/material/Avatar";
import React, { useState } from "react"; // Removed unnecessary import
import { useNavigate, useLocation } from "react-router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { Copyright, defaultTheme } from "./../Theme/Theme.js";
import axios from "axios";
import useAuth from "../auth/auth.js";
import {
  NEW_TIMEOUT_IN_SECONDS,
  setItemWithTimeout,
} from "../auth/setTimeOut.js";
import { REACT_APP_API_URL } from "../../config.js";
import { URL_FETCH_AZURE_SERVER } from "../../config.js";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Access the login function directly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create an axios instance with CORS configuration
      const axiosInstance = axios.create({
        //withCredentials: true, // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://zookay-web.vercel.app",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          // Add any other necessary headers
        },
      });

      // Use the axios instance for the request
      const response = await axiosInstance.post(
        `${URL_FETCH_AZURE_SERVER}user/login`,
        { email, password }
      );

      if (response.data.account != null) {
        const token = response.data.jwt;
        // const token = JSON.stringify(response.data.jwt)
        // login(user, token);
        // setWithExpiry('token', token, 2000)
        // localStorage.setItem('token', JSON.stringify({data: token, timestamp: Date.now()}))
        setItemWithTimeout("token", token, NEW_TIMEOUT_IN_SECONDS);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed: ", error);
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(./../../assets/images/entrance.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            {/* Display error message */}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
