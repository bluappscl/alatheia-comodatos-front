import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";

const VigentesChart = () => {
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Abril",
      "Junio",
      "Julio",
      "Octubre",
      "Septiembre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Vigentes",
        data: [120, 130, 125, 140, 150, 160, 130, 125, 140, 150, 137, 170],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smoother lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
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
          display: false, // Remove grid lines
        },
        ticks: {
          color: "#6B7280",

          font: {
            size: 10,
          },
          stepSize: 5, // Adjust step size for better readability
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white  rounded-lg">
      <div className="mb-6">
        <h3 className="text-xl text-textgrey-200  mb-2">Vigentes</h3>
        <p className="text-xl font-medium text-textgrey-100 my-4">
          Comodatos Totales: <span className="text-textgrey-200 ">170</span>
        </p>
        <p className="text-sm text-gray-500 mt-8">
          Nuevos este mes :{" "}
          <span className="text-green-600 font-semibold">
            2 <UpOutlined />
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2 mb-8">
          Por vencer próximo mes :{" "}
          <span className="text-red-600 font-semibold">
            3 <DownOutlined />
          </span>
        </p>
      </div>

      {/* Chart */}
      <div className="">
        <Line data={data} options={options} height={200} />
      </div>
    </div>
  );
};

export default VigentesChart;
