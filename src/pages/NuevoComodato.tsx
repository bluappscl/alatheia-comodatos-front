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
import ClientSelectionModal from "../components/NuevoComodato/ClienteSelector";
import FileUploadDrawable from "../components/shared/FileUploadDrawable";
import InstrumentSelectorTable from "../components/Instrumentos/InstrumentSelectorTable";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";

import comodato_photo from "../media/temporal/comodato_photo.png";

import { motion } from "motion/react";

interface CrearComodatoValues {
  nombre: string;
  descripcion: string;
  fechaInicio: { format: (format: string) => string };
  fechaFin: { format: (format: string) => string };
  insumos?: Array<{ id: number; cantidad: number }>;
  instrumentos?: Array<{ id: number; cantidad: number }>;
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
  const [enableGraceTime, setEnableGraceTime] = useState(false);

  const onFinish = async (values: CrearComodatoValues) => {
    setLoading(true);
    try {
      const data = {
        nombre: values.nombre,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        title="Nuevo Comodato"
        description="Aqui puedes crear un nuevo comodato"
        photo_path={comodato_photo}
      />
      <div className="p-6 w-full h-full mx-auto bg-white rounded-md">
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Form.Item
                label="Contrato"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el nombre del cliente",
                  },
                ]}
              >
                <FileUploadDrawable />
              </Form.Item>
              <Form.Item
                label="Cliente"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione un cliente",
                  },
                ]}
              >
                <ClientSelectionModal
                  onSelectClient={handleSelectClient}
                  showSelectedClient={true}
                />
              </Form.Item>
              <label className="font-semibold text-primary-700">
                Resentante del Cliente
              </label>
              <div className="flex flex-row gap-4">
                <Form.Item
                  className="w-full"
                  label="Nombre"
                  name="nombre_representante_cliente"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el nombre del cliente",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el nombre del cliente" />
                </Form.Item>

                <Form.Item
                  className="w-full"
                  label="Rut"
                  name="rut_representante_cliente"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el rut del cliente",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el rut del cliente" />
                </Form.Item>
              </div>

              {/* Representante Alatheia */}
              <label className="font-semibold">Resentante de Alatheia</label>
              <div className="flex flex-row gap-4">
                <Form.Item
                  className="w-full"
                  label="Nombre"
                  name="_representante_alatheia"
                  rules={[
                    {
                      required: true,
                      message: "nombre del representante",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el nombre del cliente" />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="Rut"
                  name="rut_representante_alatheia"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese el rut del representante",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el rut del cliente" />
                </Form.Item>
              </div>

              <Form.Item
                label="Direccion de Sucursal"
                name="sucursal"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese la direccion de la sucursal",
                  },
                ]}
              >
                <Input placeholder="Ingrese la direccion de la sucursal" />
              </Form.Item>

              <Form.Item
                label="Tipo de sucursal"
                name="sucursal_tipo"
                rules={[
                  {
                    required: true,
                    message: "Porfavor seleccione un tipo de sucursal",
                  },
                ]}
              >
                <Select placeholder="Tipo de sucursal" className="w-full">
                  <Select.Option value="Hematologia">Hematologia</Select.Option>
                  <Select.Option value="Cardiología">Cardiología</Select.Option>
                  <Select.Option value="Cardiología">...</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div>
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
              <Form.Item
                label="Plazo para pago de facturas"
                name="plazoPagoFacturas"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el plazo de días para pagar",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Ingrese la cantidad de días para pagar la factura despues de emitida"
                  className="w-full"
                />
              </Form.Item>

              <Form.Item label="Tiempo de Gracia">
                <div className="flex flex-col gap-2">
                  <Checkbox
                    checked={enableGraceTime}
                    onChange={(e) => setEnableGraceTime(e.target.checked)}
                  >
                    Tiene tiempo de gracia?
                  </Checkbox>
                  {enableGraceTime && (
                    <Form.Item
                      name="tiempoDeGracia"
                      rules={[
                        {
                          required: true,
                          message: "Ingrese la cantidad de dinero",
                        },
                      ]}
                    >
                      <div className="flex flex-row items-center gap-4">
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="Meses de gracia"
                        />
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="Porcentaje de descuento"
                          suffix="%"
                        />
                      </div>
                    </Form.Item>
                  )}
                </div>
              </Form.Item>

              <Form.Item label="Opciones de renovación">
                <div className="flex items-center gap-4 ">
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
                {/* <Form.Item label="Agregar Instrumento" className="w-full">
                <InstrumentoSelector />
                </Form.Item> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col my-10">
            <InstrumentSelectorTable />
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Crear Comodato
            </Button>
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
};

export default CrearComodato;
