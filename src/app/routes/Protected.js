import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { supabase } from "supabaseClient";

function Protected({ children, ...rest }) {
	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) {
				navigate("/auth-pages/login");
			}
		});
	}, []);

	return children;
}

export default Protected;
