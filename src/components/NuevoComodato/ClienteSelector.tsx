// src/components/NuevoComodato/ClienteSelector.tsx
import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Typography, Spin, Input } from "antd";
import axiosInstance from "../../api/axiosInstance";
import { ClienteInterface } from "../../interfaces/ClienteInterface";

const { Search } = Input;

interface ClientSelectionModalProps {
  onSelectClient: (rut: string) => void;
  showSelectedClient?: boolean;
    selectedRut?: string;   
}

const ClientSelectionModal: React.FC<ClientSelectionModalProps> = ({
  onSelectClient,
  showSelectedClient = true,
  selectedRut,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);
  const [filtered, setFiltered] = useState<ClienteInterface[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClienteInterface | null>(null);

   useEffect(() => {
    if (selectedRut && clientes.length) {
      const c = clientes.find((cl) => cl.rut === selectedRut) || null;
      setSelectedClient(c);
    }
  }, [selectedRut, clientes]);

  // Hacer GET directamente aquí
  useEffect(() => {
    setLoadingClientes(true);
    axiosInstance
      .get<{ clientes: ClienteInterface[] }>("/comodatos/clientes/")
      .then(res => {
        setClientes(res.data.clientes);
        if (isModalOpen) {
          setFiltered(res.data.clientes);
        }
      })
      .catch(err => {
        console.error("Error al cargar clientes:", err);
      })
      .finally(() => {
        setLoadingClientes(false);
      });
  }, [isModalOpen]);

  // Resetear filtro cuando se abra el modal
  useEffect(() => {
    if (isModalOpen) {
      setFiltered(clientes);
      setSearchText("");
    }
  }, [isModalOpen, clientes]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFiltered(
      clientes.filter(c =>
        c.nombre.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCardClick = (c: ClienteInterface) => {
    setSelectedClient(c);
    onSelectClient(c.rut);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        className="w-full"
        onClick={() => setIsModalOpen(true)}
      >
        Seleccionar Cliente
      </Button>

      {showSelectedClient && selectedClient && (
        <Card className="mt-4 bg-gray-50">
          <Typography.Title level={5}>
            {selectedClient.nombre}
          </Typography.Title>
          <Typography.Text>RUT: {selectedClient.rut}</Typography.Text>
          <br />
          <Typography.Text>
            Cód. Comuna: {selectedClient.codigo_comuna}
          </Typography.Text>
          <br />
          <Typography.Text>
            Dirección: {selectedClient.direccion}
          </Typography.Text>
        </Card>
      )}

      <Modal
        title="Seleccione un Cliente"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Search
          placeholder="Buscar cliente..."
          allowClear
          enterButton
          onSearch={handleSearch}
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          className="mb-4"
        />

        {loadingClientes ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(c => (
              <Card
                key={c.rut}
                hoverable
                onClick={() => handleCardClick(c)}
                className="cursor-pointer"
              >
                <Typography.Title level={5}>{c.nombre}</Typography.Title>
                <Typography.Text>RUT: {c.rut}</Typography.Text>
                <br />
                <Typography.Text>
                  Cód. Comuna: {c.codigo_comuna}
                </Typography.Text>
                <br />
                <Typography.Text>Dirección: {c.direccion}</Typography.Text>
              </Card>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ClientSelectionModal;
