// IngresosMensualesChart.tsx
import { Bar } from "react-chartjs-2";

const IngresosMensualesChart = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos Mensuales",
        data: [2000, 2500, 2300, 2800, 3000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Ingresos Mensuales</h3>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

export default IngresosMensualesChart;
