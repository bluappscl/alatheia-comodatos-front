import { Select } from "antd";
import { ClienteInterface } from "../../interfaces/ClienteInterface";

interface ClientesMultipleSelectInterface {
  clientes: ClienteInterface[];
  loading: boolean;
  setFilteredClients: (selectedIds: string) => void;
}

const ClientesSelect: React.FC<ClientesMultipleSelectInterface> = ({
  clientes,
  loading,
  setFilteredClients,
}) => {
  const onChange = (value: string) => {
    setFilteredClients(value.split("/")[1]);
  };

  return (
    <Select
      showSearch
      allowClear
      className="w-full"
      placeholder="Filtro de clientes"
      onChange={onChange}
      options={clientes?.map((cliente) => ({
        label: cliente.nombre,
        value: `${cliente.nombre}/${cliente.id.toString()}`,
      }))}
      loading={loading}
    />
  );
};

export default ClientesSelect;
