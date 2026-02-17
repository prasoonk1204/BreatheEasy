import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fetchAQIData from "../utils/fetchAQIData";

export const exportLiveData = async (type,data) => {
  try {
    const data = await fetchAQIData();

    const {
      aqi,
      components,
      city,
      time,
      forecast,
      dominentpol,
    } = data;

    const pollutantLabels = {
      pm25: "PM2.5 (Fine Particles)",
      pm10: "PM10 (Coarse Particles)",
      o3: "Ozone (O3)",
      no2: "Nitrogen Dioxide (NO2)",
      so2: "Sulfur Dioxide (SO2)",
      co: "Carbon Monoxide (CO)",
    };

    const dateObj = new Date(time);

    const istDate = dateObj.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const istTime = dateObj.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    /* ================= CSV EXPORT ================= */

  if (type === "csv") {
  let csvContent = "";

  csvContent += `Place,${city}\n`;
  csvContent += `Date,${istDate}\n`;
  csvContent += `Time,${istTime} IST\n`;
  csvContent += `AQI,${aqi}\n`;
  csvContent += `Dominant Pollutant,${dominentpol}\n\n`;

  csvContent += "Pollutant,Value (μg/m3";

  Object.entries(components).forEach(([key, value]) => {
    csvContent += `${pollutantLabels[key] || key.toUpperCase()},${value ?? "N/A"}\n`;
  });

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, `AQI_Report_${city}.csv`);
}

    /* ================= PDF EXPORT ================= */

    if (type === "pdf") {
  const doc = new jsPDF();

  const img = await fetch("/favicon.png")
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        })
    );

  doc.addImage(img, "PNG", 14, 15, 15, 15);

  doc.setFontSize(18);
  const title = "BreatheEasy Air Quality Report";
  doc.text(title, 35, 25);

  const textWidth = doc.getTextWidth(title);
  doc.line(35, 27, 35 + textWidth, 27);

  doc.setFontSize(12);
  doc.text(`Place: ${city}`, 14, 40);
  doc.text(`Date: ${istDate}`, 14, 48);
  doc.text(`Time: ${istTime}`, 14, 56);
  doc.text(`AQI: ${aqi}`, 14, 64);
  doc.text(`Dominant Pollutant: ${dominentpol}`, 14, 72);

  const tableData = Object.entries(components).map(([key, value]) => [
    pollutantLabels[key] || key.toUpperCase(),
    `${value ?? "N/A"} µg/m\u00B3`,  
  ]);

  autoTable(doc, {
    startY: 85,
    head: [["Pollutant", "Value"]],
    body: tableData,
  });

  doc.save(`AQI_Report_${city}.pdf`);
}


  } catch (error) {
    console.error("Export failed:", error);
  }
};
