import React from 'react'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { CKEditor } from "ckeditor4-react";

const ReportCkEditor = (props) => {
  return (
    // <CKEditor
    //   editor={ClassicEditor}
    //   data={props.data}
    //   onReady={editor => {
    //     // You can store the "editor" and use when it is needed.
    //     console.log('Editor is ready to use!', editor);
    //   }}
    //   config={{
    //     plugins: [Base64UploadAdapter],
    //     toolbar: []
    //   }}
    //   onChange={(event, editor) => {
    //     const data = editor.getData();
    //     // console.log({ event, editor, data });
    //   }}
    // // onBlur={(event, editor) => {
    // //   console.log('Blur.', editor);
    // // }}
    // // onFocus={(event, editor) => {
    // //   console.log('Focus.', editor);
    // // }}
    // />
    props.data && (
      <CKEditor
        initData={props.data}

        config={{
          contentsCss: [`${process.env.PUBLIC_URL}/fonts/noir-pro/styles.css`,
          `${process.env.PUBLIC_URL}/vendors/ck-editor/style.css`],
        }}
      />
    )

  )
}

export default ReportCkEditor