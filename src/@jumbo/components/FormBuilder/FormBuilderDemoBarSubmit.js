import axios from "../axios";
import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "../CSS/formbuilderpreviewsubmit.css";
import ModalFormBuilder from "./ModalFormBuilder";
import "../CSS/app.css";
import styles from "../Styles/foo.module.scss";

import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PageLoader from "@jumbo/components/PageComponents/PageLoader";

const FormBuilderDemoBarSubmit = (props) => {
  const [finalData, setFinalData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [signature, setSignature] = useState(false);
  const [loading, setLoading] = useState("");
  const [formName, setFormName] = useState("");
  const [signatureBase64, setSignatureBase64] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const _onUpdate = _onChange;
  let { id, userId, shiftId } = useParams();
  useEffect(() => {
    getFormData();
    ElementStore.subscribe((state) => _onUpdate(state.data));
  }, []);
  document.addEventListener("message", handleEvent);
  function handleEvent(message) {
    setSignatureBase64(message.data.message);
  }
  const getFormData = async () => {
    try {
      setLoading("loading");
      const { data } = await axios.get(`/formbuilder/${id}`);
      if (data) {
        setFormName(data.formName);
        setFinalData(data.formData);
        setSignature(data.signature);
        setLoading("loaded");
      }
    } catch (e) {
      setLoading("error");
      console.log(e);
    }
  };
  function _onSubmit(data) {
    console.log(data);
    saveForm();

    // Place code to post json data to server here
  }

  function _onChange(data) {
    console.log("onChange", data);
  }
  const saveForm = async (e) => {
    try {
      setLoading("loading");
      const response = await axios.post(`/user/signature`, {
        signature: signatureBase64,
      });
      if (response && response.data) {
        try {
          const { data } = await axios.post(`/submitForm`, {
            formId: id,
            userId: userId,
            shiftId: shiftId,
            formData: e,
            signature: response.data && response.data.url,
          });
          if (data) {
            window.ReactNativeWebView.postMessage("submitted");
            setLoading("loaded");
          }
        } catch (e) {
          console.log(e?.response.data.message);
          setLoading("loaded");
        }
      }
    } catch (e) {
      console.log(e?.response.data.message);
      setLoading("loaded");
    }
  };

  let modalClass = "modal";
  if (previewVisible) {
    modalClass += " show d-block";
  }

  return (
    <div className={styles.bootstrap}>
      <div className="clearfix" style={{ margin: "10px", width: "70%" }}>
        {loading === "loading" && (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 100,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.2s ease",
            }}
          >
            <PageLoader />
          </div>
        )}
        {loading === "loaded" && (
          <ModalFormBuilder open={previewVisible} setOpen={setPreviewVisible}>
            <div className={modalClass}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <p style={{ margin: 10, fontSize: 26, fontWeight: 900 }}>
                    {formName}
                  </p>
                  <ReactFormGenerator
                    data={finalData}
                    onSubmit={saveForm}
                    submitButton={
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: "#007bff" }}
                      >
                        Submit
                      </button>
                    }
                    back_action={() => console.log("back")}
                    // back_name="Back"
                    backButton={
                      signature ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: "transparent",
                            color: "#007bff",
                            float: "right",
                          }}
                          onClick={() =>
                            window.ReactNativeWebView.postMessage("signature")
                          }
                        >
                          Signature
                        </button>
                      ) : (
                        <></>
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </ModalFormBuilder>
        )}
      </div>
    </div>
  );
};

export default FormBuilderDemoBarSubmit;
