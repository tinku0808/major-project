import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import '../styles/visualization.css'; // Custom CSS file

// Import and register necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Visualization = () => {
  const [topEmployees, setTopEmployees] = useState([]);
  const [topDepartments, setTopDepartments] = useState([]);
  const [topLearningMaterials, setTopLearningMaterials] = useState([]);
  const [topTimeSpentEmployees, setTopTimeSpentEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employee/khushi/detailed-scores").then((response) => {
      const scoresData = response.data;

      // Compute top 5 employees by score
      const sortedEmployees = [...scoresData].sort((a, b) => b.score - a.score);
      setTopEmployees(sortedEmployees.slice(0, 5)); // Top 5 employees by score

      // Compute top 5 employees by time spent
      const sortedByTimeSpent = [...scoresData].sort((a, b) => b.timeSpent - a.timeSpent);
      setTopTimeSpentEmployees(sortedByTimeSpent.slice(0, 5)); // Top 5 employees by time spent

      // Group by department and calculate average score
      const departmentScores = groupByAndAverage(scoresData, "department");
      const sortedDepartments = Object.entries(departmentScores).sort(
        (a, b) => b[1] - a[1]
      );
      setTopDepartments(sortedDepartments.slice(0, 5)); // Top 5 departments by avg score

      // Group by learningMaterialTitle and calculate average score
      const learningMaterialScores = groupByAndAverage(
        scoresData,
        "learningMaterialTitle"
      );
      const sortedLearningMaterials = Object.entries(
        learningMaterialScores
      ).sort((a, b) => b[1] - a[1]);
      setTopLearningMaterials(sortedLearningMaterials.slice(0, 5)); // Top 5 learning materials by avg score
    });
  }, []);

  const groupByAndAverage = (array, key) => {
    const grouped = array.reduce((acc, obj) => {
      const groupKey = obj[key];
      if (!acc[groupKey]) {
        acc[groupKey] = { totalScore: 0, count: 0 };
      }
      acc[groupKey].totalScore += obj.score;
      acc[groupKey].count += 1;
      return acc;
    }, {});

    Object.keys(grouped).forEach(
      (groupKey) =>
        (grouped[groupKey] = grouped[groupKey].totalScore / grouped[groupKey].count)
    );

    return grouped;
  };

  // Bar chart data for top 5 employees by score
  const employeeChartData = {
    labels: topEmployees.map((emp) => emp.employeeName),
    datasets: [
      {
        label: "Top Employees by Score",
        data: topEmployees.map((emp) => emp.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Bar chart data for top 5 employees by time spent
  const timeSpentChartData = {
    labels: topTimeSpentEmployees.map((emp) => emp.employeeName),
    datasets: [
      {
        label: "Top Employees by Time Spent",
        data: topTimeSpentEmployees.map((emp) => emp.timeSpent),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  // Pie chart data for top 5 departments
  const departmentChartData = {
    labels: topDepartments.map(([department]) => department),
    datasets: [
      {
        label: "Top Departments by Average Score",
        data: topDepartments.map(([_, avgScore]) => avgScore),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Pie chart data for top 5 learning materials
  const learningMaterialChartData = {
    labels: topLearningMaterials.map(([title]) => title),
    datasets: [
      {
        label: "Top Learning Materials by Average Score",
        data: topLearningMaterials.map(([_, avgScore]) => avgScore),
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Performance Analysis</h1>
      </header>

      {/* Visualization for Top 5 Employees by Score and Time Spent */}
      <div className="row">
        <div className="col-md-6">
          <div className="chart-wrapper">
            <h2>Top 5 Employees by Score</h2>
            <Bar data={employeeChartData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-wrapper">
            <h2>Top 5 Employees by Time Spent</h2>
            <Bar data={timeSpentChartData} />
          </div>
        </div>
      </div>

      {/* Visualization for Departments and Learning Materials */}
      <div className="row">
        <div className="col-md-6">
          <div className="chart-wrapper">
            <h2>Top 5 Departments by Average Score</h2>
            <Pie data={departmentChartData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-wrapper">
            <h2>Top 5 Learning Materials by Average Score</h2>
            <Pie data={learningMaterialChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Visualization;
