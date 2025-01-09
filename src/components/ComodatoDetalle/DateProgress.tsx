import React from "react";
import { Input, Progress, ProgressProps } from "antd";
import dayjs from "dayjs";

interface DateProgressProps {
  startDate: string;
  endDate: string;
}

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#934f8c",
};

const DateProgress: React.FC<DateProgressProps> = ({ startDate, endDate }) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  console.log(start);
  console.log(end);
  const today = dayjs();

  const totalDays = end.diff(start, "day");
  console.log(totalDays);
  const daysLeft = Math.max(end.diff(today, "day"), 0);
  const progressPercent = Math.min(
    ((totalDays - daysLeft) / totalDays) * 100,
    100
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-4">
        <div className="w-2/5">
          <label className="font-semibold">Fecha Inicio</label>
          <Input value={start.format("DD/MM/YYYY")} readOnly />
        </div>
        <div className="w-2/5">
          <label className="font-semibold">Fecha Fin</label>
          <Input value={end.format("DD/MM/YYYY")} readOnly />
        </div>
        <div className="w-1/5">
          <label className="font-semibold">Días Restantes</label>
          <Input value={daysLeft > 0 ? `${daysLeft}` : `Finalizado`} readOnly />
        </div>
      </div>
      <Progress
        percent={progressPercent}
        strokeColor={twoColors}
        showInfo={false}
      />
    </div>
  );
};

export default DateProgress;
