import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPDF = () => {
  const cvElement = document.getElementById("cv-container");

  if (!cvElement) return;

  html2canvas(cvElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height proportionally

    const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]); // Custom height based on content

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("CV.pdf");
  });
};
