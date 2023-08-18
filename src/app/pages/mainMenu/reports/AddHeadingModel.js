import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React,{useState} from "react";
import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Row, Col,Input} from "antd";
import { Add } from "@mui/icons-material";
// import { CKEditor } from "ckeditor4-react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { customSort } from "app/api/API";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "900px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "auto",
  height: "fit-content",
};

export default function AddHeadingModal({ headings, setHeadings }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [heading, setHeading] = useState({
    heading: null,
    sub_heading: null,
    htmlContent: null,
    img: "",
  });
  const handleAddHeading = () => {
    let arr = [...headings];
    const newObject = heading;
    // Find the index of the existing sub-heading
    const existingSubHeading = newObject.sub_heading;
    const existingIndex = arr.findIndex(
      (item) => item.sub_heading === existingSubHeading
    );

    if (existingIndex !== -1) {
      let subH = newObject.sub_heading;
      var filterArr = [];
      var leftArr = [];
      arr.forEach((v) => {
        if (
          v.sub_heading.startsWith(
            subH.length > 1 ? subH.slice(0, subH.length - 1) : subH
          ) &&
          parseInt(subH.slice(-1)) <= parseInt(v.sub_heading.slice(-1)) &&
          v.sub_heading.length === subH.length
        ) {
          filterArr.push(v);
        } else {
          leftArr.push(v);
        }
      });
      // Increment the sub-heading value of subsequent objects
      let increasingArr = [];
      filterArr.forEach((v, i) => {
        let obj = { ...v };
        const subHeadingParts = obj.sub_heading.split(".");
        const lastPart = parseInt(subHeadingParts[subHeadingParts.length - 1]);
        const incrementedSubHeading = subHeadingParts
          .slice(0, subHeadingParts.length - 1)
          .concat(lastPart + 1)
          .join(".");

        obj.sub_heading = incrementedSubHeading;
        increasingArr.push({ ...obj });
      });
      increasingArr.push(newObject);
      let mergedArr = [...increasingArr, ...leftArr];
      let sortedArr = mergedArr.sort(customSort);
      console.log(sortedArr);
      setHeadings([...sortedArr]);

      handleClose()
    }else{
        arr.push(newObject)
      let sortedArr = arr.sort(customSort);
     
        setHeadings([...sortedArr]);
        handleClose();
    }
  };
console.log(heading);;

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <Add />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Grid container spacing={4}>
            <Grid item xs={10}>
              <h2>Add</h2>
            </Grid>
            <Grid
              item
              xs={2}
              style={{ display: "flex", flexDirection: "row-reverse" }}
            >
              <IconButton style={{ height: "48px" }} onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box>
            <Row align="middle" justify="space-between">
              <Col span={6}>
                <p className="report-h">
                  <b>Heading:</b>
                </p>
              </Col>
              <Col span={18}>
                <Input
                  value={heading.heading}
                  onChange={(e) => {
                    setHeading({
                      ...heading,
                      heading: e.target.value,
                    });
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
                <Input
                  value={heading.sub_heading}
                  onChange={(e) => {
                    setHeading({
                      ...heading,
                      sub_heading: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row align="middle" justify="space-between">
              <Col span={6}>
                <p className="report-h">
                  <b>Content:</b>
                </p>
              </Col>
              <Col span={18}>
                <CKEditor
                editor={ClassicEditor}
                  data={heading.htmlContent}
                  onChange={(e,editor) => {
                    let obj={...heading}
                    obj.htmlContent=editor.getData()
                    setHeading({...obj});
                  }}
                />
              </Col>
            </Row>
            <Row align="middle" justify="space-between">
              <Col span={6}>
                <p className="report-h">
                  <b>Select Image:</b>
                </p>
              </Col>
              <Col span={18}>
                <Input
                  type="file"
                  onChange={(e) => {
                    setHeading({
                      ...heading,
                      img: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
              </Col>
            </Row>
            <Box>
                <Button type="primary" onClick={()=>{
                     if (Object.values(heading).every((v)=>v)) {
                        handleAddHeading();
                     }else{
                        alert('fill required data');
                     }
                }}>Add</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
