// src/components/NuevoComodato/RepresentanteSelector.tsx
import React, { useState, useEffect } from "react";
import { Select, Spin, Typography } from "antd";
import axiosInstance from "../api/axiosInstance";

const { Option } = Select;

export interface Representante {
  codigo: string;
  nombre: string;
}

interface RepresentanteSelectorProps {
  value?: string;
  onChange: (rep: Representante) => void;
  placeholder?: string;
}

const RepresentanteSelector: React.FC<RepresentanteSelectorProps> = ({
  value,
  onChange,
  placeholder = "Seleccione un representante",
}) => {
  const [reps, setReps] = useState<Representante[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{ representantes: Representante[] }>("/comodatos/representantes/")
      .then(res => setReps(res.data.representantes))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin />;
  if (!reps.length) return <Typography.Text>No hay representantes</Typography.Text>;

  // construye el par { value, label } que el Select espera
  const selectValue = value
    ? { value, label: reps.find(r => r.codigo === value)?.nombre || "" }
    : undefined;

  return (
    <Select<{ value: string; label: string }>
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
        // opt es { value, label }
        onChange({ codigo: opt.value, nombre: opt.label as string });
      }}
    >
      {reps.map(r => (
        <Option key={r.codigo} value={r.codigo} label={r.nombre}>
          {r.codigo} — {r.nombre}
        </Option>
      ))}
    </Select>
  );
};

export default RepresentanteSelector;
