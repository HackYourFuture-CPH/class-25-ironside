import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import signupImage from "../../assets/signup.png";
import "./Signup.css";
export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { signup, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      return setError("Password should be more than 8 characters");
    }
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      await updateUser(firstName, lastName);
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 1300,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={1}>
          {/* Left Column */}
          <Grid item xs={12} md={6} className="signup-column">
            <Box height="100vh" padding={5}>
              <Typography component="p" variant="h5">
                Dashboard
              </Typography>
              <div className="signup-container">
                <Typography variant="h6">Sign Up</Typography>
                <Typography variant="subtitle1">Select subscription</Typography>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="name-wrapper">
                    <div className="label-wrap">
                      <InputLabel className="label">First name</InputLabel>
                      <TextField
                        name="fName"
                        id="outlined-required"
                        label="First Name"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        sx={{
                          width: { sm: 120, md: 120 },
                          "& .MuiInputBase-root": {
                            height: 50,
                          },
                        }}
                      />
                    </div>
                    <div className="label-wrap">
                      <InputLabel className="label">Last name</InputLabel>
                      <TextField
                        name="lName"
                        id="outlined-required"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{
                          width: { sm: 120, md: 120 },
                          "& .MuiInputBase-root": {
                            height: 50,
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="label-wrap">
                    <InputLabel className="label">Email</InputLabel>
                    <TextField
                      name="email"
                      id="outlined-required"
                      label="Enter email"
                      variant="outlined"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      sx={{
                        width: { sm: 273, md: 273 },
                        "& .MuiInputBase-root": {
                          height: 50,
                        },
                      }}
                    />
                  </div>
                  <div className="label-wrap">
                    <InputLabel className="label">Password</InputLabel>
                    <TextField
                      name="password"
                      id="outlined-required"
                      label="Enter password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      sx={{
                        width: { sm: 273, md: 273 },
                        "& .MuiInputBase-root": {
                          height: 50,
                        },
                      }}
                    />
                  </div>
                  <div className="label-wrap">
                    <InputLabel className="label">Confirm Password</InputLabel>
                    <TextField
                      name="passwordConfirm"
                      id="outlined-required"
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                      sx={{
                        width: { sm: 273, md: 273 },
                        "& .MuiInputBase-root": {
                          height: 50,
                        },
                      }}
                    />
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox name="rem-password" value="rem-password" />
                    }
                    label="Remember me"
                  />
                  <div>
                    <button disabled={loading} type="submit" className="btn">
                      Sign Up
                    </button>
                  </div>
                  <div>
                    <Typography variant="subtitle1">
                      Already have an account?
                    </Typography>
                    <Link to="/login">Log In</Link>
                  </div>
                </form>
              </div>
            </Box>
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={6} className="image-column">
            <Box height="100vh" marginTop={5}>
              <img className="handimage" src={signupImage} alt="Home" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
