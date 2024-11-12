import React, { useState } from 'react';
import { FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';

const PatientDoctorFunnelChart = () => {
  const funnelData = [
    { stage: "Patients Registered", count: 200, date: "2023-01-01", fill: "#FF6B6B" },
    { stage: "Consulted", count: 150, date: "2023-01-05", fill: "#FFD93D" },
    { stage: "Tests Completed", count: 100, date: "2023-01-10", fill: "#6BCB77" },
    { stage: "Treatment Started", count: 80, date: "2023-01-15", fill: "#4D96FF" },
    { stage: "Discharged", count: 60, date: "2023-01-20", fill: "#A76DFF" }
  ];

  const [selectedRange, setSelectedRange] = useState("all");

  // Function to calculate the filtered funnel data based on selected date range
  const getFunnelData = (range) => {
    const today = new Date(); // Current date
    const data = {
      all: funnelData, // All data
      "1month": funnelData.filter((item) => {
        const itemDate = new Date(item.date);
        const timeDiff = today - itemDate;
        return timeDiff <= 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds (30 days)
      }),
      "3months": funnelData.filter((item) => {
        const itemDate = new Date(item.date);
        const timeDiff = today - itemDate;
        return timeDiff <= 90 * 24 * 60 * 60 * 1000; // 3 months in milliseconds (90 days)
      })
    };

    return data[range] || data.all; // Return filtered data or all data if no range is selected
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <div style={styles.container}>
      {/* Date range selection dropdown */}
      <div style={styles.dateSelector}>
        <label htmlFor="dateSelect" style={{ color: '#fff', marginRight: '10px' }}>Select Date Range:</label>
        <select id="dateSelect" value={selectedRange} onChange={handleRangeChange}>
          <option value="all">All Dates</option>
          <option value="1month">Last 1 Month</option>
          <option value="3months">Last 3 Months</option>
        </select>
      </div>

      {/* Funnel Chart */}
      <FunnelChart width={400} height={400}>
        <Tooltip />
        <Funnel dataKey="count" data={getFunnelData(selectedRange)} isAnimationActive>
          <LabelList position="center" fill="#fff" stroke="none" dataKey="stage" />
        </Funnel>
      </FunnelChart>
    </div>
  );
};

// Styles for centering and background color
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',         // Full viewport height
    backgroundColor: '#000',  // Black background
  },
  dateSelector: {
    marginBottom: '20px'      // Space between dropdown and funnel chart
  }
};

export default PatientDoctorFunnelChart;
