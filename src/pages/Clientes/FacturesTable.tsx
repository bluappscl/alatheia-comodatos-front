import React from "react";
import { Table, Typography, TableColumnsType, Button } from "antd";

interface FacturaType {
  key: React.Key;
  month: string; // Month of the Factura
  totalFacturas: number;
  totalAmount: string;
  details: { date: string; description: string; amount: string }[]; // Factura details
}

const columns: TableColumnsType<FacturaType> = [
  { title: "Month", dataIndex: "month", key: "month", align: "center" },
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
  },
  Table.EXPAND_COLUMN,
];

const data: FacturaType[] = [
  {
    key: 1,
    month: "Mayo 2024",
    totalFacturas: 3,
    totalAmount: "1500000 CLP",
    details: [
      {
        date: "2024-05-10",
        description: "Factura #1",
        amount: "500000 CLP",
      },
      {
        date: "2024-05-15",
        description: "Factura #2",
        amount: "700000 CLP",
      },
      {
        date: "2024-05-20",
        description: "Factura #3",
        amount: "300000 CLP",
      },
    ],
  },
  {
    key: 2,
    month: "Junio 2024",
    totalFacturas: 2,
    totalAmount: "1200000 CLP",
    details: [
      {
        date: "2024-06-05",
        description: "Factura #1",
        amount: "800000 CLP",
      },
      {
        date: "2024-06-15",
        description: "Factura #2",
        amount: "400000 CLP",
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
                  Mes
                </th>
                <th scope="col" className="px-6 py-3">
                  Facturas
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Pagado
                </th>
              </tr>
            </thead>
            <tbody>
              {record.details.map((detail, index) => (
                <tr className="">
                  <td className="px-6 py-4 text-center">{detail.date}</td>
                  <td className="px-6 py-4 text-center">
                    <Button type="link">{detail.description}</Button>
                  </td>
                  <td className="px-6 py-4 text-center">{detail.amount}</td>
                </tr>
              ))}
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
