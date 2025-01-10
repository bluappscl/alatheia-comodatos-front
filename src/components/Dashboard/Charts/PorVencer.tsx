// PorVencerChart.tsx
import { Line } from "react-chartjs-2";

const PorVencerChart = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Por Vencer",
        data: [50, 60, 70, 80, 100],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Por Vencer</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PorVencerChart;
