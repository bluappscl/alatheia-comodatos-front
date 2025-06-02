import { Button, Input, InputNumber, message, Select, Table } from "antd";
import { useEffect, useState } from "react";
import InstrumentSelectorModal from "./InstrumentSelectorModal";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";
import axiosInstance from "../../api/axiosInstance";
import type { ColumnsType } from "antd/es/table";
import BodegasSelector from "../BodegasSelect";
import UbicacionesSelector from "../UbicacionesSelector";

// Ampliamos InstrumentoInterface con campos extra
interface SelectedInstrumento extends InstrumentoInterface {
  codigo_ubicacion: number; // Cambiado a number
  valor_neto: number;
  moneda: string;
  monto_objetivo: string;
  serie: string;
  bodega: string;
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
  selectedMarca?: string; // Add this prop
}

const { Option } = Select;

const InstrumentSelectorTable: React.FC<InstrumentSelectorTableProps> = ({
  onChange,
  selectedMarca,
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
          codigo_ubicacion: 0,
          valor_neto: 0,
          moneda: "CLP",
          monto_objetivo: "",
          serie: "",
          bodega: "",
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
    { 
      title: "Código", 
      dataIndex: "codigo", 
      key: "codigo",
      width: 120 
    },
    { 
      title: "ADN", 
      dataIndex: "adn", 
      key: "adn",
      width: 120 
    },
    { 
      title: "Descripción", 
      dataIndex: "descripcion", 
      key: "descripcion",
      width: 200 
    },
    { 
      title: "Tipo", 
      dataIndex: "tipo", 
      key: "tipo",
      width: 120 
    },
    { 
      title: "Marca", 
      dataIndex: "marca", 
      key: "marca",
      width: 150 
    },
    {
      title: "Bodega",
      dataIndex: "bodega",
      key: "bodega",
      width: 300,
      render: (value: string, record) => (
        <div className="min-w-[180px]">
          <BodegasSelector
            value={value}
            onChange={(newValue) => handleCellChange("bodega", newValue, record)}
            placeholder="Seleccione bodega"
          />
        </div>
      ),
    },
    {
      title: "Ubicación",
      dataIndex: "codigo_ubicacion",
      key: "codigo_ubicacion",
      width: 200,
      render: (value: number, record) => (
        <UbicacionesSelector
          value={value}
          onChange={(newValue) => handleCellChange("codigo_ubicacion", newValue, record)}
          placeholder="Seleccione una ubicación"
        />
      ),
    },
    {
      title: "Valor Equipo",
      dataIndex: "valor_neto",
      key: "valor_neto",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          min={0}
          placeholder="Valor neto"
          value={value}
          className="w-32"
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
      width: 100,
      render: (value: string, record) => (
        <Select
          value={value}
          onChange={val => handleCellChange("moneda", val, record)}
          className="w-24"
        >
          <Option value="CLP">CLP</Option>
          <Option value="UF">UF</Option>
        </Select>
      ),
    },
    {
      title: "Monto Objetivo",
      dataIndex: "monto_objetivo",
      key: "monto_objetivo",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          min={0}
          placeholder="Monto objetivo"
          value={value}
          className="w-32"
          onChange={val => {
            if (val === null || val < 0) {
              message.error("El valor debe ser positivo");
              handleCellChange("monto_objetivo", 0, record);
            } else {
              handleCellChange("monto_objetivo", val, record);
            }
          }}
        />
      ),
    },
    {
      title: "Serie",
      dataIndex: "serie",
      key: "serie",
      width: 200,
      render: (value: string, record) => (
        <Input
          placeholder="Serie"
          value={value}
          className="min-w-[180px]"
          onChange={e => handleCellChange("serie", e.target.value, record)}
        />
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 100,
      fixed: 'right',
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
            (selectedMarca ? item.marca === selectedMarca : true) && // Add marca filter
            (item.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(searchText.toLowerCase()))
        )}
        columns={columns}
        rowKey="codigo"
        scroll={{ x: 1800 }} // Increased scroll width
        className="rounded-xl"
      />
      
      <InstrumentSelectorModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddInstrumento={handleAddInstrumento}
        productosComodato={productosComodato.filter(p => 
          selectedMarca ? p.marca === selectedMarca : true
        )} // Filter productos by marca
      />
    </>
  );
};

export default InstrumentSelectorTable;
