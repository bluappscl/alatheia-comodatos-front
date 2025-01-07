import { Input, message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { instrumentos_json } from "../../api/json_examples/instrumentos_json";

interface Instrumento {
  id: number;
  codigo: string;
  producto: string;
  numero_serie: string;
  cantidad: number;
  valor_neto: number;
}

const InstrumentosTable = () => {
  const [filteredInstrumentos, setFilteredInstrumentos] = useState<
    Instrumento[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [searchText, setSearchText] = useState("");

  const fetchInstrumentos = async () => {
    setLoading(true);
    try {
      //   const response = await axios.get("http://localhost:3001/instrumentos");
      //   setInstrumentos(response.data);
      setInstrumentos(instrumentos_json);
      //   setFilteredInstrumentos(response.data);
      setFilteredInstrumentos(instrumentos_json);
    } catch (error) {
      console.error("Error fetching instrumentos:", error);
      message.error("Error al cargar los instrumentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstrumentos();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilteredInstrumentos(
      instrumentos.filter(
        (item) =>
          item.codigo.toLowerCase().includes(value.toLowerCase()) ||
          item.producto.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const columns = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "Producto", dataIndex: "producto", key: "producto" },
    {
      title: "Número de Serie",
      dataIndex: "numero_serie",
      key: "numero_serie",
    },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
    {
      title: "Valor Neto",
      dataIndex: "valor_neto",
      key: "valor_neto",
      render: (value: number) => `${value.toLocaleString()}`,
    },
  ];

  return (
    <>
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
        className="bg-primary-400 rounded-xl"
      />
    </>
  );
};

export default InstrumentosTable;
