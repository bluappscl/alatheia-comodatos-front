import { Button, Checkbox, Form, InputNumber, message, Select } from "antd";
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
        <>
          <div>
            {fields.map(({ key, name }) => (
              <div
                key={key}
                className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-4"
              >
                {/* Insumo Selector */}
                <Form.Item
                  name={[name, "id"]}
                  rules={[{ required: true, message: "Seleccione un insumo" }]}
                  className="flex-1 min-w-[200px]"
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
                  className="w-24"
                >
                  <InputNumber
                    min={1}
                    placeholder="Cantidad"
                    className="w-full"
                  />
                </Form.Item>

                {/* Checkbox */}
                <Form.Item
                  name={[name, "is_reactivo"]}
                  valuePropName="checked"
                  initialValue={false} // Default to false
                  className="flex items-center"
                >
                  <Checkbox>Es reactivo?</Checkbox>
                </Form.Item>

                {/* Remove Button */}
                <Form.Item>
                  <Button
                    type="default"
                    danger
                    onClick={() => remove(name)}
                    className="flex-shrink-0"
                  >
                    Quitar
                  </Button>
                </Form.Item>
              </div>
            ))}

            {/* Add Insumo Button */}
            <Button
              type="dashed"
              onClick={() => add({ is_reactivo: false })} // Set default value on add
              className="w-full"
            >
              Agregar Insumo
            </Button>
          </div>
        </>
      )}
    </Form.List>
  );
};

export default InsumoSelector;
