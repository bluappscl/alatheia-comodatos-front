import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useEffect, useState } from "react";
import { instrumentos_json } from "../../api/json_examples/instrumentos_json"; 

interface Instrumento {
  id: number;
  codigo: string;
  producto: string;
  numero_serie: string;
  cantidad: number;
  valor_neto: number;
}

const InstrumentoSelector: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        // const response = await axios.get("http://localhost:3001/instrumentos");
        // setInstrumentos(response.data);
        setInstrumentos(instrumentos_json);
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
                rules={[
                  { required: true, message: "Seleccione un instrumento" },
                ]}
                className="flex-1"
              >
                <Select
                  showSearch
                  placeholder="Seleccione un instrumento"
                  optionFilterProp="children"
                  className="w-full"
                >
                  {instrumentos.map((instrumento) => (
                    <Select.Option key={instrumento.id} value={instrumento.id}>
                      {`${instrumento.producto} - ${instrumento.codigo}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="valorInstrumentoNeto"
                rules={[
                  {
                    required: true,
                    message: "Ingrese la cantidad de dinero",
                  },
                ]}
              >
                <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                  <div className="w-full">
                    <Select placeholder="Moneda" className="w-fit">
                      <Select.Option value="CLP">CLP</Select.Option>
                      <Select.Option value="UF">UF</Select.Option>
                    </Select>
                  </div>
                  <Input min={1} className="w-full" placeholder="Valor Neto" />
                </div>
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
                className="w-full"
              >
                <InputNumber
                  min={1}
                  placeholder="Cantidad"
                  className="w-full"
                />
              </Form.Item>

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
          <Button type="dashed" onClick={() => add()} className="w-full">
            Agregar Instrumento
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default InstrumentoSelector;
