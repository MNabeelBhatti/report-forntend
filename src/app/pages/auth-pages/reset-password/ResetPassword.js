import React from "react";
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
import { CustomTextField } from "@jumbo/components/Styles/styles";
import { supabase } from "supabaseClient";

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
	const [password, setPassword] = React.useState("");
	const [hash, setHash] = React.useState();

	const navigate = useNavigate();

	const { setActiveLayout } = useJumboApp();

	React.useEffect(() => {
		setActiveLayout(LAYOUT_NAMES.SOLO_PAGE);
	}, []);

	React.useEffect(() => {
		setHash(window.location.hash);
		console.log(window.location.hash);
	}, []);

	const handleSubmit = async () => {
		try {
			const hashArr = hash
				.substring(1)
				.split("&")
				.map((item) => item.split("="));

			const { error } = await supabase.auth.updateUser(
				{
					password: password,
				},
				{
					accessToken: hashArr[0][1],
				}
			);
			navigate("/auth-pages/login");
		} catch (error) {
			console.log(error);
		}
	};

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
							email: "demo@example.com",
							password: "123456",
						}}
						validationSchema={validationSchema}
						onSubmit={(data, { setSubmitting }) => {
							setSubmitting(true);

							setSubmitting(false);
						}}
					>
						{({ isSubmitting }) => (
							<Form style={{ textAlign: "left" }} noValidate autoComplete='off'>
								{mutation.isError && <p>{mutation.error.message}</p>}
								<Div sx={{ mb: 3, mt: 6 }}>
									<Typography
										variant={"h1"}
										sx={{
											color: "#1E242B",
											fontSize: "38px",
											marginBottom: "70px",
										}}
									>
										Reset Your Password{" "}
									</Typography>
								</Div>
								<Div sx={{ mb: 1, mt: 1 }}>
									<CustomTextField
										fullWidth
										name='password'
										label='Password'
										type='password'
										className={classes.textField}
										style={{ marginBottom: "40px" }}
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
								</Div>

								<LoadingButton
									onClick={() => handleSubmit()}
									fullWidth
									type='submit'
									variant='contained'
									size='large'
									sx={{ mb: 3, mt: 1 }}
									loading={isSubmitting || mutation.isLoading}
									className={classes.button}
									style={{
										backgroundColor: "#FF372F",
									}}
								>
									CONFIRM
								</LoadingButton>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</Div>
	);
};

export default Login1;
