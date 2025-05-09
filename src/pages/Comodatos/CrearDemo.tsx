import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Checkbox,
  InputNumber,
  Divider,
} from "antd";
import ClientSelectionModal from "../../components/NuevoComodato/ClienteSelector";
import InstrumentSelectorTable from "../../components/Instrumentos/InstrumentSelectorTable";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import comodato_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "motion/react";
import axiosInstance from "../../api/axiosInstance";
import RepresentanteSelector, {
  Representante,
} from "../../components/RepresentantesSelect";
import BodegasSelector from "../../components/BodegasSelect";
import { useNavigate } from "react-router-dom";
import { format as formatRut } from "rut.js";

const CrearDemo: React.FC<{ CambiarSeleccionButton?: React.ReactNode }> = ({
  CambiarSeleccionButton,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isRenovable, setIsRenovable] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [clientId, setClientId] = useState<number>(0);
  const [enableReactivos, setEnableReactivos] = useState(false);
  const [enableGraceTime, setEnableGraceTime] = useState(false);
  const [plazoParaPago, setPlazoParaPago] = useState(false);
  const [selectedBodega, setSelectedBodega] = useState<string>("");
  const [selectedRep, setSelectedRep] = useState<Representante | null>(null);

  console.log("selectedRep", selectedRep);

  const [selectedInstrumentos, setSelectedInstrumentos] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    setLoading(true);

    if (!selectedRep) {
      message.error("Seleccione un representante de venta");
      return;
    }

    const payload = {
      comodato: {
        // número de comodato (antes “values.contrato”)
        numero_comodato: values.numero_comodato,

        // rut del cliente
        rut_cliente: clientId,

        // representante del cliente
        nombre_representante_cliente: values.nombre_representante_cliente,
        rut_representante_cliente: values.rut_representante_cliente,

        // representante de Alatheia
        rut_representante_alatheia: values.rut_representante_alatheia,
        codigo_representante: selectedRep.codigo,
        nombre_representante_alatheia: selectedRep.nombre[0],

        // dirección / sucursal del cliente
        direccion_cliente: values.sucursal,

        // representante de venta y bodega
        representante_de_venta: values.representante_de_venta,
        codigo_bodega: selectedBodega,
        es_demo: true,

        // fechas en snake_case
        fecha_inicio: values.fechaInicio.format("YYYY-MM-DD"),
        fecha_fin: values.fechaFin.format("YYYY-MM-DD"),

        // plazo para pago
        plazo_para_pago: plazoParaPago,
        plazo_pago_facturas: plazoParaPago
          ? values.plazoPagoFacturas
          : undefined,

        // tiempo de gracia
        tiempo_de_gracia: enableGraceTime
          ? {
              meses: values.tiempoDeGracia[0],
              porcentaje: values.tiempoDeGracia[1],
            }
          : undefined,

        // renovación
        es_renovable: isRenovable,
        se_renueva_automaticamente: isRenovable ? autoRenew : false,

        // objetivos
        objetivo_reactivos_cantidad: enableReactivos
          ? values.objetivoReactivosCantidad
          : undefined,

      },
      instrumentos: selectedInstrumentos,
    };

    try {
      const response = await axiosInstance.post("/comodatos/", payload);
      if (response.status === 201) {
        message.success("Comodato creado exitosamente");
        navigate("/comodatos");
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

  const handleSelectClient = (rut: string) => {
    setClientId(parseInt(rut));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        title="Registrar Comodato"
        description="Aqui puedes crear un nuevo comodato"
        photo_path={comodato_photo}
      />

      <div className="flex items-center justify-end">
        {CambiarSeleccionButton}
      </div>
      <div className="p-6 max-w-4xl h-full mx-auto bg-white rounded-md">
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div>
              <div>
                <Form.Item
                  className="w-full"
                  label="Número de Comodato"
                  name="numero_comodato"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el número de comodato",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el número del comodato" />
                </Form.Item>
              </div>


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
                Representante del Cliente
              </label>
              <div className="grid grid-cols-2 gap-4 mt-4">
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
                  label="Rut"
                  name="rut_representante_cliente"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el rut del cliente",
                    },
                  ]}
                  getValueFromEvent={(e) => {
                    // cada vez que teclean, formatea el valor
                    const raw: string = e.target.value;
                    return formatRut(raw);
                  }}
                >
                  <Input placeholder="Ingrese el rut del cliente" />
                </Form.Item>
              </div>

              <Form.Item
                label="Direccion del cliente"
                name="sucursal"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese la direccion del cliente",
                  },
                ]}
              >
                <Input placeholder="Ingrese la direccion" />
              </Form.Item>

              <Divider />

              {/* Representante Alatheia */}
              <label className="font-semibold text-primary-700">
                Representante de Alatheia
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Representante de venta"
                  required
                  rules={[
                    {
                      validator: () =>
                        selectedRep
                          ? Promise.resolve()
                          : Promise.reject("Seleccione un representante"),
                    },
                  ]}
                >
                  <RepresentanteSelector
                    value={selectedRep?.codigo}
                    onChange={setSelectedRep}
                    placeholder="Seleccione un representante de venta"
                  />
                </Form.Item>

                <Form.Item
                  className="w-full"
                  label="Rut"
                  name="rut_representante_alatheia"
                  getValueFromEvent={(e) => {
                    // cada vez que teclean, formatea el valor
                    const raw: string = e.target.value;
                    return formatRut(raw);
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese el rut del representante",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el rut del representante" />
                </Form.Item>

                <Form.Item
                  label="Código de Bodega"
                  required
                  rules={[{ required: true, message: "Seleccione una bodega" }]}
                >
                  <BodegasSelector
                    value={selectedBodega}
                    onChange={setSelectedBodega}
                    placeholder="Seleccione una bodega"
                  />
                </Form.Item>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-2 gap-6">
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

              <Form.Item>
                <div className="flex flex-col gap-2">
                  <Checkbox
                    checked={plazoParaPago}
                    onChange={(e) => setPlazoParaPago(e.target.checked)}
                  >
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Plazo
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Marque si tiene plazos disponibles para pagar las
                        facturas
                      </p>
                    </div>
                  </Checkbox>
                  {plazoParaPago && (
                    <Form.Item
                      name="plazoPagoFacturas"
                      rules={[
                        {
                          required: true,
                          message:
                            "Por favor ingrese el plazo de días para pagar",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Ingrese la cantidad de días para pagar la factura despues de emitida"
                        className="w-full"
                      />
                    </Form.Item>
                  )}
                </div>
              </Form.Item>

              <Form.Item>
                <div className="flex flex-col gap-2">
                  <Checkbox
                    checked={enableGraceTime}
                    onChange={(e) => setEnableGraceTime(e.target.checked)}
                  >
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Tiempo de Gracia
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Marque si tiene Tiene tiempo de gracia
                      </p>
                    </div>
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
                          keyboard={false}
                          type="number"
                        />
                        <InputNumber
                          min={1}
                          className="w-full"
                          placeholder="Porcentaje de descuento"
                          suffix="%"
                          keyboard={false}
                          type="number"
                        />
                        </div>
                    </Form.Item>
                  )}
                </div>
              </Form.Item>

              <Form.Item>
                <div className="flex flex-col gap-6 ">
                  <Checkbox
                    checked={isRenovable}
                    onChange={handleIsRenovableChange}
                  >
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Renovación
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Marque si tiene plazos disponibles para pagar las
                        facturas
                      </p>
                    </div>
                  </Checkbox>
                  {isRenovable && (
                    <Checkbox
                      checked={autoRenew}
                      onChange={handleAutoRenewChange}
                      disabled={!isRenovable}
                    >
                      ¿Se renueva automáticamente?
                    </Checkbox>
                  )}
                </div>
              </Form.Item>

              <div className="flex flex-col">
                <Form.Item
                  label={
                    <label className="font-medium text-gray-900">
                      Objetivos
                    </label>
                  }
                >
                  {/* Reactivos Objective */}
                  <div className="flex flex-col gap-2 mb-4">
                    <Checkbox
                      checked={enableReactivos}
                      onChange={(e) => setEnableReactivos(e.target.checked)}
                    >
                      <span className="text-gray-500">
                        Objetivo de Reactivos (Cantidad)
                      </span>
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

                </Form.Item>
                {/* <Form.Item label="Agregar Instrumento" className="w-full">
                <InstrumentoSelector />
                </Form.Item> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col my-10">
            <InstrumentSelectorTable onChange={setSelectedInstrumentos} />
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

export default CrearDemo;
