import React, { useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import shadows from "@mui/material/styles/shadows";
import { alpha } from "@mui/material/styles";
import { auth } from "@jumbo/services/auth/firebase/firebase";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { useJumboApp } from "@jumbo/hooks";
import { LAYOUT_NAMES } from "../../../layouts/layouts";
import { ASSET_AVATARS, ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import { supabase } from "supabaseClient";
import { CustomTextField } from "@jumbo/components/Styles/styles";
import { Color } from "@jumbo/constants/index";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      py: 0,
      "& > fieldset": {
        borderRadius: 14,
        height: "60px",
      },
    },
  },
  button: {
    borderRadius: 12,
    height: "48px",
  },
  text: {
    fontSize: 38,
    fontWeight: "bold",
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login1 = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { setActiveLayout } = useJumboApp();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    setActiveLayout(LAYOUT_NAMES.SOLO_PAGE);
  }, []);

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      navigate("/", { replace: true });
    },
  });

  const onSignIn = (email, password) => {
    mutation.mutate({ email, password });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3001/auth-pages/reset-password",
    });

    if (error) {
      setMessage(error.message);
      console.log(error);
    } else {
      setMessage("Password reset instructions have been sent to your email.");
    }
    setLoading(false);
  };

  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: (theme) => theme.spacing(4),
        backgroundColor: Color.GREY400,
      }}
    >
      <Card sx={{ maxWidth: "100%", width: 480, mb: 4, radius: "14px" }}>
        <CardContent sx={{ pt: 0 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                {mutation.isError && <p>{mutation.error.message}</p>}
                <Div sx={{ mb: 3, mt: 6 }}>
                  <Typography
                    variant={"h1"}
                    sx={{
                      color: Color.GREY400,
                      fontSize: "38px",
                      marginBottom: "50px",
                    }}
                  >
                    Forgot Password{" "}
                  </Typography>
                </Div>
                <Div sx={{ mb: 2, mt: 1 }}>
                  <JumboTextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant={"outlined"}
                    className={classes.textField}
                    style={{
                      width: "100%",
                      overflow: "visible",
                    }}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Div>

                <LoadingButton
                  onClick={handleSubmit}
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3, mt: 2 }}
                  loading={isSubmitting || mutation.isLoading}
                  className={classes.button}
                  style={{
                    backgroundColor: Color.RED,
                  }}
                >
                  Reset Password
                </LoadingButton>
                {message && <p>{message}</p>}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login1;
