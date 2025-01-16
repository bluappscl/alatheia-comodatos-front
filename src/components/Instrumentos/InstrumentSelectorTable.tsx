import { Button, Input, message, Select, Table } from "antd";
import { useEffect, useState } from "react";
import InstrumentSelectorModal from "./InstrumentSelectorModal";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";
import { fetchInstrumentos } from "../../api/requests/http_get_intrumentos";
import { departments } from "../../api/json_examples/sub_secciones";

const { Option } = Select;

const InstrumentSelectorTable = () => {
  const [loading, setLoading] = useState(false);
  const [addedInstrumentos, setAddedInstrumentos] = useState<
    InstrumentoInterface[]
  >([]);
  const [instrumentos, setInstrumentos] = useState<InstrumentoInterface[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const loadInstrumentos = async () => {
      setLoading(true);
      const data = await fetchInstrumentos();
      setInstrumentos(data);
      setLoading(false);
    };
    loadInstrumentos();
  }, []);

  const handleAddInstrumento = (instrumento: InstrumentoInterface) => {
    if (!addedInstrumentos.some((item) => item.id === instrumento.id)) {
      setAddedInstrumentos([...addedInstrumentos, instrumento]);
      message.success("Instrumento agregado a la tabla");
    } else {
      message.warning("El instrumento ya está en la tabla");
    }
  };

  const handleRemoveInstrumento = (id: number) => {
    setAddedInstrumentos((prev) => prev.filter((item) => item.id !== id));
    message.success("Instrumento quitado");
  };

  const handleCellChange = (
    key: keyof InstrumentoInterface,
    value: any,
    record: InstrumentoInterface
  ) => {
    setAddedInstrumentos((prev) =>
      prev.map((item) =>
        item.id === record.id ? { ...item, [key]: value } : item
      )
    );
  };

  const columns = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "Producto", dataIndex: "producto", key: "producto" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
    {
      title: "Número de Serie",
      dataIndex: "numero_serie",
      key: "numero_serie",
    },
    {
      title: "ADN",
      dataIndex: "adn",
      key: "ubicacion",
      render: () => (
        <Input placeholder="ADN de instrumento" />
      ),
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
      key: "ubicacion",
      render: () => (
        <Select placeholder="Tipo de sucursal" className="w-full">
          {departments.map((value, key) => (
            <Select.Option value={value.nombre} key={key}>
              {value.nombre}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    // {
    //   title: "Cantidad",
    //   dataIndex: "cantidad",
    //   key: "cantidad",
    //   render: (value: number, record: InstrumentoInterface) => (
    //     <Input
    //     className="w-16"
    //       type="number"
    //       value={value}
    //       onChange={(e) =>
    //         handleCellChange(
    //           "cantidad",
    //           parseInt(e.target.value || "0"),
    //           record
    //         )
    //       }
    //     />
    //   ),
    // },
    {
      title: "Valor Neto",
      dataIndex: "valor_neto",
      key: "valor_neto",
      render: (value: number, record: InstrumentoInterface) => (
        <Input
          type="number"
          value={value}
          onChange={(e) =>
            handleCellChange(
              "valor_neto",
              parseFloat(e.target.value || "0"),
              record
            )
          }
        />
      ),
    },
    {
      title: "Moneda",
      dataIndex: "moneda",
      key: "moneda",
      render: (value: string, record: InstrumentoInterface) => (
        <Select
          value={value}
          onChange={(val) => handleCellChange("moneda", val, record)}
          style={{ width: 80 }}
        >
          <Option value="CLP">CLP</Option>
          <Option value="UF">UF</Option>
        </Select>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: InstrumentoInterface) => (
        <Button
          type="link"
          danger
          onClick={() => handleRemoveInstrumento(record.id)}
        >
          Quitar
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Buscar por Código o Producto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full"
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Añadir Instrumento
        </Button>
      </div>

      <Table
        dataSource={addedInstrumentos}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1000 }}
        className="rounded-xl"
      />

      <InstrumentSelectorModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddInstrumento={handleAddInstrumento}
        instrumentos={instrumentos}
      />
    </>
  );
};

export default InstrumentSelectorTable;
