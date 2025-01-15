import dayjs from "dayjs";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import fin_contrato from "../../media/icons/fin-de-contrato.png";
import { theme } from "antd";

interface ProgresoContratoProps {
  startDate: string;
  endDate: string;
}

const ProgresoContrato: React.FC<ProgresoContratoProps> = ({
  startDate,
  endDate,
}) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const today = dayjs();

  const totalDays = end.diff(start, "day");
  const daysLeft = Math.max(end.diff(today, "day"), 0);
  const progressPercent = Math.min(
    ((totalDays - daysLeft) / totalDays) * 100,
    100
  );

  const { token } = theme.useToken();

  return (
    <div className="flex flex-col md:flex-row p-4 justify-between items-center gap-4">
      <div className="flex flex-col justify-start items-start w-full md:w-2/3 gap-4">
        <div className="w-full">
          <label className="font-semibold block mb-1">Fecha Inicio</label>
          <p className="ml-2">{start.format("DD/MM/YYYY")} </p>
        </div>
        <div className="w-full">
          <label className="font-semibold block mb-1">Fecha Fin</label>
          <p className="ml-2">{end.format("DD/MM/YYYY")} </p>
        </div>
      </div>

      <div
        style={{ width: 120, height: 120 }}
        className="bg-white rounded-full snap-center text-center flex flex-col items-center justify-center"
      >
        <span className="text-sm font-semibold mb-2">Días Restantes</span>
        <CircularProgressbarWithChildren
          value={progressPercent}
          text={`${daysLeft > 0 ? `${daysLeft}` : ""}`}
          strokeWidth={8}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            strokeLinecap: "round",
            pathColor: token.colorPrimary,
            textColor: token.colorPrimary,
            trailColor: "#e0e0e0",
          })}
        >
          {daysLeft === 0 && (
            <img
              style={{ width: 50, marginTop: -5 }}
              src={fin_contrato}
              alt="Contract Finished"
            />
          )}
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default ProgresoContrato;
