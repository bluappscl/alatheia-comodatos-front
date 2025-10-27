// src/components/NuevoComodato/ClienteSelector.tsx
import React, { useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { Button, Modal, Card, Typography, Spin, Input, Empty } from "antd";
import VirtualList from "rc-virtual-list";
import axiosInstance from "../../api/axiosInstance";
import { ClienteInterface } from "../../interfaces/ClienteInterface";

const { Search } = Input;

interface ClientSelectionModalProps {
  onSelectClient: (rut: string) => void;
  showSelectedClient?: boolean;
  selectedRut?: string;
}

/** Extendemos para incluir un campo precomputado de búsqueda */
type ClienteWithSearch = ClienteInterface & { _search: string };

const ContainerHeight = 480; // alto de la lista virtual en el modal
const RowHeight = 96; // alto aproximado de cada tarjeta (ajústalo si quieres)

const ClientSelectionModal: React.FC<ClientSelectionModalProps> = ({
  onSelectClient,
  showSelectedClient = true,
  selectedRut,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientes, setClientes] = useState<ClienteWithSearch[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClienteInterface | null>(null);

  const hasFetchedRef = useRef(false); // evitar múltiples fetch
  const abortRef = useRef<AbortController | null>(null);

  // Sincroniza la tarjeta seleccionada cuando cambia el selectedRut externo
  useEffect(() => {
    if (selectedRut && clientes.length) {
      const c = clientes.find((cl) => cl.rut === selectedRut) || null;
      setSelectedClient(c);
    }
  }, [selectedRut, clientes]);

  // Carga de clientes SOLO la primera vez que se abre el modal
  useEffect(() => {
    if (!isModalOpen || hasFetchedRef.current) return;

    setLoadingClientes(true);
    hasFetchedRef.current = true;

    // Cancelación segura si desmonta
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    axiosInstance
      .get<{ clientes: ClienteInterface[] }>("/comodatos/clientes/", {
        signal: controller.signal as any,
      })
      .then((res) => {
        const enriched: ClienteWithSearch[] = res.data.clientes.map((c) => ({
          ...c,
          _search: `${c.nombre ?? ""} ${c.rut ?? ""} ${c.direccion ?? ""} ${c.codigo_comuna ?? ""}`.toLowerCase(),
        }));
        setClientes(enriched);
      })
      .catch((err) => {
        if (err?.name !== "CanceledError" && err?.code !== "ERR_CANCELED") {
          console.error("Error al cargar clientes:", err);
        }
      })
      .finally(() => setLoadingClientes(false));

    return () => {
      controller.abort();
    };
  }, [isModalOpen]);

  // Al abrir el modal, reseteamos el texto de búsqueda
  useEffect(() => {
    if (isModalOpen) setSearchText("");
  }, [isModalOpen]);

  // Diferimos el valor para que el filtrado no bloquee el tipeo
  const deferredSearch = useDeferredValue(searchText.trim().toLowerCase());

  // Filtrado derivado (sin setState): renderiza solo lo necesario
  const filteredClientes = useMemo(() => {
    if (!deferredSearch) return clientes;
    // incluye match por nombre/rut/dirección/código comuna
    return clientes.filter((c) => c._search.includes(deferredSearch));
  }, [clientes, deferredSearch]);

  const handleCardClick = (c: ClienteInterface) => {
    setSelectedClient(c);
    try {
      onSelectClient?.(c.rut);
    } catch (err) {
      console.error("Error ejecutando onSelectClient:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button type="primary" className="w-full" onClick={() => setIsModalOpen(true)}>
        Seleccionar Cliente
      </Button>

      {showSelectedClient && selectedClient && (
        <Card className="mt-4 bg-gray-50">
          <Typography.Title level={5}>{selectedClient.nombre}</Typography.Title>
          <Typography.Text>RUT: {selectedClient.rut}</Typography.Text>
          <br />
          <Typography.Text>Cód. Comuna: {selectedClient.codigo_comuna}</Typography.Text>
          <br />
          <Typography.Text>Dirección: {selectedClient.direccion}</Typography.Text>
        </Card>
      )}

      <Modal
        title="Seleccione un Cliente"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={820}
        destroyOnClose
      >
        <Search
          placeholder="Buscar por nombre, RUT, dirección o cód. comuna…"
          allowClear
          enterButton
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={(value) => setSearchText(value)}
          className="mb-4"
        />

        {loadingClientes ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : filteredClientes.length === 0 ? (
          <Empty description="Sin resultados" />
        ) : (
          <div className="rounded-md">
            {/* Lista virtualizada */}
            <VirtualList
              data={filteredClientes}
              height={ContainerHeight}
              itemHeight={RowHeight}
              itemKey="rut"
            >
              {(c: ClienteWithSearch) => (
                <Card
                  key={c.rut}
                  hoverable
                  onClick={() => handleCardClick(c)}
                  className="cursor-pointer mb-3"
                >
                  <Typography.Title level={5} style={{ marginBottom: 4 }}>
                    {c.nombre}
                  </Typography.Title>
                  <Typography.Text>RUT: {c.rut}</Typography.Text>
                  <br />
                  <Typography.Text>Cód. Comuna: {c.codigo_comuna}</Typography.Text>
                  <br />
                  <Typography.Text>Dirección: {c.direccion}</Typography.Text>
                </Card>
              )}
            </VirtualList>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ClientSelectionModal;
