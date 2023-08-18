import React from "react";
import Avatar from "@mui/material/Avatar";
import { authUser } from "./fake-db";
import {
	ListItemIcon,
	MenuItem,
	ThemeProvider,
	Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import { useJumboTheme } from "@jumbo/hooks";
import { ArrowDropDown, Logout } from "@mui/icons-material";
import { supabase } from "supabaseClient";

const AuthUserDropdown = () => {
	const { theme } = useJumboTheme();

	const onLogout = async () => {
		const { error } = await supabase.auth.signOut();
		// clear the local storage
		window.localStorage.removeItem("sb-34-auth-token");
		localStorage.clear();

		if (error) throw error;
		window.location.href = "/auth-pages/login";
		//mutation.mutate();
	};

	return (
		<ThemeProvider theme={theme}>
			<Divider
				orientation='vertical'
				flexItem
				style={{ width: "1px" }}
			></Divider>
			<Avatar
				src={authUser.profile_pic}
				sx={{
					bgcolor: "#C4C4C4",
					borderRadius: "10px",
					width: "50px",
					height: "50px",
				}}
				variant='rounded'
			></Avatar>
			<Div>
				<Typography variant={"h5"} style={{ color: "#fff" }}>
					{authUser.name}
				</Typography>
				<Typography variant={"h7"} style={{ color: "#fff" }}>
					Super Admin
				</Typography>
			</Div>
			<JumboDdPopover
				triggerButton={<ArrowDropDown style={{ color: "#fff" }} />}
			>
				<List>
					<MenuItem style={{ padding: "12px" }} onClick={onLogout}>
						<ListItemIcon>
							<Logout fontSize='small' />
						</ListItemIcon>
						Logout
					</MenuItem>
				</List>
			</JumboDdPopover>
		</ThemeProvider>
	);
};

export default AuthUserDropdown;
