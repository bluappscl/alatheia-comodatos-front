import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  DownOutlined,
} from "@ant-design/icons";
import React from "react";
import { Bar } from "react-chartjs-2";

const PagosSummaryCards: React.FC = () => {
  const summaryData = [
    {
      title: "Objetivo",
      icon: <DollarOutlined style={{ fontSize: 24, color: "#1D4ED8" }} />,
      amount: "$250,000",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Realizados",
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#10B981" }} />,
      amount: "$240,000",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "No Pagado",
      icon: <CloseCircleOutlined style={{ fontSize: 24, color: "#EF4444" }} />,
      amount: "$10,000",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
  ];

  return (
    <>
      <h3 className="text-lg text-textgrey-200 mb-2">Este mes</h3>
      <div className="flex flex-wrap gap-4">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between p-4 rounded-lg ${item.bgColor} flex-grow`}
          >
            <div className="flex justify-between items-start">
              <span className={`text-lg font-medium ${item.textColor}`}>
                {item.title}
              </span>
              <div>{item.icon}</div>
            </div>
            <div className={`text-2xl font-bold ${item.textColor} mt-2`}>
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const PagosBarChart: React.FC = () => {
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Pagos Objetivo",
        data: [
          150000, 160000, 140000, 170000, 180000, 190000, 200000, 210000,
          220000, 230000, 240000, 250000,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Pagos Realizados",
        data: [
          120000, 130000, 125000, 140000, 150000, 180000, 190000, 200000,
          205000, 220000, 230000, 240000,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Green
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "No Pagado",
        data: [
          30000, 30000, 15000, 30000, 30000, 10000, 10000, 10000, 15000, 10000,
          10000, 10000,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Display legend at the top
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines
        },
        ticks: {
          color: "#6B7280", // Tailwind's gray-500 for labels
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          display: true, // Show grid lines
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
          stepSize: 50000, // Adjust step size for better readability
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="mb-6">
        <h3 className="text-xl text-textgrey-200 mb-2">Pagos</h3>
        <div className="mb-6 p-4 border border-blue-50 rounded-xl">
          <PagosSummaryCards />
        </div>
        <p className="text-sm text-gray-500 mt-8">
          Pagos atrasados:{" "}
          <span className="text-red-600 font-semibold">
            3 <DownOutlined />
          </span>
        </p>
      </div>

      <div className="mt-4">
        <Bar data={data} height={200} options={options} />
      </div>
    </div>
  );
};

export default PagosBarChart;
