import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axiosInstance from '../api/axiosInstance';

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
  const [marcas, setMarcas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/bodega/filtros/?v=1')
      .then(res => {
        // Ensure we're accessing the 'adn' property and it's an array
        const marcasArray = Array.isArray(res.data.adn) ? res.data.adn : [];
        setMarcas(marcasArray.filter((marca: string): boolean => marca !== "."));
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
      {Array.isArray(marcas) && marcas.map(marca => (
        <Select.Option key={marca} value={marca}>
          {marca}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MarcasSelector;
