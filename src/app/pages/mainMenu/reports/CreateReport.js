import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Space,
  Checkbox,
  Popconfirm,
} from "antd";
import { Box, Grid } from "@mui/material";
import { CKEditor } from "ckeditor4-react";

import ClearIcon from "@mui/icons-material/Clear";

import {
  constantStyles,
  ModalStyle,
} from "../../../../@jumbo/components/Styles/styles";

import { IconButton, Radio, RadioGroup } from "@material-ui/core";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "app/AppProvider";

import { useSelector } from "react-redux";
import { supabase } from "../../../../supabaseClient";
// Dummy Data for report structure
import "./myreport.scss";
import { contentData } from "./contentData";
import PreviewModal from "./PreviewModal";
import { addAdjacentHeading, addChildHeading, customSort } from "app/api/API";

import Loader from "app/pages/Loader";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};


const CreateReport = (props) => {
  const { themeType } = useContext(AppContext);
  const useStyles = makeStyles(constantStyles(themeType));
  const classes = useStyles();
  const session = useSelector((state) => state.auth.session);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(null);
  const [headings, setHeadings] = useState([...contentData]);
  const initialReport = {
    title: null,
    coverImg: null,
    headings: headings,
    tableOfContent: false,
    tableOfFigures: false,
    isNew: true,
    projectName: "Sample Survey",
    projectNumber: "00099",
    clientName: "Shivm Dube",
  };
  const [report, setReport] = useState(initialReport);
  const handleAddChild = async (subheading) => {
    let newarr = await addChildHeading(headings, subheading);
    setHeadings(newarr);
    setIndex(null);
  };
  const handleAddAdjacent = async (subheading) => {
    let newarr = await addAdjacentHeading(headings, subheading);
    setHeadings(newarr);
    setIndex(null);
  };
  const reportData = () => ({ ...report, headings: [...headings] });
  const uploadFile = async (file) => {
    try {
      setLoading(true);
      let res = await supabase.storage
        .from("wsp")
        .upload(`report/${file?.name?.replaceAll(/\s/g, "")}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      setLoading(false);
      return `http://52.23.223.200:8000/storage/v1/object/public/wsp/report/${file?.name?.replaceAll(
        /\s/g,
        ""
      )}`;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (props?.updateReport) {
      setReport({
        ...props?.updateReport,
        projectName: "Sample Survey",
        projectNumber: "00099",
        clientName: "Shivm Dube",
      });
      setHeadings(props?.updateReport?.headings);
    } else {
      setReport(initialReport);
    }
  }, [props?.updateReport]);
  return (
    <Box sx={ModalStyle}>
      {loading && <Loader />}
      <Grid container spacing={4}>
        <Grid item xs={10}>
          <h2>{report?.isNew ? "Create New" : "Update"} Report</h2>
        </Grid>
        <Grid
          item
          xs={2}
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <IconButton style={{ height: "48px" }} onClick={props.handleClose}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div className="my-report">
        <Row align="middle" justify="space-between">
          <Col span={6}>
            <p className="report-h">
              <b>Enter Title:</b>
            </p>
          </Col>
          <Col span={18}>
            <Input
              value={report?.title}
              onChange={(e) => {
                let obj = { ...report };
                obj.title = e.target.value;
                setReport({ ...obj });
              }}
            />
          </Col>
        </Row>
        <Row align="middle" justify="space-between">
          <Col span={6}>
            <p className="report-h">
              <b>Cover Image:</b>
            </p>
          </Col>
          <Col span={18}>
            {report?.coverImg && report?.coverImg !== "" ? (
              <label style={{ cursor: "pointer" }}>
                <img
                  style={{ objectFit: "contain" }}
                  height={400}
                  src={report?.coverImg}
                />
                <Input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    let file = e.target.files[0];
                    let url = await uploadFile(file);
                    let obj = { ...report };
                    obj.coverImg = url;
                    setReport({ ...obj });
                  }}
                />
              </label>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  let file = e.target.files[0];
                  let url = await uploadFile(file);
                  let obj = { ...report };
                  obj.coverImg = url;
                  setReport({ ...obj });
                }}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Checkbox
            onChange={(e) => {
              let obj = { ...report };
              obj.tableOfContent = e.target.checked;
              setReport({ ...obj });
            }}
          >
            <p className="report-h">Add Table of Content</p>
          </Checkbox>
        </Row>
        <Row>
          <Checkbox
            onChange={(e) => {
              let obj = { ...report };
              obj.tableOfFigures = e.target.checked;
              setReport({ ...obj });
            }}
          >
            <p className="report-h">Add Table of figure</p>
          </Checkbox>
        </Row>
        {/* <Row align="middle" justify="space-between">
          <Col span={18}></Col>
          <Col span={1}>
            <Button type="primary" onClick={handleAddHeading}>
              +
            </Button>
          </Col>
        </Row> */}
        {headings?.map((v, i) => {
          return (
            <div key={i}>
              <Row
                style={{ marginBottom: "10px" }}
                align="middle"
                justify="space-between"
              >
                <Col span={18}>
                  <span>{i + 1}</span>
                </Col>
                <Col span={1}>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleAddChild(v.sub_heading);
                    }}
                  >
                    Child
                    {/* <AddHeadingModal
                      headings={headings}
                      setHeadings={setHeadings}
                    /> */}
                  </Button>
                </Col>
                <Col span={1}>
                  <Button
                    onClick={() => {
                      handleAddAdjacent(v.sub_heading);
                    }}
                    type="primary"
                  >
                    Adjacent
                  </Button>
                </Col>
                <Col span={1}>
                  <Button
                    onClick={() => {
                      if (window.confirm("Are u sure?")) {
                        let arr = [...headings];
                        arr.splice(i, 1);
                        setHeadings([...arr]);
                      }
                    }}
                    type="primary"
                  >
                    <ClearIcon />
                  </Button>
                </Col>
              </Row>
              <Row align="middle" justify="space-between">
                <Col span={6}>
                  <p className="report-h">
                    <b>Heading:</b>
                  </p>
                </Col>
                <Col span={18}>
                  <Input
                    value={v?.heading}
                    onChange={(e) => {
                      let arr = [...headings];
                      let obj = arr[i];
                      obj.heading = e.target.value;
                      setHeadings([...arr]);
                    }}
                  />
                </Col>
              </Row>
              <Row align="middle" justify="space-between">
                <Col span={6}>
                  <p className="report-h">
                    <b>Sub Heading:</b>
                  </p>
                </Col>
                <Col span={18}>
                  <Input disabled value={v?.sub_heading} />
                </Col>
              </Row>
              <Row align="middle" justify="space-between">
                <Col span={6}>
                  <p className="report-h">
                    <b>Select Image:</b>
                  </p>
                </Col>
                <Col span={18}>
                  {v.img !== "" ? (
                    <label style={{ cursor: "pointer" }}>
                      <img width={"100%"} height={400} src={v?.img} />
                      <Input
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          let file = e.target.files[0];
                          let url = await uploadFile(file);
                          let arr = [...headings];
                          let obj = arr[i];
                          obj.img = url;
                          setHeadings([...arr]);
                        }}
                      />
                    </label>
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        let file = e.target.files[0];
                        let url = await uploadFile(file);
                        let arr = [...headings];
                        let obj = arr[i];
                        obj.img = url;
                        setHeadings([...arr]);
                      }}
                    />
                  )}
                </Col>
              </Row>

              <Row align="middle" justify="space-between">
                <Col span={6} onClick={() => setIndex(null)}>
                  <p className="report-h">
                    <b>Content:</b>
                  </p>
                </Col>
                <Col onClick={() => setIndex(i)} span={18}>
                  {index === i ? (
                    <CKEditor
                      style={{ height: "fit-content" }}
                      // editor={ ClassicEditor }
                      initData={v?.htmlContent}
                      onChange={(e, editor) => {
                        let arr = [...headings];
                        let obj = arr[i];
                        obj.htmlContent = e.editor.getData();
                        setHeadings([...arr]);
                      }}
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: v.htmlContent }} />
                  )}
                </Col>
              </Row>

              <hr />
            </div>
          );
        })}
      </div>
   
      <PreviewModal report={reportData()} />
    </Box>
  );
};

export default CreateReport;
