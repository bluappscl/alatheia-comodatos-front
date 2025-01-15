import React from "react";
import { Table, TableColumnsType, Button } from "antd";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/formatCurrency";

interface FacturaType {
  key: React.Key;
  month: string; // Month of the Factura
  totalFacturas: number;
  totalAmount: number;
  details: { date: string; description: string; amount: number }[];
}

const columns: TableColumnsType<FacturaType> = [
  { title: "Mes/Año", dataIndex: "month", key: "month", align: "center" },
  {
    title: "Total Facturas",
    dataIndex: "totalFacturas",
    key: "totalFacturas",
    align: "center",
  },
  {
    title: "Total Pagado",
    dataIndex: "totalAmount",
    key: "totalAmount",
    align: "center",
    render: (value: number) => `${formatCurrency(value, "CLP")}`,
  },
  Table.EXPAND_COLUMN,
];

const data: FacturaType[] = [
  {
    key: 1,
    month: "Mayo 2024",
    totalFacturas: 3,
    totalAmount: 1500000,
    details: [
      {
        date: "2024-05-10",
        description: "32124",
        amount: 500000,
      },
      {
        date: "2024-05-15",
        description: "23124",
        amount: 700000,
      },
      {
        date: "2024-05-20",
        description: "42132",
        amount: 300000,
      },
    ],
  },
  {
    key: 2,
    month: "Junio 2024",
    totalFacturas: 2,
    totalAmount: 1200000,
    details: [
      {
        date: "2024-06-05",
        description: "82738",
        amount: 800000,
      },
      {
        date: "2024-06-15",
        description: "23412",
        amount: 400000,
      },
    ],
  },
];
const FacturasByMonthTable: React.FC = () => (
  <Table<FacturaType>
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <div className="relative overflow-x-auto bg-white -m-3">
          <table className="w-full text-sm table-auto">
            <thead className="text-xs bg-dark-700 text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Número de Factura
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Pagado
                </th>
              </tr>
            </thead>
            <tbody>
              {record.details.map((detail) => {
                const formattedDate = dayjs(detail.date).format("DD/MM/YYYY");
                return (
                  <tr key={detail.date} className="">
                    <td className="px-6 py-4 text-center">{formattedDate}</td>
                    <td className="px-6 py-4 text-center">
                      <Button type="link">{detail.description}</Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatCurrency(detail.amount, "CLP")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ),
    }}
    dataSource={data}
    rowKey="key"
    className="bg-white"
  />
);

export default FacturasByMonthTable;
