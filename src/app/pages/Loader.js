import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
export default function Loader() {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        width: "100%",
        minHeight: "100vh",
        height:"100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.2s ease",
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
}
