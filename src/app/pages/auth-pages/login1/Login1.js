import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
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
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import { supabase } from "supabaseClient";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  textField: {
    // marginLeft: "24px",
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
    color: "#fff",
    fontSize: 16,
  },
  text: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
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
  React.useEffect(() => {
    setActiveLayout(LAYOUT_NAMES.SOLO_PAGE);
  }, []);
  const Swal = useSwalWrapper();


  const onSignIn = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      // const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      // navigate("/mainMenu/dashboard");
      window.location.href = "/mainMenu/dashboard";
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.error_description || error.message,
      });
    }
  };


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // navigate("/mainMenu/dashboard");
        window.location.href = "/mainMenu/dashboard";
      }
    });
  }, []);
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
        backgroundColor: "#1E242B",
      }}
    >
      <Card sx={{ maxWidth: "100%", width: 480, mb: 4, radius: "14px" }}>
        <CardContent sx={{ pt: 0 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              await onSignIn(data.email, data.password);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Div sx={{ mb: 3, mt: 6 }}>
                  <Typography
                    variant={"h1"}
                    sx={{
                      color: "#1E242B",
                      fontSize: "38px",
                      marginBottom: "10px",
                    }}
                  >
                    Welcome back!
                  </Typography>
                  <Typography
                    variant={"body1"}
                    sx={{
                      color: "#333D47",
                      fontSize: "16px",
                      marginBottom: "60px",
                      marginLeft: "10px",
                    }}
                  >
                    Please login using your account
                  </Typography>
                </Div>
                <Div sx={{ mb: 4, mt: 1 }}>
                  <JumboTextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant={"outlined"}
                    className={classes.textField}
                    style={{
                      marginBottom: "26px",
                      width: "100%",
                      overflow: "visible",
                    }}
                  />

                  <JumboTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    style={{ width: "100%", overflow: "visible" }}
                  />
                </Div>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3 }}
                  loading={isSubmitting}
                  className={classes.button}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#537898",
                    boxShadow: "0px 12px 16px rgba( 206,182,234)",
                    marginTop: "10px",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  LOGIN
                </LoadingButton>

                <Div sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={2}
                    columns={16}
                    style={{ marginLeft: "41px", marginBottom: "49px" }}
                  >
                    <Grid item xs={8}>
                      <Typography textAlign={"left"} variant={"body1"}>
                        Forgot your password?
                      </Typography>{" "}
                    </Grid>
                    <Grid item xs={8}>
                      <Typography textAlign={"left"} variant={"body1"}>
                        <Link
                          underline="underline"
                          href="/auth-pages/forgot-password"
                        >
                          Reset Here{" "}
                        </Link>
                      </Typography>{" "}
                    </Grid>
                  </Grid>
                </Div>
                {/* <LoadingButton
                  fullWidth
                  type="button"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3 }}
                  loading={isSubmitting}
                  className={classes.button}
                  style={{
                    backgroundColor: "#FF372F",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  CREATE AN ACCOUNT
                </LoadingButton> */}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login1;
