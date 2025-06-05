import { Button, Input, InputNumber, message,  Table } from "antd";
import { useEffect, useState } from "react";
import InstrumentSelectorModal from "./InstrumentSelectorModal";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";
import type { ColumnsType } from "antd/es/table";
import BodegasSelector from "../BodegasSelect";
import UbicacionesSelector from "../UbicacionesSelector";
import axiosInstance from "../../api/axiosInstance";


/* -------------------------------------------------------------------------- */
/*                           Tipos auxiliares                                 */
/* -------------------------------------------------------------------------- */
export interface SelectedInstrumento extends Omit<InstrumentoInterface, "id"> {
  id?: number; // Para instrumentos existentes en edición
  codigo_ubicacion: number;
  valor_neto: number;
  moneda: string;
  monto_objetivo: number;
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

interface Props {
  onChange?: (instruments: SelectedInstrumento[]) => void;
  selectedMarca?: string;
  /** lista inicial de instrumentos (modo edición) */
  defaultInstruments?: SelectedInstrumento[];
  /** indica si está en modo edición para deshabilitar campos */
  isEditing?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                    Componente InstrumentSelectorTable                      */
/* -------------------------------------------------------------------------- */
const InstrumentSelectorTable: React.FC<Props> = ({
  onChange,
  selectedMarca,
  defaultInstruments = [],
  isEditing = false,
}) => {
  const [addedInstrumentos, setAddedInstrumentos] = useState<
    SelectedInstrumento[]
  >([]);

  const [productosComodato, setProductosComodato] = useState<
    ProductoComodato[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingInstruments, setLoadingInstruments] = useState(false);

  console.log("defaultInstruments", defaultInstruments);

  /* ---------------- Fetch instrumentos de la API ------------------------- */
  useEffect(() => {
    const fetchInstruments = async () => {
      setLoadingInstruments(true);
      try {
        // Hacer GET a todos los instrumentos sin filtro de marca
        const response = await axiosInstance.get(`/comodatos/productos/`);
        if (response.data && Array.isArray(response.data.productos)) {
          setProductosComodato(response.data.productos);
        }
      } catch (error) {
        console.error("Error fetching instruments:", error);
        message.error("Error al cargar instrumentos");
      } finally {
        setLoadingInstruments(false);
      }
    };

    fetchInstruments();
  }, []); // Solo ejecutar una vez al montar el componente

  /* ---------------- Notifica cambios al padre ---------------------------- */
  const notifyParent = (next: SelectedInstrumento[]) => {
    onChange?.(next);
  };

  /* ------------- Cuando llega la prop defaultInstruments ----------------- */
  useEffect(() => {
    if (defaultInstruments?.length > 0) {
      const processedInstruments = defaultInstruments.map((inst) => ({
        ...inst,
        id: inst.id || undefined, // Mantener ID si existe
        valor_neto: Number(inst.valor_neto) || 0,
        monto_objetivo: Number(inst.monto_objetivo) || 0,
        codigo_ubicacion: Number(inst.codigo_ubicacion) || 0,
        moneda: inst.moneda || "CLP",
        serie: inst.serie || "",
        bodega: inst.bodega || "",
        tipo: inst.tipo || "",
      }));

      setAddedInstrumentos(processedInstruments);
    }
  }, [defaultInstruments.length]);

  // Notificar cambios siempre que se modifique la tabla
  useEffect(() => {
    notifyParent(addedInstrumentos);
  }, [addedInstrumentos]);
  /* ---------------------- Acciones de tabla ------------------------------ */
  const handleAddInstrumento = (instrumento: InstrumentoInterface) => {
    setAddedInstrumentos((prev) => {
      if (prev.some((item) => item.codigo === instrumento.codigo)) {
        message.warning(
          `El instrumento "${instrumento.descripcion}" ya está agregado`
        );
        return prev;
      }
      const next = [
        ...prev,
        {
          ...instrumento,
          // No incluir ID para nuevos instrumentos
          id: undefined,
          codigo_ubicacion: 0,
          valor_neto: 0,
          moneda: "CLP",
          monto_objetivo: 0,
          serie: "", // Inicializar como vacío para que se muestre el error
          bodega: "", // Inicializar como vacío para que se muestre el error
        },
      ];
      return next;
    });
    
    // Mostrar mensaje recordatorio sobre campos requeridos
    message.info("Recuerda completar todos los campos requeridos: Serie, Bodega, Ubicación, Valor Neto y Monto Objetivo");
  };

  const handleRemoveInstrumento = (codigo: string) => {
    setAddedInstrumentos((prev) => {
      const next = prev.filter((i) => i.codigo !== codigo);
      return next;
    });
  };

  const handleCellChange = <
    K extends keyof Omit<SelectedInstrumento, keyof InstrumentoInterface>
  >(
    key: K,
    value: SelectedInstrumento[K],
    record: SelectedInstrumento
  ) => {
    setAddedInstrumentos((prev) => {
      const next = prev.map((i) =>
        i.codigo === record.codigo ? { ...i, [key]: value } : i
      );
      return next;
    });
  };

  /* ------------------------ Columnas ------------------------------------- */
  const columns: ColumnsType<SelectedInstrumento> = [
    { title: "Código", dataIndex: "codigo", key: "codigo", width: 120 },
    { title: "ADN", dataIndex: "adn", key: "adn", width: 120 },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 200,
    },
    { title: "Tipo", dataIndex: "tipo", key: "tipo", width: 120 },
    { title: "Marca", dataIndex: "marca", key: "marca", width: 150 },    {
      title: "Bodega",
      dataIndex: "bodega",
      key: "bodega",
      width: 300,
      render: (val, rec) => {
        const hasError = !val || val.trim() === '';
        return (
          <div className="min-w-[180px]">
            <BodegasSelector
              value={val}
              onChange={(v) => handleCellChange("bodega", v, rec)}
            />
            {hasError && (
              <div className="text-red-500 text-xs mt-1">
                ⚠️ Bodega requerida
              </div>
            )}
          </div>
        );
      },
    },    {
      title: "Ubicación",
      dataIndex: "codigo_ubicacion",
      key: "codigo_ubicacion",
      width: 200,
      render: (val, rec) => {
        const hasError = !val || val === 0;
        return (
          <div>
            <UbicacionesSelector
              value={val}
              onChange={(v) => handleCellChange("codigo_ubicacion", v, rec)}
            />
            {hasError && (
              <div className="text-red-500 text-xs mt-1">
                ⚠️ Ubicación requerida
              </div>
            )}
          </div>
        );
      },
    },    {
      title: "Valor Equipo",
      dataIndex: "valor_neto",
      key: "valor_neto",
      width: 150,
      render: (val: number, rec) => {
        const hasError = !val || val <= 0;
        return (
          <div>
            <InputNumber
              min={0}
              value={val}
              className={`w-32 ${hasError ? 'border-red-500' : ''}`}
              onChange={(v) => handleCellChange("valor_neto", v ?? 0, rec)}
              status={hasError ? 'error' : undefined}
            />
            {hasError && (
              <div className="text-red-500 text-xs mt-1">
                ⚠️ Valor requerido
              </div>
            )}
          </div>
        );
      },
    },    {
      title: "Monto Objetivo",
      dataIndex: "monto_objetivo",
      key: "monto_objetivo",
      width: 150,
      render: (val: number, rec) => {
        const hasError = !val || val <= 0;
        return (
          <div>
            <InputNumber
              min={0}
              value={val}
              className={`w-32 ${hasError ? 'border-red-500' : ''}`}
              onChange={(v) => handleCellChange("monto_objetivo", v ?? 0, rec)}
              status={hasError ? 'error' : undefined}
            />
            {hasError && (
              <div className="text-red-500 text-xs mt-1">
                ⚠️ Monto requerido
              </div>
            )}
          </div>
        );
      },
    },{
      title: "Serie",
      dataIndex: "serie",
      key: "serie",
      width: 200,
      render: (val, rec) => {
        // Si está editando y el registro tiene ID, mostrar como texto plano
        if (isEditing && rec.id !== undefined) {
          return <span className="text-gray-700">{val || "Sin serie"}</span>;
        }
        // Si no está editando o es un nuevo registro, mostrar input editable
        const hasError = !val || val.trim() === '';
        return (
          <div>
            <Input
              value={val}
              className={`min-w-[180px] ${hasError ? 'border-red-500' : ''}`}
              onChange={(e) => handleCellChange("serie", e.target.value, rec)}
              placeholder="Serie obligatoria"
              status={hasError ? 'error' : undefined}
            />
            {hasError && (
              <div className="text-red-500 text-xs mt-1">
                ⚠️ Serie requerida
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 100,
      fixed: "right",
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

  /* ---------------------------- Render ----------------------------------- */
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Buscar por Código o Descripción"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full"
        />
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          loading={loadingInstruments}
        >
          Añadir Instrumento
        </Button>
      </div>
      <Table
        dataSource={addedInstrumentos.filter((i) => {
          const matchesSearch =
            !searchText ||
            i.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
            i.descripcion.toLowerCase().includes(searchText.toLowerCase());

          // En modo edición, mostrar todos los instrumentos independientemente de la marca
          const matchesMarca =
            !selectedMarca ||
            defaultInstruments.length > 0 || // Si hay instrumentos por defecto, mostrar todos
            String(i.marca).toLowerCase() ===
              String(selectedMarca).toLowerCase();

          return matchesSearch && matchesMarca;
        })}
        columns={columns}
        rowKey="codigo"
        scroll={{ x: 1800 }}
        className="rounded-xl"
      />{" "}
      <InstrumentSelectorModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddInstrumento={handleAddInstrumento}
        productosComodato={productosComodato}
        marcaComodato={isEditing ? selectedMarca : undefined} // Solo filtrar por marca en modo edición
      />
    </>
  );
};

export default InstrumentSelectorTable;
