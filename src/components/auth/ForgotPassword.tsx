"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { forgorPassword } from "@/lib/services/UserService";
import { IForgotPasswordPayload } from "@/models/auth/UserModel";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [formData, setFormData] = useState<IForgotPasswordPayload>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMisMatchError, setPasswordMisMatchError] =
    useState<boolean>(false);
  const [passwordMisMatchErrorMessage, setPasswordMisMatchErrorMessage] =
    useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    let isValid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!formData.newPassword || formData.newPassword.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordMisMatchError(true);
      setPasswordMisMatchErrorMessage(
        "New Password and Confirm Passwaord is not matching"
      );
      isValid = false;
    } else {
      setPasswordMisMatchError(false);
      setPasswordMisMatchErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      if (emailError || passwordError || passwordMisMatchError) {
        return;
      }

      try {
        setLoading(true);
        const response = await forgorPassword(formData);
        setLoading(false);
        if (response) {
          handleClose();
        }
      } catch {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address and Phone number.
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              onChange={handleChange}
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">New Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="newPassword"
              placeholder="••••••"
              type="password"
              id="newPassword"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              onChange={handleChange}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <TextField
              error={passwordMisMatchError}
              helperText={passwordMisMatchErrorMessage}
              name="confirmPassword"
              placeholder="••••••"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              onChange={handleChange}
              color={passwordMisMatchError ? "error" : "primary"}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={() => handleSubmit()}
          loading={loading}
          loadingIndicator={
            <CircularProgress size={24} sx={{ color: "#FFFF" }} />
          }
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
