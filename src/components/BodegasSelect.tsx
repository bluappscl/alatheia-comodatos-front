// src/components/NuevoComodato/BodegasSelector.tsx
import React, { useState, useEffect } from "react";
import { Select, Spin, Typography } from "antd";
import axiosInstance from "../api/axiosInstance";

export interface Bodega {
  codigo: string;
}

interface BodegasSelectorProps {
  value?: string;
  onChange: (codigo: string) => void;
  placeholder?: string;
}

const BodegasSelector: React.FC<BodegasSelectorProps> = ({
  value,
  onChange,
  placeholder = "Seleccione una bodega",
}) => {
  
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{ bodegas: Bodega[] }>("/comodatos/bodegas/")
      .then(res => setBodegas(res.data.bodegas))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin />;
  if (!bodegas.length)
    return <Typography.Text type="warning">No hay bodegas disponibles</Typography.Text>;

  return (
    <Select<string>
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      value={value}
      style={{ width: "100%" }}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.value as string).toLowerCase().includes(input.toLowerCase())
      }
    >
      {bodegas.map(b => (
        <Select.Option key={b.codigo} value={b.codigo}>
          {b.codigo}
        </Select.Option>
      ))}
    </Select>
  );
};

export default BodegasSelector;
