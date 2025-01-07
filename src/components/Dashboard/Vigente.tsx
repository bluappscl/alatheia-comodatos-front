import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

const VigentesChart = () => {
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
        label: "Comodatos Vencidos",
        data: [10, 15, 20, 18, 22, 25, 30, 35, 28, 40, 37, 50],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Comodatos Vigentes",
        data: [120, 130, 125, 140, 150, 160, 130, 125, 140, 150, 137, 170],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options : ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Display legend at the top
      },
    },
    scales: {
      x: {
        stacked: true,
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
        stacked: false,
        grid: {
          display: true, // Show grid lines
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
          stepSize: 10, // Adjust step size for better readability
        },
      },
    },
  };

  return (
    <div className="bg-blue-50">
      <div className="p-6 bg-white rounded-lg">
        <div className="mb-6">
          <h3 className="text-xl text-textgrey-200 mb-2">
            Vigentes y Vencidos
          </h3>
          <p className="text-xl font-medium text-textgrey-100 my-4">
            Comodatos Totales:{" "}
            <span className="text-textgrey-200">170 Vigentes</span> /{" "}
            <span className="text-textgrey-200">50 Vencidos</span>
          </p>
          <p className="text-sm text-gray-500 mt-8">
            Nuevos este mes:{" "}
            <span className="text-green-600 font-semibold">
              2 <UpOutlined />
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2 mb-8">
            Por vencer próximo mes:{" "}
            <span className="text-red-600 font-semibold">
              3 <DownOutlined />
            </span>
          </p>
        </div>

        {/* Chart */}
        <div className="">
          <Bar data={data} height={200} options={options} />
        </div>
      </div>
    </div>
  );
};

export default VigentesChart;
