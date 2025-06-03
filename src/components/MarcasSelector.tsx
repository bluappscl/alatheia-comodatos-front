import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axiosInstance from '../api/axiosInstance';

interface Marca {
  marca: string;
}

interface MarcasSelectorProps {
  value?: string;
  onChange: (marca: string) => void;
  placeholder?: string;
}

const MarcasSelector: React.FC<MarcasSelectorProps> = ({
  value,
  onChange,
  placeholder = "Seleccione una marca"
}) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get<{ marcas: Marca[] }>('/comodatos/marcas/')
      .then(res => {
        setMarcas(res.data.marcas);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      className="w-full"
      loading={loading}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      showSearch
      optionFilterProp="children"
    >
      {marcas.map(m => (
        <Select.Option key={m.marca} value={m.marca}>
          {m.marca}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MarcasSelector;
