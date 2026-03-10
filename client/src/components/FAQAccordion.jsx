import React, { useState } from "react";

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is AQI?",
      answer: "AQI stands for Air Quality Index. It is a numerical scale used to communicate how polluted the air currently is or how polluted it is forecast to become."
    },
    {
      question: "How is AQI calculated?",
      answer: "AQI is calculated based on the concentrations of major air pollutants including particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide, and carbon monoxide."
    },
    {
      question: "What do different AQI levels mean?",
      answer: "AQI levels range from 0 to 500. Lower values indicate better air quality. Levels are categorized as Good (0-50), Moderate (51-100), Unhealthy for Sensitive Groups (101-150), Unhealthy (151-200), Very Unhealthy (201-300), and Hazardous (301-500)."
    },
    {
      question: "How can I protect myself from poor air quality?",
      answer: "Stay indoors, use air purifiers, wear masks when outdoors, avoid strenuous activities, and keep windows closed during high pollution periods."
    },
    {
      question: "What are the health effects of poor air quality?",
      answer: "Poor air quality can cause respiratory problems, cardiovascular issues, eye irritation, and exacerbate conditions like asthma and COPD."
    },
    {
      question: "How often is the air quality data updated?",
      answer: "Air quality data is typically updated hourly, but this can vary depending on the monitoring station and location."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <button
            className="w-full text-left p-4 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-white">{faq.question}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
          </button>
          {openIndex === index && (
            <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;