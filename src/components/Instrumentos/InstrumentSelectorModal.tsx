import { Button, Modal, Table, Input } from "antd";
import { useState } from "react";
import { InstrumentoInterface } from "../../interfaces/InstrumentoInterface";

interface ProductoComodato {
  codigo: string;
  descripcion: string;
  adn: string;
  tipo: string;
  marca: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddInstrumento: (instrumento: InstrumentoInterface) => void;
  productosComodato: ProductoComodato[];
  marcaComodato?: string; // Nueva prop para filtrar por marca del comodato
}

const InstrumentSelectorModal: React.FC<Props> = ({
  visible,
  onClose,
  onAddInstrumento,
  productosComodato,
  marcaComodato,
}) => {
  const [searchText, setSearchText] = useState("");

  // Debug: Agregar logs para verificar el filtrado
  console.log("InstrumentSelectorModal - marcaComodato:", marcaComodato);
  console.log("InstrumentSelectorModal - productosComodato count:", productosComodato.length);

  // Filtrar productos según búsqueda y marca del comodato
  const filteredProductos = productosComodato.filter((item) => {
    const matchesSearch = 
      item.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchText.toLowerCase());
    
    // Si hay marca del comodato especificada, filtrar solo por esa marca
    const matchesMarca = marcaComodato 
      ? item.marca.toLowerCase() === marcaComodato.toLowerCase()
      : true;
    
    console.log(`Item: ${item.codigo}, Marca: ${item.marca}, marcaComodato: ${marcaComodato}, matchesMarca: ${matchesMarca}`);
    
    return matchesSearch && matchesMarca;
  });

  console.log("InstrumentSelectorModal - filteredProductos count:", filteredProductos.length);

  const productosComodatoColumns = [
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    { title: "ADN", dataIndex: "adn", key: "adn" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: ProductoComodato) => (
        <Button
          onClick={() =>
            onAddInstrumento({
              id: record.codigo,
              codigo: record.codigo,
              descripcion: record.descripcion,
              adn: record.adn,
              tipo: record.tipo,
              marca: record.marca,
            })
          }
        >
          Añadir
        </Button>
      ),
    },
  ];

  return (    <Modal
      title={`Seleccionar Instrumento o Producto${marcaComodato ? ` - Marca: ${marcaComodato}` : ''}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1100}
      height={200}
    >
      {/* Buscador */}
      <Input
        placeholder="Buscar por código o descripción"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table
        dataSource={filteredProductos}
        columns={productosComodatoColumns}
        rowKey="codigo"
        scroll={{ x: 1000 }}
      />
    </Modal>
  );
};

export default InstrumentSelectorModal;