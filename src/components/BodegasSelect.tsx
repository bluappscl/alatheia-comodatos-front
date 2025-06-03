// src/components/NuevoComodato/BodegasSelector.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Select, Spin, Typography } from "antd";
import axiosInstance from "../api/axiosInstance";

export interface Bodega {
  codigo: string;
  descripcion: string;
  direccion: string;
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
  }, []); // Sin dependencias, solo cargar una vez

  const handleChange = useCallback((newValue: string) => {
    onChange(newValue);
  }, [onChange]);

  if (loading) return <Spin />;
  if (!bodegas.length)
    return <Typography.Text type="warning">No hay bodegas disponibles</Typography.Text>;

  return (
    <Select<string>
      showSearch
      placeholder={placeholder}
      value={value}
      style={{ width: "100%" }}
      onChange={handleChange}
      filterOption={(input, option) => {
        const searchValue = input.toLowerCase();
        const optionValue = (option?.value as string)?.toLowerCase() || '';
        const optionLabel = String(option?.children || '').toLowerCase();
        
        return optionValue.includes(searchValue) || optionLabel.includes(searchValue);
      }}
    >
      {bodegas.map(b => (
        <Select.Option key={b.codigo} value={b.codigo}>
          {b.codigo} - {b.descripcion}
        </Select.Option>
      ))}
    </Select>
  );
};

export default BodegasSelector;
