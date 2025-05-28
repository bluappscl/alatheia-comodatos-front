// src/components/NuevoComodato/UbicacionesSelector.tsx
import React, { useState, useEffect } from "react";
import { Select, Spin, Typography } from "antd";
import axiosInstance from "../api/axiosInstance";

const { Option } = Select;

export interface Ubicacion {
  id: number;
  nombre: string;
}

interface UbicacionesSelectorProps {
  value?: number;
  onChange: (ubicacion: Ubicacion) => void;
  placeholder?: string;
}

const UbicacionesSelector: React.FC<UbicacionesSelectorProps> = ({
  value,
  onChange,
  placeholder = "Seleccione una ubicación",
}) => {
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{ codigos_ubicaciones: Ubicacion[] }>("/comodatos/codigos-ubicaciones/")
      .then(res => setUbicaciones(res.data.codigos_ubicaciones))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin />;
  if (!ubicaciones.length) return <Typography.Text>No hay ubicaciones</Typography.Text>;

  const selectValue = value
    ? { value, label: ubicaciones.find(u => u.id === value)?.nombre || "" }
    : undefined;

  return (
    <Select<{ value: number; label: string }>
      showSearch
      placeholder={placeholder}
      optionFilterProp="label"
      style={{ width: "100%" }}
      labelInValue
      value={selectValue}
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      onChange={opt => {
        const ubicacion = ubicaciones.find(u => u.id === opt.value);
        if (ubicacion) onChange(ubicacion);
      }}
    >
      {ubicaciones.map(u => (
        <Option key={u.id} value={u.id} label={u.nombre}>
          {u.nombre}
        </Option>
      ))}
    </Select>
  );
};

export default UbicacionesSelector;
