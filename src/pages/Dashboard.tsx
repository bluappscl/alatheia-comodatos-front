import InstrumentosChart from "../components/Dashboard/Instrumentos";
import PagosChart from "../components/Dashboard/Pagos";
import PagosBarChart from "../components/Dashboard/PagosBarChart";
import PagosDoughnutChart from "../components/Dashboard/PagosDoughnutChart";
import VigentesChart from "../components/Dashboard/Vigente";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap center">
        <div className="grid grid-cols-1 w-full md:w-5/12 gap-6">
          <VigentesChart />
          <InstrumentosChart />
        </div>
        <div className="grid grid-cols-1 w-full md:w-7/12 gap-6">
          <PagosBarChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
