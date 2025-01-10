import InstrumentosChart from "./Charts/Instrumentos";
import PagosBarChart from "./Charts/PagosBarChart";
import VigentesChart from "./Charts/Vigente";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap center">
        <div className="grid grid-cols-1 w-full md:w-5/12 p-4 gap-6">
          <VigentesChart />
          <InstrumentosChart />
        </div>
        <div className="grid grid-cols-1 w-full md:w-7/12 p-4 gap-6">
          <PagosBarChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
