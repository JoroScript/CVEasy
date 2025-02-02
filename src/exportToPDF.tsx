import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export  const  exportToPDF = () => {
  const cvElement = document.getElementById("cv-container"); // The div containing your CV

  if (!cvElement) return;

  html2canvas(cvElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); // Convert canvas to image
    const pdf = new jsPDF("p", "mm", "a4"); // A4 page in portrait mode
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height proportionally

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("CV.pdf"); // Download the PDF
  });
};
