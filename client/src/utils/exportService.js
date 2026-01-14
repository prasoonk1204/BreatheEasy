// src/utils/exportService.js
import Papa from "papaparse";
import jsPDF from "jspdf";
// import html2canvas from 'html2canvas'; // Reserved for future use

/**
 * Get AQI health category based on AQI value
 */
const getAQICategory = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
};

/**
 * Get AQI color based on value
 */
const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#22c55e"; // green
  if (aqi <= 100) return "#facc15"; // yellow
  if (aqi <= 200) return "#fb923c"; // orange
  if (aqi <= 300) return "#ef4444"; // red
  if (aqi <= 400) return "#991b1b"; // dark red
  return "#000000"; // black
};

/**
 * Format date for filename
 */
const formatDateForFilename = () => {
  const now = new Date();
  return now.toISOString().split("T")[0]; // YYYY-MM-DD
};

/**
 * Export AQI data to CSV format
 * @param {Object} aqiData - The AQI data object
 * @param {string} customFileName - Optional custom filename
 */
export const exportToCSV = (aqiData, customFileName = null) => {
  if (!aqiData) {
    console.error("No AQI data available for export");
    return;
  }

  // Prepare data for CSV
  const csvData = {
    City: aqiData.city || "Unknown",
    AQI: aqiData.aqi || "N/A",
    "PM2.5 (µg/m³)": aqiData.components?.pm25 || "N/A",
    "PM10 (µg/m³)": aqiData.components?.pm10 || "N/A",
    "O₃ (ppb)": aqiData.components?.o3 || "N/A",
    "NO₂ (ppb)": aqiData.components?.no2 || "N/A",
    "SO₂ (ppb)": aqiData.components?.so2 || "N/A",
    "CO (ppm)": aqiData.components?.co || "N/A",
    "Dominant Pollutant": aqiData.dominentpol?.toUpperCase() || "N/A",
    "Health Category": getAQICategory(aqiData.aqi),
    Timestamp: aqiData.time || new Date().toISOString(),
    Latitude: aqiData.latitude || "N/A",
    Longitude: aqiData.longitude || "N/A",
  };

  // Convert to CSV string
  const csv = Papa.unparse([csvData]);

  // Create filename
  const cityName = aqiData.city?.replace(/\s+/g, "_") || "AQI_Data";
  const fileName =
    customFileName || `BreatheEasy_${cityName}_${formatDateForFilename()}.csv`;

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  console.log(`CSV exported successfully: ${fileName}`);
};

/**
 * Export AQI data to PDF format
 * @param {Object} aqiData - The AQI data object
 * @param {string} customFileName - Optional custom filename
 */
