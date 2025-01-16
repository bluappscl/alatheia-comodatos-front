import React, { useState } from "react";
import { Table, TableColumnsType, Button } from "antd";
import dayjs from "dayjs";
import FacturaDetailModal from "../../components/shared/FacturaDetailModal";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductDetail {
  code: string;
  description: string;
  quantity: number;
  value: number;
  marca: string;
}

interface FacturaType {
  key: React.Key;
  month: string; // Month of the Factura
  totalFacturas: number;
  totalAmount: number;
  details: {
    date: string;
    products: ProductDetail[];
    amount: number;
  }[];
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
    totalAmount: 270000,
    details: [
      {
        date: "2024-05-10",
        products: [
          {
            code: "301148",
            description:
              "TANbead Nucleic acid Extraction kit Optipure Viral Auto Plate",
            quantity: 2,
            value: 75000,
            marca: "TANbead",
          },
          {
            code: "301149",
            description:
              "TANbead Nucleic acid Extraction kit Optipure Viral Auto Plate",
            quantity: 4,
            value: 10000,
            marca: "TANbead",
          },
        ],
        amount: 190000,
      },
      {
        date: "2024-05-15",
        products: [
          {
            code: "FDX1000E",
            description: "FLASHDX INSTRUMENT 1000-E",
            quantity: 2,
            value: 40000,
            marca: "FLASHDX",
          },
        ],
        amount: 80000,
      },
    ],
  },
  {
    key: 2,
    month: "Junio 2024",
    totalFacturas: 2,
    totalAmount: 450000,
    details: [
      {
        date: "2024-06-05",
        products: [
          {
            code: "TB12345",
            description: "Extraction Tubes",
            quantity: 50,
            value: 3000,
            marca: "Desconocida",
          },
          {
            code: "PT45678",
            description: "Plastic Tips for Pipettes",
            quantity: 200,
            value: 500,
            marca: "Desconocida",
          },
        ],
        amount: 150000,
      },
      {
        date: "2024-06-20",
        products: [
          {
            code: "MD2020",
            description: "Medical Device X",
            quantity: 1,
            value: 300000,
            marca: "Desconocida",
          },
        ],
        amount: 300000,
      },
    ],
  },
  {
    key: 3,
    month: "Julio 2024",
    totalFacturas: 4,
    totalAmount: 620000,
    details: [
      {
        date: "2024-07-01",
        products: [
          {
            code: "LABKIT202",
            description: "Laboratory Testing Kit",
            quantity: 10,
            value: 20000,
            marca: "Desconocida",
          },
        ],
        amount: 200000,
      },
      {
        date: "2024-07-10",
        products: [
          {
            code: "BT5000",
            description: "BioTech Analyzer 5000",
            quantity: 1,
            value: 300000,
            marca: "BioTech",
          },
        ],
        amount: 300000,
      },
      {
        date: "2024-07-15",
        products: [
          {
            code: "PRN2021",
            description: "Printer for Lab Results",
            quantity: 1,
            value: 120000,
            marca: "Desconocida",
          },
        ],
        amount: 120000,
      },
    ],
  },
  {
    key: 4,
    month: "Agosto 2024",
    totalFacturas: 2,
    totalAmount: 410000,
    details: [
      {
        date: "2024-08-05",
        products: [
          {
            code: "D100",
            description: "Diagnostics Device Model D100",
            quantity: 3,
            value: 70000,
            marca: "Diagnostics",
          },
          {
            code: "S250",
            description: "Sample Storage Units",
            quantity: 5,
            value: 30000,
            marca: "Desconocida",
          },
        ],
        amount: 310000,
      },
      {
        date: "2024-08-20",
        products: [
          {
            code: "CK400",
            description: "Calibration Kit for D100",
            quantity: 2,
            value: 50000,
            marca: "Diagnostics",
          },
        ],
        amount: 100000,
      },
    ],
  },
];


const FacturasByMonthTable: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductDetail[]>([]);
  const [selectedFacturaNumber, setSelectedFacturaNumber] =
    useState<string>("");

  const handleFacturaClick = (detail: (typeof data)[0]["details"][0]) => {
    setSelectedProducts(detail.products);
    setSelectedFacturaNumber(dayjs(detail.date).format("YYYYMMDD"));
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProducts([]);
    setSelectedFacturaNumber("");
  };

  return (
    <>
      <Table<FacturaType>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div className="relative overflow-x-auto bg-white p-4 rounded-lg shadow">
              <table className="w-full text-sm table-auto border-collapse border border-gray-200">
                <thead className="text-xs bg-gray-700 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Número de Factura
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Total Pagado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {record.details.map((detail) => {
                    const formattedDate = dayjs(detail.date).format(
                      "DD/MM/YYYY"
                    );
                    return (
                      <tr key={detail.date} className="hover:bg-gray-100">
                        <td className="px-6 py-4 text-center">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            type="link"
                            onClick={() => handleFacturaClick(detail)}
                          >
                            {dayjs(detail.date).format("YYYYMMDD")}
                          </Button>
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
        className="bg-white rounded-lg shadow-md"
        pagination={{ pageSize: 5 }}
      />

      <FacturaDetailModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        products={selectedProducts}
        facturaNumber={selectedFacturaNumber}
      />
    </>
  );
};

export default FacturasByMonthTable;
