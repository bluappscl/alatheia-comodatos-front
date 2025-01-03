import InstrumentosChart from "../components/Dashboard/Instrumentos";
import PagosChart from "../components/Dashboard/Pagos";
import VigentesChart from "../components/Dashboard/Vigente";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap center">
        <div className="grid grid-cols-1 w-full md:w-5/12 gap-6 p-6">
          <VigentesChart />
        </div>
        <div className="grid grid-cols-1 w-full md:w-7/12 gap-6 p-6">
          <InstrumentosChart />
          <PagosChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
