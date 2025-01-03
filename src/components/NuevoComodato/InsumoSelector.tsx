import { Button, Form, InputNumber, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface Insumo {
  id: number;
  codigo: string;
  producto: string;
  precio_neto: number;
}

const InsumoSelector: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/insumos");
        setInsumos(response.data);
      } catch (error) {
        console.error("Error fetching insumos:", error);
        message.error("Error al cargar los insumos");
      }
    };

    fetchInsumos();
  }, []);

  return (
    <Form.List name="insumos">
      {(fields, { add, remove }) => (
        <div>
          {fields.map(({ key, name }) => (
            <div key={key} className="flex items-center gap-4 mb-4">
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
                  {insumos.map((insumo) => (
                    <Select.Option key={insumo.id} value={insumo.id}>
                      {`${insumo.codigo} - ${insumo.producto} - $${insumo.precio_neto}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Cantidad Input */}
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

export default InsumoSelector;