export const exportToPDF = async (aqiData, customFileName = null) => {
  if (!aqiData) {
    console.error("No AQI data available for export");
    return;
  }

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  pdf.setFillColor(16, 185, 129); // emerald-600
  pdf.rect(0, 0, pageWidth, 30, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont(undefined, "bold");
  pdf.text("BreatheEasy", pageWidth / 2, 15, { align: "center" });

  pdf.setFontSize(14);
  pdf.setFont(undefined, "normal");
  pdf.text("Air Quality Report", pageWidth / 2, 23, { align: "center" });

  // Reset text color
  pdf.setTextColor(0, 0, 0);
  yPosition = 40;

  // City and Timestamp
  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text(`${aqiData.city || "Unknown Location"}`, 20, yPosition);

  yPosition += 8;
  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");
  pdf.setTextColor(100, 100, 100);
  const reportDate = new Date(aqiData.time || Date.now()).toLocaleString();
  pdf.text(`Report generated: ${reportDate}`, 20, yPosition);

  yPosition += 15;

  // AQI Card
  pdf.setTextColor(0, 0, 0);
  const aqiValue = aqiData.aqi || 0;
  const aqiCategory = getAQICategory(aqiValue);
  const aqiColor = getAQIColor(aqiValue);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb = hexToRgb(aqiColor);
  pdf.setFillColor(rgb.r, rgb.g, rgb.b);
  pdf.roundedRect(20, yPosition, pageWidth - 40, 35, 3, 3, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.text("Current AQI", 30, yPosition + 10);

  pdf.setFontSize(36);
  pdf.setFont(undefined, "bold");
  pdf.text(String(aqiValue), 30, yPosition + 25);

  pdf.setFontSize(16);
  pdf.setFont(undefined, "normal");
  pdf.text(aqiCategory, 30, yPosition + 32);

  yPosition += 45;

  // Pollutant Details
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont(undefined, "bold");
  pdf.text("Pollutant Concentrations", 20, yPosition);

  yPosition += 8;

  // Table header
  pdf.setFillColor(240, 240, 240);
  pdf.rect(20, yPosition, pageWidth - 40, 8, "F");

  pdf.setFontSize(10);
  pdf.setFont(undefined, "bold");
  pdf.text("Pollutant", 25, yPosition + 5);
  pdf.text("Concentration", pageWidth - 60, yPosition + 5);
  pdf.text("Unit", pageWidth - 30, yPosition + 5);

  yPosition += 8;

  // Table rows
  pdf.setFont(undefined, "normal");
  const pollutants = [
    { name: "PM2.5", value: aqiData.components?.pm25, unit: "µg/m³" },
    { name: "PM10", value: aqiData.components?.pm10, unit: "µg/m³" },
    { name: "O₃", value: aqiData.components?.o3, unit: "ppb" },
    { name: "NO₂", value: aqiData.components?.no2, unit: "ppb" },
    { name: "SO₂", value: aqiData.components?.so2, unit: "ppb" },
    { name: "CO", value: aqiData.components?.co, unit: "ppm" },
  ];

  pollutants.forEach((pollutant, index) => {
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(20, yPosition, pageWidth - 40, 7, "F");
    }

    pdf.text(pollutant.name, 25, yPosition + 5);
    pdf.text(
      pollutant.value !== undefined && pollutant.value !== null
        ? String(pollutant.value)
        : "N/A",
      pageWidth - 60,
      yPosition + 5
    );
    pdf.text(pollutant.unit, pageWidth - 30, yPosition + 5);

    yPosition += 7;
  });

  yPosition += 10;

  // Dominant Pollutant
  if (aqiData.dominentpol) {
    pdf.setFontSize(12);
    pdf.setFont(undefined, "bold");
    pdf.text("Dominant Pollutant: ", 20, yPosition);
    pdf.setFont(undefined, "normal");
    pdf.text(aqiData.dominentpol.toUpperCase(), 70, yPosition);
    yPosition += 10;
  }

  // Health Information
  pdf.setFontSize(14);
  pdf.setFont(undefined, "bold");
  pdf.text("Health Impact", 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");
  const healthInfo = getHealthInfo(aqiValue);

  const splitText = pdf.splitTextToSize(healthInfo, pageWidth - 40);
  pdf.text(splitText, 20, yPosition);
  yPosition += splitText.length * 5 + 10;

  // Add coordinates if available
  if (aqiData.latitude && aqiData.longitude) {
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `Location: ${aqiData.latitude}°, ${aqiData.longitude}°`,
      20,
      yPosition
    );
    yPosition += 5;
  }

  // Footer
  pdf.setDrawColor(200, 200, 200);
  pdf.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);

  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  pdf.text("Generated by BreatheEasy", pageWidth / 2, pageHeight - 15, {
    align: "center",
  });
  pdf.text(
    "https://breathe-easy-1.vercel.app",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  // Create filename and save
  const cityName = aqiData.city?.replace(/\s+/g, "_") || "AQI_Report";
  const fileName =
    customFileName || `BreatheEasy_${cityName}_${formatDateForFilename()}.pdf`;

  pdf.save(fileName);
  console.log(`PDF exported successfully: ${fileName}`);
};

/**
 * Get health information based on AQI value
 */
const getHealthInfo = (aqi) => {
  if (aqi <= 50) {
    return "Air quality is satisfactory, and air pollution poses little or no risk. You can enjoy outdoor activities normally.";
  } else if (aqi <= 100) {
    return "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution. Sensitive individuals should consider limiting prolonged outdoor exertion.";
  } else if (aqi <= 150) {
    return "Members of sensitive groups may experience health effects. The general public is less likely to be affected. Children, elderly, and people with respiratory conditions should limit prolonged outdoor exertion.";
  } else if (aqi <= 200) {
    return "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects. Everyone should limit prolonged outdoor exertion.";
  } else if (aqi <= 300) {
    return "Health alert: The risk of health effects is increased for everyone. Avoid prolonged outdoor exertion. Sensitive groups should avoid all outdoor activities.";
  } else {
    return "Health warning of emergency conditions: everyone is more likely to be affected. Everyone should avoid outdoor activities. Wear N95 masks if you must go outside.";
  }
};

/**
 * Export AQI data with user choice of format
 * @param {Object} aqiData - The AQI data object
 * @param {string} format - 'csv' or 'pdf'
 */
export const exportAQIData = async (aqiData, format = "csv") => {
  if (format.toLowerCase() === "csv") {
    exportToCSV(aqiData);
  } else if (format.toLowerCase() === "pdf") {
    await exportToPDF(aqiData);
  } else {
    console.error(`Unsupported export format: ${format}`);
  }
};
