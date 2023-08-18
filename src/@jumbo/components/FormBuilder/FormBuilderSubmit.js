import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactFormBuilder, ElementStore } from "react-form-builder2";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "../CSS/formbuilder.css";
import axios from "../axios";
import "../CSS/app.css";
import styles from "../Styles/foo.module.scss";

const FormBuilderSubmit = ({ setLoading }) => {
  let { id } = useParams();
  const [formData, setFormData] = useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [loadingState, setLoadingState] = useState("not_loaded");

  useEffect(() => {
    getFormData();
  }, []);
  const getFormData = async () => {
    setLoadingState("loading");

    axios
      .get(`/formbuilder/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setFormData(response.data.formData);
          setLoadingState("loaded");
        }
      })
      .catch((error) => {
        setLoadingState("error");

        console.log(error);
      });
  };
  const onPost = (data) => {
    // const saveUrl = getUrl(this.formId);
    console.log("onPost", data.task_data);
    // post(saveUrl, data);
  };

  return (
    <div className={styles.bootstrap}>
      <div className="App">
        {loadingState === "not_loaded" && "whatever you want to be here"}
        {loadingState === "loading" && "loading"}
        {loadingState === "error" && "something went wrong"}
        {loadingState === "loaded" && (
          <ReactFormBuilder data={formData} onPost={onPost} />
        )}
      </div>
    </div>
  );
};

export default FormBuilderSubmit;
