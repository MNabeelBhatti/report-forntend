import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import jsPDF from "jspdf";
import { useRef } from "react";
import ReportTemplate from "./ReportTemplate";
import { supabase } from "supabaseClient";
import Loader from "app/pages/Loader";
import axios from "axios";
import { Buffer } from "buffer";
import Pusher from 'pusher-js';
import domToPdf from 'dom-to-pdf';
import html2canvas from "html2canvas";
import io from "socket.io-client";
// import { PDFDownloadLink, Document, Page, View, PDFViewer,Text } from "@react-pdf/renderer";
// import ReactHtmlParser from 'react-html-parser';
// import htmlToPdfmake from 'html-to-pdfmake';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import html2canvas from "html2canvas";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "850px",
  // width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "scroll",
  height: "90vh",
};

export default function PreviewModal({ report }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  let baseUrl = "https://report-backend-lyart.vercel.app";
  let burl = "http://localhost:4000";
  // const [socket, setSocket] = React.useState(null);
  var socket;
  // var pusher;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reportTemplateRef = useRef(null);
  const addReport = async () => {
    await supabase.from("reports").insert({ ...report });
  };
  const updateReport = async () => {
    await supabase
      .from("reports")
      .update({ ...report })
      .eq("id", report.id);
  };
  const convertToPdf = async () => {
     const pdfElement = reportTemplateRef.current;
    const canvas = await html2canvas(pdfElement, {
      allowTaint: true,
      useCORS:true,
      y: 10,
      scrollY: window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }),
      windowWidth: 205 ,
    windowHeight: Math.min(295 - 5, pdfElement.clientHeight-10),
    });
    var imgData = canvas.toDataURL('image/png');
    var imgWidth = 210; 
    var pageHeight = 295;  
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF('p', 'mm');
    var position = 0;
    
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save( 'file.pdf');
    /////////
    // const pdf = new jsPDF("p", "px", 'letter');
    // const pdfElement = reportTemplateRef.current;

    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();
    //   console.log(pdfWidth,pdfHeight);
    // let yOffset = 0;
    // const canvas = await html2canvas(pdfElement, {
    //   y: yOffset,
    //   windowWidth: pdfElement.clientWidth ,
    // windowHeight: Math.min(pdfHeight - 20, pdfElement.clientHeight - yOffset),
    // });
    // const imageData = canvas.toDataURL('image/png');
    // canvas.toBlob((blob)=>{
    //       // console.log(URL.createObjectURL(blob));
    //       window.open(URL.createObjectURL(blob))
    //     })
    // pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, 0);
    // pdf.save('multipage.pdf');
    ////////////////
    // const pageHeight = pdfHeight - 20; // Leave some margin at the bottom
    // while (yOffset < contentHeight) {
    //   const canvas = await html2canvas(pdfElement, {
    //     y: yOffset,
    //     windowWidth: pdfWidth,
    //   windowHeight: Math.min(pageHeight, pdfElement.clientHeight - yOffset),
    //   });
    //   const imageData = canvas.toDataURL('image/png');
    //   canvas.toBlob((blob)=>{
    //     // console.log(URL.createObjectURL(blob));
    //     window.open(URL.createObjectURL(blob))
    //   })
    //   pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, 0);
    //   yOffset += pageHeight;
    //   if (yOffset < contentHeight) {
    //     console.log('page');
    //     pdf.addPage();
    //   }
    // }

    // pdf.save('multipage.pdf');
  };
  const handleGeneratePdf = async () => {
    try {
      setLoading(true);
      let data = {
        ...report,
      };
  //     const options = {
  //       filename: "test.pdf",
  //       compression :'FAST',
  //       margin: [10, 10, 10, 10]
  //     };
  //     domToPdf(reportTemplateRef.current, options, (pdf) => {
  //  console.log('done');
  //           });
      //  let resp= await axios.get('http://localhost:4000/');

      let res = await axios.post(
        burl+'/html2pdf',
        { ...data },
        // { responseType: "arraybuffer" }
      );
      // if (res.data) {
      //   // const bufferData = Buffer.from(res.data.payload);
      //   let blob = new Blob([res.data], { type: "application/pdf" });
      //   const url = window.URL.createObjectURL(blob);
      //   var link = document.createElement("a");
      //   link.href = url;
      //   link.setAttribute("download", `${report.title}.pdf`);
      //   document.body.appendChild(link);
      //   link.click();
      // }


      // let jsBlob=new Blob([JSON.stringify(report.headings)],{type: 'application/json'}  );
      // console.log(jsBlob);
      // let url=URL.createObjectURL(jsBlob)
      // let res= await fetch(url);
      // let jsonRes= await res.json();
      // console.log(jsonRes);



      // setLoading(false);
      // const doc = new jsPDF("p", "px", 'letter');
      // doc.setFontSize(12);
      // doc.html(reportTemplateRef.current, {
      //   margin: [10, 10, 10, 10],
      //   autoPaging: 'text',
      //   image:{quality:0.7},
      //   html2canvas: {
      //     scale: 0.5,
      //   },
      //   async callback(doc) {
      //     doc.save(`${report.title}`);
    
      //     // report?.isNew ? await addReport() : await updateReport();
      //     setLoading(false);
      //     handleClose();
      //   },
      // });
      // report?.isNew ? await addReport() : await updateReport();
      // setLoading(false);
      // handleClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const downloadPdf = async (pdf) => {
    console.log('get pdf');
    console.log(report);
    // const bufferData = Buffer.from(res.data.payload);
    let blob =  new Blob([pdf], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${report?.projectNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    report?.isNew ? await addReport() : await updateReport();
    setLoading(false);
    handleClose();
  };
  useEffect(() => {
    // pusher = new Pusher('b8cfd2a46813c2362c99', {
    //   cluster: 'us2',
    //   encrypted: true
    // });
    // const channel = pusher.subscribe('wsp_channel');
    // console.log(channel);
    // channel.bind('taskComplete', data => {
    //   console.log('complete',data);
    //   downloadPdf(data?.message);
    // });
    // channel.bind('taskFailed', data => {
    //   console.log('failed',data);
    //   console.log(data?.error);
    //   setLoading(false);
    // });
    // return ()=> pusher.unsubscribe('wsp_channel')
    socket = io(burl, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      secure: true,
      rejectUnauthorized: false ,
    });
    console.log(socket);
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    socket.on("taskComplete", (pdf) => {
      downloadPdf(pdf);
    });
    socket.on("taskFailed", (error) => {
      console.log(error);
      setLoading(false);
    });
    return () => socket?.close();
    // pusher?.connection?.state
  }, []);
  return (
    <React.Fragment>
      <Button
        onClick={() => {
          if (report?.title && report?.coverImg) {
            handleOpen();
          } else {
            alert("Add title and Cover image first!");
          }
        }}
      >
        Preview
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
        
          {loading && <Loader />}
          <Grid container spacing={4}>
            <Grid item xs={10}>
              <h2>Preview Report</h2>
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
            <Button onClick={handleGeneratePdf}>
              {report?.isNew ? "Save" : "Update"} & Generate Pdf
            </Button>
          </Box>
          <div style={{ overflowY: "auto" }} ref={reportTemplateRef}>
            <ReportTemplate report={report} />
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
