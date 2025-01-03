import React, { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PagosChart = () => {
  const [showBarChart, setShowBarChart] = useState(false);

  const doughnutData = {
    labels: ["Pago Objetivo", "Pagos Recibidos"],
    datasets: [
      {
        data: [5000, 3500],
        backgroundColor: ["#dc847c", "#64bc74"],
        borderColor: ["rgba(204,87,78,255)", "#34a448"],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
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
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Pagos Realizados",
        data: [
          120000, 130000, 125000, 140000, 150000, 180000, 190000, 200000,
          205000, 220000, 230000, 240000,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: false,
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg">
        <div className="flex-1">
          <h3 className="text-xl text-textgrey-100 mb-4">Pagos de Este Mes</h3>
          <p className="text-xl font-medium text-textgrey-100 mb-2">
            <span className="text-textgrey-100">Pago Objetivo:</span> $5000
          </p>
          <p className="text-xl font-medium text-textgrey-100 my-2">
            <span className="text-textgrey-100">Pagos Recibidos:</span> $3500
          </p>
          <div className="mt-6">
            <Button
              type="primary"
              icon={showBarChart ? <UpOutlined /> : <DownOutlined />}
              onClick={() => setShowBarChart(!showBarChart)}
            >
              {showBarChart
                ? "Ocultar Gráfico de Barras"
                : "Mostrar Gráfico de Barras"}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center h-48">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>

      {showBarChart && (
        <div className=" p-6 bg-white rounded-lg -mt-4">
          <Bar data={barData} options={barOptions} />
        </div>
      )}
    </>
  );
};

export default PagosChart;
