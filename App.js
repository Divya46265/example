import React, { useState } from 'react';
import { FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';

const PatientDoctorFunnelChart = () => {
  const funnelData = [
    { stage: "Patients Registered", count: 250, date: "2024-11-05", fill: "#FF6B6B" },
    { stage: "Consulted", count: 200, date: "2024-10-20", fill: "#FFD93D" },
    { stage: "Tests Completed", count: 180, date: "2024-10-15", fill: "#6BCB77" },
    { stage: "Treatment Started", count: 150, date: "2024-09-01", fill: "#4D96FF" },
    { stage: "Discharged", count: 120, date: "2024-08-25", fill: "#A76DFF" },
    { stage: "Revisit", count: 100, date: "2024-07-10", fill: "#FF9F6B" }
  ];

  const [selectedRange, setSelectedRange] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState("Home");

  const getFunnelData = (range) => {
    const today = new Date();
    const data = {
      all: funnelData,
      "1month": funnelData.filter((item) => {
        const itemDate = new Date(item.date);
        return today - itemDate <= 30 * 24 * 60 * 60 * 1000;
      }),
      "3months": funnelData.filter((item) => {
        const itemDate = new Date(item.date);
        return today - itemDate <= 90 * 24 * 60 * 60 * 1000;
      })
    };
    return data[range] || data.all;
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const handleMenuClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        
        
        <h1 style={styles.sidebarTitleWithLine}>Cohort</h1>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Funnel")}>Funnel</li>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Finance")}>Finance</li>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Expenses")}>Expenses</li>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Tickets")}>Tickets</li>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Events")}>Events</li>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Messages")}>Messages</li>
          <li style={styles.sidebarItem} onClick={() => handleMenuClick("Login")}>Login</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {selectedMenu === "Funnel" && (
          <>
            {/* Date range selection dropdown */}
            <div style={styles.dateSelector}>
              <label htmlFor="dateSelect" style={{ color: '#000', marginRight: '10px' }}>Select Date Range:</label>
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
                <LabelList position="center" fill="#000" stroke="none" dataKey="stage" />
              </Funnel>
            </FunnelChart>

            {/* Color Descriptions */}
            <div style={styles.colorDescriptions}>
              <h3 style={{ color: '#000' }}>Color Descriptions</h3>
              <ul style={styles.colorList}>
                <li style={styles.colorItem}><span style={{ ...styles.colorSquare, backgroundColor: "#FF6B6B" }}></span>Patients Registered - Vibrant Red</li>
                <li style={styles.colorItem}><span style={{ ...styles.colorSquare, backgroundColor: "#FFD93D" }}></span>Consulted - Warm Yellow</li>
                <li style={styles.colorItem}><span style={{ ...styles.colorSquare, backgroundColor: "#6BCB77" }}></span>Tests Completed - Fresh Green</li>
                <li style={styles.colorItem}><span style={{ ...styles.colorSquare, backgroundColor: "#4D96FF" }}></span>Treatment Started - Calm Blue</li>
                <li style={styles.colorItem}><span style={{ ...styles.colorSquare, backgroundColor: "#A76DFF" }}></span>Discharged - Soft Purple</li>
                <li style={styles.colorItem}><span style={{ ...styles.colorSquare, backgroundColor: "#FF9F6B" }}></span>Revisit - Peach Orange</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: '200px',
    padding: '20px',
    backgroundColor: '#16113A',
    color: '#FFF',
  },
  sidebarTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  sidebarTitleWithLine: {
    fontSize: '20px',
    marginBottom: '20px',
    borderBottom: '2px solid #FFF', // Underline below the title
    paddingBottom: '5px',           // Space between the text and underline
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
  },
  sidebarItem: {
    padding: '15px 10px', // Increased padding for more space around each button
    cursor: 'pointer',
    color: '#FFF',
    fontSize: '18px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',  // Font color set to black
    padding: "50px",
    backgroundImage: 'url("funnel.jpeg")', // Set the background image here
    backgroundSize: 'cover',  // Adjusts the image to cover the entire section
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
  },

  dateSelector: {
    marginBottom: '20px',
  },
  colorDescriptions: {
    marginTop: '20px',
    textAlign: 'left',
    color: '#000',
  },
  colorList: {
    listStyle: 'none',
    padding: 0,
  },
  colorItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '16px',
  },
  colorSquare: {
    width: '16px',
    height: '16px',
    marginRight: '10px',
    borderRadius: '3px',
  }
};

export default PatientDoctorFunnelChart;
