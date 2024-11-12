import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const Project = () => {
  // State to store fetched data
  const [funnelData, setFunnelData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [selectedUserSegment, setSelectedUserSegment] = useState('All Users');

  // Default datasets for different date ranges
  const defaultDataSets = {
    'Last 7 Days': [
      { stage: 'Visited Site', count: 1000 },
      { stage: 'Signed Up', count: 600 },
      { stage: 'Trial Started', count: 400 },
      { stage: 'Activated', count: 250 },
      { stage: 'Converted to Paid', count: 150 },
    ],
    'Last 30 Days': [
      { stage: 'Visited Site', count: 3000 },
      { stage: 'Signed Up', count: 1800 },
      { stage: 'Trial Started', count: 1200 },
      { stage: 'Activated', count: 700 },
      { stage: 'Converted to Paid', count: 400 },
    ],
    'Last 90 Days': [
      { stage: 'Visited Site', count: 9000 },
      { stage: 'Signed Up', count: 5400 },
      { stage: 'Trial Started', count: 3600 },
      { stage: 'Activated', count: 2100 },
      { stage: 'Converted to Paid', count: 1200 },
    ],
  };

  // Fetch data from MongoDB or use default data based on selected date range
  useEffect(() => {
    axios.get('http://localhost:5006/funnels')
      .then(response => {
        console.log('Fetched Data:', response.data);
        setFunnelData(response.data.length > 0 ? response.data : defaultDataSets[selectedDateRange]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFunnelData(defaultDataSets[selectedDateRange]);
      });
  }, [selectedDateRange]);

  // Handle changes in date range
  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  // Colors array to define a unique color for each stage
  const colors = ['#FF6347', '#FFD700', '#4CAF50', '#1E90FF', '#800080']; // Customize as needed

  // Find the maximum count to scale the funnel stages
  const maxCount = funnelData.length > 0 ? Math.max(...funnelData.map(item => item.count)) : 0;

  // Calculate funnel width based on the number of users at each stage
  const scaleFunnelWidth = (count) => {
    return (count / maxCount) * 200; // 200 is the base width for the largest stage
  };

  return (
    <div className="project-con">
      <h1>Business Sales Funnel</h1>
      {/* Filter Section */}
      <div className="filters">
        <label>Select Date Range: </label>
        <select value={selectedDateRange} onChange={handleDateRangeChange}>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 90 Days">Last 90 Days</option>
        </select>
      </div>

      {/* Funnel Chart */}
      {funnelData.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div className="funnel-container">
          <svg width="300" height="500" viewBox="0 0 300 500" className="funnel-svg">
            {funnelData.map((stage, index) => {
              // Define the width for each stage based on count
              const width = scaleFunnelWidth(stage.count);
              const yPos = 100 + index * 100; // Vertical spacing between each stage

              return (
                <g key={stage.stage}>
                  {/* Funnel Shape with unique colors for each stage */}
                  <polygon
                    points={`150,${yPos} ${150 - width / 2},${yPos + 100} ${150 + width / 2},${yPos + 100}`}
                    fill={colors[index % colors.length]} // Assign colors from the colors array
                    opacity={0.8}
                  />
                  
                  {/* Display only the count */}
                  <text
                    x="150"
                    y={yPos + 50} // Position text in the middle of each stage
                    textAnchor="middle"
                    fontSize="14"
                    fill="#ffffff"
                  >
                    {stage.count}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};

export default Project;
