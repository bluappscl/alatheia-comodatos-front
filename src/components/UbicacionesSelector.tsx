// src/components/NuevoComodato/ubicacionesSelector.tsx
import React, { useState, useEffect } from "react";
import { Select, Spin, Typography } from "antd";
import axiosInstance from "../api/axiosInstance";

export interface Bodega {
  id: number;
  nombre: string;
}

interface ubicacionesSelectorProps {
  value?: number; // Cambiado a number para manejar el id
  onChange: (id: number) => void; // Cambiado a number
  placeholder?: string;
}

const UbicacionesSelector: React.FC<ubicacionesSelectorProps> = ({
  value,
  onChange,
  placeholder = "Seleccione una ubicación",
}) => {
  const [ubicaciones, setubicaciones] = useState<Bodega[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{ codigos_ubicaciones: Bodega[] }>("/comodatos/codigos-ubicaciones/")
      .then(res => setubicaciones(res.data.codigos_ubicaciones))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin />;
  if (!ubicaciones.length)
    return <Typography.Text type="warning">No hay ubicaciones disponibles</Typography.Text>;

  return (
    <Select<number>
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      value={value}
      style={{ width: "100%" }}
      onChange={onChange}
    >
      {ubicaciones.map(b => (
        <Select.Option key={b.id} value={b.id}>
          {b.nombre}
        </Select.Option>
      ))}
    </Select>
  );
};

export default UbicacionesSelector;
