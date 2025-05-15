import { Button, Input, InputNumber, message, Select, Table } from "antd";
import { useEffect, useState } from "react";
import InstrumentSelectorModal from "./InstrumentSelectorModal";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";
import axiosInstance from "../../api/axiosInstance";
import type { ColumnsType } from "antd/es/table";

// Ampliamos InstrumentoInterface con campos extra
interface SelectedInstrumento extends InstrumentoInterface {
  codigo_ubicacion: string;
  valor_neto: number;
  moneda: string;
  secuencia: string; // Nueva propiedad
  serie: string;     // Nueva propiedad
}

interface ProductoComodato {
  codigo: string;
  descripcion: string;
  adn: string;
  tipo: string;
  marca: string;
}

interface InstrumentSelectorTableProps {
  onChange?: (instruments: SelectedInstrumento[]) => void;
}

const { Option } = Select;

const InstrumentSelectorTable: React.FC<InstrumentSelectorTableProps> = ({
  onChange,
}) => {
  const [addedInstrumentos, setAddedInstrumentos] = useState<SelectedInstrumento[]>([]);
  const [productosComodato, setProductosComodato] = useState<ProductoComodato[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Notifica al padre siempre que cambie la lista
  const notifyParent = (nextList: SelectedInstrumento[]) => {
    if (onChange) {
      onChange(nextList);
    }
  };

  useEffect(() => {
    const loadProductosComodato = async () => {
      try {
        const { data } = await axiosInstance.get("/comodatos/productos/");
        setProductosComodato(data.productos);
      } catch {
        message.error("Error al cargar productos de comodatos");
      }
    };

    loadProductosComodato();
  }, []);

  const handleAddInstrumento = (instrumento: InstrumentoInterface) => {
    setAddedInstrumentos(prev => {
      if (prev.some(item => item.codigo === instrumento.codigo)) {
        message.warning(`El instrumento "${instrumento.descripcion}" ya está en la tabla`);
        return prev;
      }
      const next = [
        ...prev,
        {
          ...instrumento,
          codigo_ubicacion: "",
          valor_neto: 0,
          moneda: "CLP",
          secuencia: "",
          serie: "",
        },
      ];
      message.success(`Instrumento "${instrumento.descripcion}" agregado a la tabla`);
      notifyParent(next);
      return next;
    });
  };

  const handleRemoveInstrumento = (codigo: string) => {
    setAddedInstrumentos(prev => {
      const next = prev.filter(item => item.codigo !== codigo);
      message.success("Instrumento quitado");
      notifyParent(next);
      return next;
    });
  };

  const handleCellChange = (
    key: keyof Omit<SelectedInstrumento, keyof InstrumentoInterface>,
    value: any,
    record: SelectedInstrumento
  ) => {
    setAddedInstrumentos(prev => {
      const next = prev.map(item =>
        item.codigo === record.codigo ? { ...item, [key]: value } : item
      );
      notifyParent(next);
      return next;
    });
  };

  const columns: ColumnsType<SelectedInstrumento> = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "ADN", dataIndex: "adn", key: "adn" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
    {
      title: "Ubicación",
      dataIndex: "codigo_ubicacion",
      key: "codigo_ubicacion",
      render: (value: string, record) => (
        <Input
          placeholder="Ubicación"
          value={value}
          onChange={e =>
            handleCellChange("codigo_ubicacion", e.target.value, record)
          }
          
        />
      ),
    },
    {
      title: "Valor",
      dataIndex: "valor_neto",
      key: "valor_neto",
      render: (value: number, record) => (
        <InputNumber
          min={0}
          placeholder="Valor neto"
          value={value}
          className="w-24"
          onChange={val => {
            if (val === null || val < 0) {
              message.error("El valor debe ser positivo");
              handleCellChange("valor_neto", 0, record);
            } else {
              handleCellChange("valor_neto", val, record);
            }
          }}
        />
      ),
    },
    {
      title: "Moneda",
      dataIndex: "moneda",
      key: "moneda",
      render: (value: string, record) => (
        <Select
          value={value}
          onChange={val => handleCellChange("moneda", val, record)}
          style={{ width: 80 }}
        >
          <Option value="CLP">CLP</Option>
          <Option value="UF">UF</Option>
        </Select>
      ),
    },
    {
      title: "Secuencia",
      dataIndex: "secuencia",
      key: "secuencia",
      render: (value: string, record) => (
        <Input
          placeholder="Secuencia"
          value={value}
          onChange={e =>
            handleCellChange("secuencia", e.target.value, record)
          }
        />
      ),
    },
    {
      title: "Serie",
      dataIndex: "serie",
      key: "serie",
      render: (value: string, record) => (
        <Input
          placeholder="Serie"
          value={value}
          onChange={e =>
            handleCellChange("serie", e.target.value, record)
          }
        />
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleRemoveInstrumento(record.codigo)}
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
          placeholder="Buscar por Código o Descripción"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full"
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Añadir Instrumento
        </Button>
      </div>

      <Table
        dataSource={addedInstrumentos.filter(
          item =>
            item.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(searchText.toLowerCase())
        )}
        columns={columns}
        rowKey="codigo"
        scroll={{ x: 1200 }}
        className="rounded-xl"
      />

      <InstrumentSelectorModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddInstrumento={handleAddInstrumento}
        productosComodato={productosComodato}
      />
    </>
  );
};

export default InstrumentSelectorTable;
