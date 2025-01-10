import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Typography, Spin, Input } from "antd";
import { ClienteInterface } from "../../interfaces/ClienteInterface";
import { useFetchClientes } from "../../api/hooks/clientes/get_clientes";

const { Search } = Input;

interface ClientSelectionModalProps {
  onSelectClient: (id: number) => void;
  onAddClient?: () => void;
  showSelectedClient?: boolean;
}

const ClientSelectionModal: React.FC<ClientSelectionModalProps> = ({
  onSelectClient,
  showSelectedClient = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredClientes, setFilteredClientes] = useState<ClienteInterface[]>(
    []
  );
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClienteInterface>();

  const { clientes, loadingClientes } = useFetchClientes();

  useEffect(() => {
    if (isModalOpen) {
      setFilteredClientes(clientes);
    }
  }, [isModalOpen]);

  const handleCardClick = (client: ClienteInterface) => {
    onSelectClient(client.id);
    setSelectedClient(client);
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilteredClientes(
      clientes.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <Button
        className="w-full"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Seleccionar Cliente
      </Button>
      {showSelectedClient && selectedClient && (
        <div className="flex justify-center items-center mt-4">
          <Card className="mt-4 flex w-fit flex-col items-center px-10 bg-gray-50">
            {/* <img
              src={
                selectedClient.logo ||
                "https://static.vecteezy.com/system/resources/previews/005/720/408/non_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
              }
              // https://via.placeholder.com/100
              // https://static.vecteezy.com/system/resources/previews/005/720/408/non_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg
              alt={selectedClient.nombre}
              className="w-20 h-20 object-cover rounded-3xl mb-4 bg-white"
            /> */}

            <div className="flex flex-col">
              <Typography.Title level={5}>
                {selectedClient.nombre}
              </Typography.Title>
              <Typography.Text>RUT: {selectedClient.rut} </Typography.Text>
              <Typography.Text>
                Código Comuna: {selectedClient.codigo_comuna}
              </Typography.Text>
              <Typography.Text>
                Dirección: {selectedClient.direccion}
              </Typography.Text>
              {/* <Typography.Text>
                Cantidad de Comodatos Activos: {selectedClient.comodatos.length}
              </Typography.Text> */}
            </div>
          </Card>
        </div>
      )}

      <Modal
        title="Seleccione un Cliente"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <Search
            placeholder="Buscar cliente..."
            allowClear
            enterButton
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-2/3"
          />
        </div>
        {loadingClientes ? (
          <Spin className="w-full flex justify-center items-center" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClientes.map((cliente) => (
              <Card
                key={cliente.id}
                hoverable
                className="mt-4 flex flex-col items-center p-4 bg-gray-50"
                onClick={() => handleCardClick(cliente)}
              >
                {/* <img
                  src={cliente.logo || "https://via.placeholder.com/100"}
                  alt={cliente.nombre}
                  className="w-20 h-20 object-cover rounded-3xl mb-4 bg-white"
                /> */}
                <div className="flex flex-col">
                  <Typography.Title level={5}>
                    {cliente.nombre}
                  </Typography.Title>
                  <Typography.Text>RUT: {cliente.rut}</Typography.Text>
                  <Typography.Text>
                    Código Comuna: {cliente.codigo_comuna}
                  </Typography.Text>
                  <Typography.Text>
                    Dirección: {cliente.direccion}
                  </Typography.Text>
                  {/* <Typography.Text>
                    Cantidad de Comodatos Activos: {cliente.comodatos.length}
                  </Typography.Text> */}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ClientSelectionModal;
