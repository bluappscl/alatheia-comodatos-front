import { Doughnut } from "react-chartjs-2";

const InstrumentosChart = () => {
  const data = {
    labels: ["Instrumentos en Uso", "Instrumentos en Inventario"],
    datasets: [
      {
        data: [300, 20],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 2,
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
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg">
      <div className="flex-1">
        <h3 className="text-xl text-textgrey-100 mb-4">Instrumentos</h3>
        <p className="text-xl font-medium text-textgrey-100 mb-2">
          <span className="text-textgrey-100">Operativos:</span> 300
        </p>
        <p className="text-xl font-medium text-textgrey-100 my-2">
          <span className="text-textgrey-100">No operativos:</span> 20
        </p>

      </div>

      <div className="flex-1 flex justify-center items-center h-48">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default InstrumentosChart;
