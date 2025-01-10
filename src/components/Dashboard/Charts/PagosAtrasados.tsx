// PagosAtrasadosChart.tsx
import { Bar } from "react-chartjs-2";

const PagosAtrasadosChart = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Pagos Atrasados",
        data: [20, 30, 25, 35, 45],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Pagos Atrasados</h3>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PagosAtrasadosChart;
