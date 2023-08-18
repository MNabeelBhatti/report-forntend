import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactFormBuilder, ElementStore } from "react-form-builder2";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "../CSS/formbuilder.css";
import "../CSS/app.css";
// import axios from "../axios";
import styles from "../Styles/foo.module.scss";

const FormBuilder = ({ setLoading }) => {
  const [loadingState, setLoadingState] = useState("not_loaded");

  const onPost = (data) => {
    // const saveUrl = getUrl(this.formId);
    // console.log('onPost', data.task_data);
    // post(saveUrl, data);
  };

  return (
    <div className={styles.bootstrap}>
      <div className="App">
        <ReactFormBuilder onPost={onPost} editMode />
      </div>
    </div>
  );
};

export default FormBuilder;
