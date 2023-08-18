import React from "react";
import Dashboard from "app/pages/mainMenu/dashboard/Dashboard";
import Management from "app/pages/management/Management";
import CategoryManagement from "app/pages/mainMenu/categoryManagement/CategoryManagement";
import Surveys from "app/pages/mainMenu/surveys/Surveys";
import QuestionPools from "app/pages/mainMenu/questionPools/QuestionPools";
import Reports from "app/pages/mainMenu/reports/Reports";
import Demographics from "app/pages/mainMenu/demographics/Demographics";
import { Navigate } from "react-router-dom";
import Protected from "./Protected";

const mainMenuRoutes = [
	{
		path: "/mainMenu/dashboard",
		element: (
			<Protected>
				<Dashboard />
			</Protected>
		),
	},
	{
		path: "/mainMenu/management",
		element: (
			<Protected>
				<Management />
			</Protected>
		),
	},
	{
		path: "/mainMenu/categoryManagement",
		element: (
			<Protected>
				<CategoryManagement />
			</Protected>
		),
	},
	{
		path: "/mainMenu/demographics",
		element: (
			<Protected>
				<Demographics />
			</Protected>
		),
	},

	{
		path: "/mainMenu/surveys",
		element: (
			<Protected>
				<Surveys />
			</Protected>
		),
	},

	{
		path: "/mainMenu/questionPools",
		element: (
			<Protected>
				<QuestionPools />
			</Protected>
		),
	},
	{
		path: "/mainMenu/reports",
		element: (
			<Protected>
				<Reports />
			</Protected>
		),
	},
];

export default mainMenuRoutes;
