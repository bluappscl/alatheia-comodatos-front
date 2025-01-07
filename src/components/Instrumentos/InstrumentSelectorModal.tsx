import { Button, Modal, Table } from "antd";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddInstrumento: (instrumento: InstrumentoInterface) => void;
  instrumentos: InstrumentoInterface[]; // Pass fetched instruments
}

const InstrumentSelectorModal: React.FC<Props> = ({
  visible,
  onClose,
  onAddInstrumento,
  instrumentos,
}) => {
  const columns = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "Producto", dataIndex: "producto", key: "producto" },
    {
      title: "Número de Serie",
      dataIndex: "numero_serie",
      key: "numero_serie",
    },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
    { title: "Valor Neto", dataIndex: "valor_neto", key: "valor_neto" },
    { title: "Moneda", dataIndex: "moneda", key: "moneda" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: InstrumentoInterface) => (
        <Button onClick={() => onAddInstrumento(record)}>
          Añadir
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Seleccionar Instrumento"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <Table
        dataSource={instrumentos}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1000 }}
      />
    </Modal>
  );
};

export default InstrumentSelectorModal;
