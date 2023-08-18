import React from "react";
import { Navigate } from "react-router-dom";
import authRoutes from "./authRoutes";
import mainMenuRoutes from "./mainMenuRoutes";
const routes = [
  {
    path: "/",
    element: <Navigate to={"/auth-pages/login"} />,
  },

  ...mainMenuRoutes,
  // ...dashboardRoutes,
  // ...appsRoutes,
  // ...widgetsRoutes,
  // ...metricsRoutes,
  // ...muiRoutes,
  // ...extensionsRoutes,
  // ...calendarRoutes,
  // ...chartRoutes,
  // ...mapRoutes,
  ...authRoutes,
  // ...extraRoutes,
  // ...userRoutes,
  // ...listViewRoutes,
  // ...gridViewRoutes,
];

export default routes;
