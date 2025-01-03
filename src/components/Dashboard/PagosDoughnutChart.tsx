import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PagosDoughnutChart = () => {
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
        </div>

        <div className="flex-1 flex justify-center items-center h-48">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>
    </>
  );
};

export default PagosDoughnutChart;
