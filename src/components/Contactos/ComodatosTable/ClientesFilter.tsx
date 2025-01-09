import { Select } from "antd";
import { ClienteInterface } from "../../../interfaces/ClienteInterface";

interface ClientesFilterInterface {
  clientes: ClienteInterface[];
  loading: boolean;
  setFilteredClients: (selectedIds: string[]) => void;
}

const ClientesFilter: React.FC<ClientesFilterInterface> = ({
  clientes,
  loading,
  setFilteredClients,
}) => {
  return (
    <Select
      className="w-full"
      mode="multiple"
      placeholder="Filtro de clientes"
      onChange={(selectedValues) => {
        const selectedIds = selectedValues.map(
          (value: string) => value.split("/")[1]
        );
        setFilteredClients(selectedIds);
      }}
      options={clientes?.map((cliente) => ({
        label: cliente.nombre,
        value: `${cliente.nombre}/${cliente.id.toString()}`,
      }))}
      loading={loading}
    />
  );
};

export default ClientesFilter;
