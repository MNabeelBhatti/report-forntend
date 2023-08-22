
import './template.css';
const ReportTemplate = ({ report }) => {
  const styles = {
    page: {
      // textAlign: "center",
      // padding: "2rem",
      position: 'relative',
      margin:"10px",
      pageBreakAfter: "always",
      width: "800px",
    },
    columnLayout: {
      display: "flex",
      justifyContent: "space-between",
      margin: "3rem 0 5rem 0",
      gap: "2rem",
    },

    column: {
      display: "flex",
      flexDirection: "column",
    },

    spacer2: {
      height: "2rem",
    },

    fullWidth: {
      width: "100%",
    },

    marginb0: {
      marginBottom: 0,
    },
    heading: {
      color: "red",
      fontWeight: 600,
      fontSize: "18px",
    },
    subHeading: {
      color: "red",
      fontWeight: 400,
      fontSize: "16px",
    },
    imgStyle: {
      height: "200px",
      width: "100%",
    },
    coverPage: {
      padding: "10px",
      height: "800px",
    },
    hr: {
      color: "red",
    },
  };
  return (
    <>
      <div style={styles.page}>
        <div style={styles.coverPage}>
          <h2 style={styles.heading}>{report.clientName}</h2>
          <h2 style={styles.heading}>{report.projectName}</h2>
          <h3>{report.title?.toUpperCase()}</h3>
          <div>
            <img style={{width:"100%",height:'600px',objectFit:"contain"}} src={report.coverImg} />
          </div>
        </div>

        <div>
          {report?.headings?.map((v, i) => {
            return (
              <div key={i + "o"}>
                <h1 style={styles.heading}>
                  {`${v.sub_heading}    ${v.heading}`}
                </h1>
                {v.img !== "" && (
                  <div>
                    <img style={{width:"100%",height:'600px',objectFit:"contain"}} src={v.img} />
                  </div>
                )}
                <div
                  style={{
                    pageBreakInside: "avoid !important",
                  }}
                  dangerouslySetInnerHTML={{ __html: v.htmlContent }}
                ></div>

                <hr color="red" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ReportTemplate;
