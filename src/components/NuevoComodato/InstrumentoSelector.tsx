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
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/instrumentos");
        setInstrumentos(response.data);
      } catch (error) {
        console.error("Error fetching instrumentos:", error);
        message.error("Error al cargar los instrumentos");
      }
    };

    fetchInstrumentos();
  }, []);

  return (
    <Form.List name="instrumentos">
      {(fields, { add, remove }) => (
        <div>
          {fields.map(({ key, name }) => (
            <div
              key={key}
              className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-4"
            >
              {/* Instrumento Selector */}
              <Form.Item
                name={[name, "id"]}
                rules={[{ required: true, message: "Seleccione un instrumento" }]}
                className="flex-1 min-w-[200px]"
              >
                <Select
                  showSearch
                  placeholder="Seleccione un instrumento"
                  optionFilterProp="children"
                  className="w-full"
                >
                  {instrumentos.map((instrumento) => (
                    <Select.Option key={instrumento.id} value={instrumento.id}>
                      {`${instrumento.codigo} - ${instrumento.producto} - UF ${instrumento.valor_neto_uf}`}
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

          {/* Add Instrumento Button */}
          <Button
            type="dashed"
            onClick={() => add()}
            className="w-full md:w-auto"
          >
            Agregar Instrumento
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default InstrumentoSelector;
