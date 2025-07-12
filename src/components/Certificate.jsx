import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const Certificate = () => {
  const certRef = useRef();

  const [form, setForm] = useState({
    name: "",
    course: "",
    summary: "",
    certNo: "",
    hours: "",
    date: "",
    mode: "",
  });

  const handleDownload = () => {
    const element = certRef.current;
    const opt = {
      margin: 0,
      filename: `${(form.name || "certificate")
        .toUpperCase()
        .replace(/[\\/:*?"<>|]/g, "")}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      },
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "landscape",
      },
      pagebreak: { mode: ["avoid-all"] },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleFocus = (e, field, placeholder) => {
    if (!form[field]) e.currentTarget.textContent = "";
  };

  const handleBlur = (e, field, placeholder) => {
    const value = e.currentTarget.textContent.trim();
    setForm({ ...form, [field]: value });
    if (!value) e.currentTarget.textContent = placeholder;
  };

  const getValue = (field, placeholder) => {
    return form[field] || placeholder;
  };

  const baseStyle = {
    outline: "none",
    background: "transparent",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    textRendering: "geometricPrecision",
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div
        ref={certRef}
        style={{
          width: "1123px",
          height: "794px",
          backgroundImage: 'url("/certificate.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          position: "relative",
        }}
      >
        <div style={{ position: 'absolute', top: '415px', left: '525px', fontSize: '16px', color: 'gray',fontWeight:'bold',fontFamily: 'Calibri, sans-serif'}}>Course Summary:</div>
        <div
  style={{
    position: 'absolute',
    top: '560px',
    left: '525px',
    fontSize: '14px',
    color: 'gray',
    border: '2px solid gray',
    width: '92px',
    height: '25px',
    paddingLeft:'13px',
    lineHeight: '4px',
    borderRadius: '5px',
    fontFamily: 'Calibri, sans-serif',
    fontWeight: '500',
  }}
>
  CREDITS:
</div>
        {/* NAME */}
        <div
          contentEditable
          suppressContentEditableWarning
          onFocus={(e) => handleFocus(e, "name", "NAME")}
          onBlur={(e) => handleBlur(e, "name", "NAME")}
          style={{
            ...baseStyle,
            position: "absolute",
            fontSize: '38px',
            color: 'gray', // Firebrick red
            fontFamily: 'Calibri, sans-serif',
            fontWeight: 'normal',
            top: "358px",
            left: "580px",
            transform: "translateX(-50%)",
            width: "780px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {getValue("name", "NAME")}
        </div>

        <div
  contentEditable
  suppressContentEditableWarning
  onFocus={(e) => handleFocus(e, "course", "Course Name")}
  onBlur={(e) => handleBlur(e, "course", "Course Name")}
  style={{
    ...baseStyle,
    position: "absolute",
    top: "240px",
    left: "140px",
    width: "900px",
    fontSize: "28px",
    textAlign:"center",
    lineHeight: "1.5",
    minHeight: "60px",
    fontFamily: 'Calibri, sans-serif',
    color: "gray",
    textTransform: "uppercase",
  }}
>
  {getValue("course", "Course Name")}
</div>

{/* Course Summary */}
<div
  contentEditable
  suppressContentEditableWarning
  onFocus={(e) => handleFocus(e, "summary", "Course Summary")}
  onBlur={(e) => handleBlur(e, "summary", "Course Summary")}
  style={{
    ...baseStyle,
    position: "absolute",
    top: "440px",
    left: "193px",
    width: "780px",
    fontSize: "16px",
    lineHeight: "1.5",
    minHeight: "60px",
    textAlign: "center",
    fontFamily: 'Calibri, sans-serif',
    fontWeight:'bold',
    color: "gray",
  }}
>
  {getValue("summary", "Course Summary")}
</div>
        {/* Date */}
        <input
  type="text"
  value={form.date}
  onChange={(e) => {
    let input = e.target.value.replace(/\D/g, ""); // remove non-numeric
    if (input.length > 8) input = input.slice(0, 8);

    let formatted = input;
    if (input.length > 4) {
      formatted = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
    } else if (input.length > 2) {
      formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
    }

    setForm({ ...form, date: formatted });
  }}
  placeholder="dd/mm/yyyy"
  maxLength={10}
  style={{
    position: "absolute",
    bottom: "140px",
    left: "333px",
    width: "120px",
    height: "26px",        // increased height
    lineHeight: "26px", 
    fontSize: "16px",
    fontFamily: 'Calibri, sans-serif',
    border: "none",
    outline: "none",
    background: "transparent",
    color: "gray",
  }}
/>
    <div
          contentEditable
          suppressContentEditableWarning
          onFocus={(e) => handleFocus(e, "0", "0")}
          onBlur={(e) => handleBlur(e, "0", "0")}
          style={{
            ...baseStyle,
            position: "absolute",
            fontSize: '14px',
            color: 'gray', // Firebrick red
            fontWeight: 'normal',
            top: '554px', left: '603px',
            transform: "translateX(-50%)",
            width: "780px",
            textAlign: "center",
            textTransform: "uppercase",
            fontFamily: 'Calibri, sans-serif',
          }}
        >
          {getValue("0", "0")}
        </div>

        {/* Signature and Seal Container */}
<div
  style={{
    position: "absolute",
    width:"240px",
    bottom: "95px",
    right: "220px",
    textAlign: "center",
    color: "black",
  }}
>
  {/* Seal - background layer */}
  <img
    src="/seal.png"
    alt="Seal"
    style={{
      width: "100px",
      position: "absolute",
      bottom: "35px",
      right: "95px",
      zIndex: 1,
    }}
  />
  <p style={{ fontSize: "14px",fontFamily: 'Calibri, sans-serif', textTransform: "uppercase", margin: 0 , width:'200px',bottom:'10px',color:'gray'}}>
  SATHIYAMOORTHI SUKUMAR
  </p>
</div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
