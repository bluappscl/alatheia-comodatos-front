import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Checkbox,
  InputNumber,
  Select,
} from "antd";
import axios from "axios";
import InsumoSelector from "../components/NuevoComodato/InsumoSelector";
import InstrumentoSelector from "../components/NuevoComodato/InstrumentoSelector";
import ClientSelectionModal from "../components/NuevoComodato/ClienteSelector";

interface CrearComodatoValues {
  nombre: string;
  descripcion: string;
  fechaInicio: { format: (format: string) => string };
  fechaFin: { format: (format: string) => string };
  insumos: Array<{ id: number; cantidad: number }>;
  instrumentos: Array<{ id: number; cantidad: number }>;
  client_id: number;
  objetivoReactivosCantidad?: number;
  objetivoDineroCantidad?: number;
}

const CrearComodato: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isRenovable, setIsRenovable] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [clientId, setClientId] = useState<number>(0);
  const [enableReactivos, setEnableReactivos] = useState(false);
  const [enableDinero, setEnableDinero] = useState(false);

  const onFinish = async (values: CrearComodatoValues) => {
    setLoading(true);
    try {
      const data = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fechaInicio: values.fechaInicio.format("YYYY-MM-DD"),
        fechaFin: values.fechaFin.format("YYYY-MM-DD"),
        esRenovable: isRenovable,
        seRenuevaAutomaticamente: isRenovable ? autoRenew : false,
        insumos: values.insumos || [],
        instrumentos: values.instrumentos || [],
        client_id: clientId,
        objetivoReactivosCantidad: enableReactivos
          ? values.objetivoReactivosCantidad
          : undefined,
        objetivoDineroCantidad: enableDinero
          ? values.objetivoDineroCantidad
          : undefined,
      };

      const response = await axios.post("/api/comodatos", data);

      if (response.status === 200) {
        message.success("Comodato creado exitosamente");
      } else {
        message.error("Error al crear el comodato");
      }
    } catch (error) {
      console.error(error);
      message.error("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    message.error("Por favor, complete todos los campos obligatorios");
  };

  const handleIsRenovableChange = (e: { target: { checked: boolean } }) => {
    setIsRenovable(e.target.checked);
    if (!e.target.checked) {
      setAutoRenew(false);
    }
  };

  const handleAutoRenewChange = (e: { target: { checked: boolean } }) => {
    setAutoRenew(e.target.checked);
  };

  const handleSelectClient = (id: number) => {
    setClientId(id);
  };

  return (
    <div className="p-6 w-11/12 h-full mx-auto bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear Comodato</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[
                { required: true, message: "Por favor ingrese el nombre" },
              ]}
            >
              <Input placeholder="Ingrese el nombre del comodato" />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[
                { required: true, message: "Por favor ingrese la descripción" },
              ]}
            >
              <Input.TextArea placeholder="Ingrese la descripción del comodato" />
            </Form.Item>

            <Form.Item
              label="Fecha de Inicio"
              name="fechaInicio"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione la fecha de inicio",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="Fecha de Fin"
              name="fechaFin"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione la fecha de fin",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item label="Opciones de renovación">
              <div className="flex items-center gap-4 lg:mb-6">
                <Checkbox
                  checked={isRenovable}
                  onChange={handleIsRenovableChange}
                >
                  Es renovable?
                </Checkbox>
                <Checkbox
                  checked={autoRenew}
                  onChange={handleAutoRenewChange}
                  disabled={!isRenovable}
                >
                  ¿Se renueva automáticamente?
                </Checkbox>
              </div>
            </Form.Item>

            <div className="flex flex-col">
              <Form.Item label="Objetivos">
                {/* Reactivos Objective */}
                <div className="flex flex-col gap-2 mb-4">
                  <Checkbox
                    checked={enableReactivos}
                    onChange={(e) => setEnableReactivos(e.target.checked)}
                  >
                    Objetivo de Reactivos (Cantidad)
                  </Checkbox>
                  {enableReactivos && (
                    <Form.Item
                      name="objetivoReactivosCantidad"
                      rules={[
                        {
                          required: true,
                          message: "Ingrese la cantidad de reactivos",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        className="w-full"
                        placeholder="Cantidad de Reactivos"
                      />
                    </Form.Item>
                  )}
                </div>

                {/* Dinero Objective */}
                <div className="flex flex-col gap-2">
                  <Checkbox
                    checked={enableDinero}
                    onChange={(e) => setEnableDinero(e.target.checked)}
                  >
                    Objetivo de Dinero
                  </Checkbox>
                  {enableDinero && (
                    <Form.Item
                      name="objetivoDineroCantidad"
                      rules={[
                        {
                          required: true,
                          message: "Ingrese la cantidad de dinero",
                        },
                      ]}
                    >
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                        <div className="w-28">
                          <Select placeholder="Moneda" className="w-full">
                            <Select.Option value="CLP">CLP</Select.Option>
                            <Select.Option value="UF">UF</Select.Option>
                          </Select>
                        </div>
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="Cantidad de Dinero"
                        />
                      </div>
                    </Form.Item>
                  )}
                </div>
              </Form.Item>
            </div>

            <Form.Item className="hidden lg:block">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Crear Comodato
              </Button>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Cliente"
              rules={[
                { required: true, message: "Por favor seleccione un cliente" },
              ]}
            >
              <ClientSelectionModal
                onSelectClient={handleSelectClient}
                showSelectedClient={true}
              />
            </Form.Item>

            <Form.Item label="Agregar Insumo" className="w-full">
              <InsumoSelector />
            </Form.Item>

            <Form.Item label="Agregar Instrumento">
              <InstrumentoSelector />
            </Form.Item>
          </div>
        </div>
        <Form.Item className="block lg:hidden">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Crear Comodato
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CrearComodato;
