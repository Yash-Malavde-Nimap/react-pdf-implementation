import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../components/PDF.css";

const PDF = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfURL, setPdfURL] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPdfURL(fileURL);
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ fontSize: "2.8rem", color: "#ff7c7c" }}>
            Basic PDF Reader
          </h2>

          <p
            style={{
              fontSize: "1.2rem",
              marginTop: "10px",
              marginBottom: "20px",
              color: "#ffcece",
              textAlign: "justify",
              width: "30vw",
            }}
          >
            Empowering users with a seamless way to explore the world of digital
            documents, one page at a time.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="text"
                value={pdfURL || ""}
                onChange={(e) => setPdfURL(e.target.value)}
                placeholder="Enter PDF URL"
              />
              {pdfURL && (
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    color: "red",
                    cursor: "pointer",
                    // fontWeight: "bold",
                    fontSize: "24px",
                    // marginleft:
                    background:
                      "linear-gradient(to right, rgba(38, 38, 38,0.3), rgba(38,38,38,1))",
                    padding: "0 10px",
                  }}
                  onClick={() => {
                    setPdfURL("");
                  }}
                >
                  X
                </span>
              )}
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "2px dotted #ffadad",
                width: "fit-content",
                borderRadius: "10px",
              }}
            >
              <label htmlFor="file-upload">Choose a PDF:</label>
              <br />
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "450px",
          }}
        >
          {pdfURL && (
            <div className="pdf-container">
              <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                {numPages && (
                  <Page
                    className="pdf-page"
                    pageNumber={pageNumber}
                    height={550}
                    renderMode="svg"
                  />
                )}
              </Document>
            </div>
          )}

          {numPages && pdfURL && (
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
                marginBottom: "20px",
              }}
            >
              <button
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#ff6d6d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  opacity: `${pageNumber <= 1 ? "60%" : "100%"}`,
                }}
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
              >
                Prev
              </button>

              <p style={{ fontSize: "1.2rem", color: "#ff6d6d" }}>
                {pageNumber}
              </p>

              <button
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#ff6d6d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, numPages))
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PDF;
