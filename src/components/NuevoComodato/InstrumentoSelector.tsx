import { Button, Form, InputNumber, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface Instrumento {
  id: number;
  codigo: string;
  producto: string;
  numero_serie: string;
  cantidad: number;
  valor_neto_uf: number;
}

const InstrumentoSelector: React.FC = () => {
  const [instrumentos, setInsumos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/instrumentos");
        setInsumos(response.data);
      } catch (error) {
        console.error("Error fetching instrumentos:", error);
        message.error("Error al cargar los instrumentos");
      }
    };

    fetchInsumos();
  }, []);

  return (
    <Form.List name="instrumentos">
      {(fields, { add, remove }) => (
        <div>
          {fields.map(({ key, name, fieldKey }) => (
            <div key={key} className="flex items-center gap-4 mb-4">
              {/* Insumo Selector */}
              <Form.Item
                name={[name, "id"]}
                rules={[{ required: true, message: "Seleccione un insumo" }]}
                className="flex-1"
              >
                <Select
                  showSearch
                  placeholder="Seleccione un insumo"
                  optionFilterProp="children"
                  className="w-full"
                >
                  {instrumentos.map((insumo) => (
                    <Select.Option key={insumo.id} value={insumo.id}>
                      {`${insumo.codigo} - ${insumo.producto} - ${insumo.valor_neto_uf}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name={[name, "cantidad"]}
                rules={[
                  { required: true, message: "Ingrese la cantidad" },
                  {
                    type: "number",
                    min: 1,
                    message: "La cantidad debe ser mayor a 0",
                  },
                ]}
              >
                <InputNumber min={1} placeholder="Cantidad" className="w-20" />
              </Form.Item>

              <Form.Item>
                <Button type="default" onClick={() => remove(name)}>
                  Eliminar
                </Button>
              </Form.Item>
            </div>
          ))}

          {/* Add Insumo Button */}
          <Button type="dashed" onClick={() => add()} className="w-full">
            Agregar Insumo
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default InstrumentoSelector;
