import axios from "../axios";
import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "../CSS/formbuilderpreview.css";
import ModalFormBuilder from "./ModalFormBuilder";

import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "../CSS/app.css";
import styles from "../Styles/foo.module.scss";

const FormBuilderDemoBarEdit = ({ setLoading }) => {
  const [finalData, setFinalData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [formName, setFormName] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const _onUpdate = _onChange;
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFormData();
    ElementStore.subscribe((state) => _onUpdate(state.data));
  }, []);
  const getFormData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/formbuilder/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (data) {
        setFormName(data.formName);
        setLoading(false);
      }
    } catch (e) {
      console.log(e?.response);
      setLoading(false);
    }
  };

  function showPreview() {
    setPreviewVisible(true);
  }

  function closePreview() {
    setPreviewVisible(false);
  }

  function _onChange(data) {
    setFinalData(data);
  }
  const saveForm = async () => {
    if (formName === "") {
      return console.log("error");
    }
    // Place code to post json data to server here
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/formbuilder`,
        {
          formName: formName,
          formData: finalData,
        },

        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (data) {
        console.log(data);

        setLoading(false);
        navigate.push("/form-builder/details");
      }
    } catch (e) {
      console.log(e?.response.data.message);
      setLoading(false);
    }
  };
  const updateForm = async () => {
    if (formName === "") {
      return console.log("error");
    }
    // Place code to post json data to server here
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/formbuilder/${id}`,
        {
          formName: formName,
          formData: finalData,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (data) {
        console.log(data);
        setLoading(false);
        navigate.push("/form-builder/details");
      }
    } catch (e) {
      console.log(e?.response.data.message);
      setLoading(false);
    }
  };

  let modalClass = "modal";
  if (previewVisible) {
    modalClass += " show d-block";
  }

  return (
    <div className={styles.bootstrap}>
      <div className="clearfix" style={{ margin: "10px", width: "70%" }}>
        <TextField
          id="outlined-basic"
          label="Form Name"
          variant="outlined"
          style={{
            width: "40%",
            marginLeft: "-10px",
            border: "1px solid #000",
          }}
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "10px", height: 55 }}
          onClick={() => showPreview()}
        >
          Preview Form
        </button>
        <button
          className="btn btn-primary"
          style={{ marginLeft: "10px", height: 55 }}
          onClick={() =>
            window.location.href.indexOf("create") > -1
              ? saveForm()
              : updateForm()
          }
        >
          {window.location.href.indexOf("create") > -1
            ? "Save Form"
            : "Update Form"}
        </button>
        {previewVisible && (
          <ModalFormBuilder open={previewVisible} setOpen={setPreviewVisible}>
            <div className={modalClass}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <p style={{ margin: 10, fontSize: 16, fontWeight: 800 }}>
                    {formName}
                  </p>
                  <ReactFormGenerator
                    data={finalData}
                    onSubmit={() => {}}
                    submitButton={<></>}
                  />
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      onClick={() => closePreview()}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ModalFormBuilder>
        )}
      </div>
    </div>
  );
};

export default FormBuilderDemoBarEdit;
