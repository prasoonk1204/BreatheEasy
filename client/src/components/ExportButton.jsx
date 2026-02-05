// src/components/ExportButton.jsx
import React, { useState } from "react";
import { Download, FileDown, FileText, ChevronDown } from "lucide-react";
import { exportToCSV, exportToPDF } from "../utils/exportService";

const ExportButton = ({ aqiData, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    if (!aqiData || isExporting) return;

    setIsExporting(true);
    setIsOpen(false);

    try {
      if (format === "csv") {
        exportToCSV(aqiData);
      } else if (format === "pdf") {
        await exportToPDF(aqiData);
      }
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
      alert(`Failed to export as ${format.toUpperCase()}. Please try again.`);
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    }
  };

  if (!aqiData) {
    return null;
  }

  return (
    <div className="relative inline-block">
      {/* Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExporting}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium
          transition-all duration-200
          ${
            disabled || isExporting
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-md hover:shadow-lg"
          }
        `}
        aria-label="Export AQI data"
      >
        {isExporting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Export</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && !isExporting && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown content */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
            <button
              onClick={() => handleExport("csv")}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Download as CSV
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Raw data format
                </div>
              </div>
            </button>

            <div className="border-t border-gray-200 dark:border-gray-700" />

            <button
              onClick={() => handleExport("pdf")}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Download as PDF
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Formatted report
                </div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButton;
