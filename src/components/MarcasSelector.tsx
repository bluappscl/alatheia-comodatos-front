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
  clientRut?: string | null;
}

const MarcasSelector: React.FC<MarcasSelectorProps> = ({
  value,
  onChange,
  placeholder = "Seleccione una marca",
  clientRut
}) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('clientRut', clientRut)

  useEffect(() => {

    console.log("[MarcasSelector] Props recibidas:", { clientRut, value });

    if (!clientRut || clientRut === "") {
      console.log("[MarcasSelector] No hay RUT, limpiando marcas");
      setMarcas([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const encodedRut = encodeURIComponent(clientRut);
    console.log("[MarcasSelector] Iniciando fetch para RUT:", clientRut);
    axiosInstance.get<{ marcas: Marca[] }>(`/comodatos/marcas/${encodedRut}/disponibles/`)
      .then(res => {
        console.log("[MarcasSelector] Marcas recibidas:", res.data.marcas);
        setMarcas(res.data.marcas);
      })
      .catch(error => {
        console.error("[MarcasSelector] Error al cargar marcas:", error);
        setMarcas([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clientRut]);

  useEffect(() => {
    console.log("[MarcasSelector] Estado actual:", { 
      clientRut, 
      disabled: !clientRut || clientRut === "", 
      marcasCount: marcas.length 
    });
  }, [clientRut, marcas]);

  const isDisabled = !clientRut || clientRut === "";
  console.log("[MarcasSelector] Render - disabled:", isDisabled, "clientRut:", clientRut);
  
  return (
    <>
    <Select
      className="w-full"
      loading={loading}
  placeholder={loading ? "espere mientras obtenemos las marcas" : (!isDisabled ? placeholder : "Seleccione un cliente primero")}
      value={value}
      onChange={onChange}
      showSearch
      optionFilterProp="children"
      // disable while no client selected OR while loading results
      disabled={isDisabled || loading}
    >
      {marcas.map(m => (
        <Select.Option key={m.marca} value={m.marca}>
          {m.marca}
        </Select.Option>
      ))}
    </Select>
    {loading && (
      <div className="text-sm text-gray-500 mt-1">
        espere mientras obtenemos las marcas
      </div>
    )}
    </>
  );
};

export default MarcasSelector;
