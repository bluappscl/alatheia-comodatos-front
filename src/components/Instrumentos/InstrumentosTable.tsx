import { Input, Table } from "antd";
import { useEffect, useState } from "react";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";
import { formatCurrency } from "../../utils/formatCurrency";

interface InstrumentosTableProps {
    data: InstrumentoInterface[];
    loading?: boolean;
  }
  
  const InstrumentosTable: React.FC<InstrumentosTableProps> = ({ data, loading = false }) => {
    const [filteredInstrumentos, setFilteredInstrumentos] = useState<InstrumentoInterface[]>(data);
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      setFilteredInstrumentos(data);
    }, [data]);
  
    const handleSearch = (value: string) => {
      setSearchText(value);
      setFilteredInstrumentos(
        data.filter(
          (item) =>
            item.codigo?.toLowerCase().includes(value.toLowerCase()) ||
            item.producto?.toLowerCase().includes(value.toLowerCase())
        )
      );
    };
  
    const columns = [
      { title: "Código", dataIndex: "codigo", key: "codigo" },
      { title: "Marca", dataIndex: "marca", key: "marca" },
      { title: "Producto", dataIndex: "producto", key: "producto" },
      { title: "Número de Serie", dataIndex: "numero_serie", key: "numero_serie" },
      {
        title: "Valor Neto",
        dataIndex: "valor_neto",
        key: "valor_neto",
        render: (value: number) => `${formatCurrency(value, 'CLP')}`,
        align: "right" as "right"
      },
      { title: "Moneda", dataIndex: "moneda", key: "moneda" },
    ];
  
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <Input
            placeholder="Buscar por Código o Producto"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <Table
          dataSource={filteredInstrumentos}
          columns={columns}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1000 }}
          className="bg-dark-700 rounded-xl"
        />
      </div>
    );
  };
  
  export default InstrumentosTable;
  