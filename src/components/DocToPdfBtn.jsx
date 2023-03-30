import React from 'react';
import html2pdf from "html2pdf.js";

export default function DocToPdf({ codeMode, codeMirrorRef }) {
  function handleDocToPdf() {
    const margin = codeMode ? 0 : [72, 72, 72, 72];
    const element = codeMode ? codeMirrorRef.current.editor
      : document.querySelector("trix-editor").innerHTML;
    const opt = {
      margin: margin,
      filename: 'my_doc.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  return (
    <button onClick={handleDocToPdf}>
      Export as PDF
    </button>
  );
}
