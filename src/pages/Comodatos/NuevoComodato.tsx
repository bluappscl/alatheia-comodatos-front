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
// import BodegasSelector from "../../components/BodegasSelect";
import MarcasSelector from "../../components/MarcasSelector";
import { useNavigate } from "react-router-dom";
import { format as formatRut, validate } from "rut.js";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const CrearComodato: React.FC<{ CambiarSeleccionButton?: React.ReactNode }> = ({
  CambiarSeleccionButton,
}) => {
  const navigate = useNavigate();

  const [isRenovable, setIsRenovable] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [clientId, setClientId] = useState("");
  const [enableReactivos, setEnableReactivos] = useState(false);
  const [enableDinero, setEnableDinero] = useState(false);
  const [enableGraceTime, setEnableGraceTime] = useState(false);
  const [plazoParaPago, setPlazoParaPago] = useState(false);
  const [selectedRep, setSelectedRep] = useState<Representante | null>(null);
  const [selectedMarca, setSelectedMarca] = useState<any>(null);

  console.log('selectedMarca en padre', selectedMarca)

  // Estados de carga por etapa
  const [loadingStage, setLoadingStage] = useState<
    "comodato" | "contrato" | null
  >(null);

  // Archivo de contrato
  const [contractFile, setContractFile] = useState<File | null>(null);

  const [selectedInstrumentos, setSelectedInstrumentos] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    // 1. POST comodato
    setLoadingStage("comodato");
    try {
      // Reemplazar codigo_ubicacion vacío por "no se sabe"
      const instrumentosProcesados = selectedInstrumentos.map((inst) => ({
        ...inst,
        codigo_ubicacion:
          !inst.codigo_ubicacion || inst.codigo_ubicacion.trim() === ""
        ? "no se sabe"
        : inst.codigo_ubicacion,
      }));

      const payload = {
        comodato: {
          numero_comodato: values.numero_comodato,
          rut_cliente: clientId,
          nombre_representante_cliente: values.nombre_representante_cliente,
          rut_representante_cliente: values.rut_representante_cliente,
          rut_representante_alatheia: values.rut_representante_alatheia,
          codigo_representante: selectedRep!.codigo,
          nombre_representante_alatheia: values.nombre_representante_alatheia,
          direccion_cliente: values.sucursal,
          representante_de_venta: values.representante_de_venta,
          marca: selectedMarca,
          observaciones: values.observaciones,
          es_demo: false,
          fecha_inicio: values.fechaInicio.format("YYYY-MM-DD"),
          fecha_fin: values.fechaFin
        ? values.fechaFin.format("YYYY-MM-DD")
        : undefined,
          plazo_para_pago: plazoParaPago,
          plazo_pago_facturas: plazoParaPago
        ? values.plazoPagoFacturas
        : undefined,
          tiempo_de_gracia: enableGraceTime
        ? {
            meses: values.tiempoDeGracia[0],
            porcentaje: values.tiempoDeGracia[1],
          }
        : undefined,
          es_renovable: isRenovable,
          se_renueva_automaticamente: isRenovable ? autoRenew : false,
          objetivo_reactivos_cantidad: enableReactivos
        ? values.objetivoReactivosCantidad
        : undefined,
          objetivo_dinero_cantidad: enableDinero
        ? values.objetivoDineroCantidad
        : undefined,
        },
        instrumentos: instrumentosProcesados,
      };

      const response = await axiosInstance.post("/comodatos/", payload);
      if (response.status !== 201) {
        throw new Error("Status code != 201");
      }
      const createdId = response.data.id_comodato;
      message.success("Comodato creado exitosamente");

      // 2. POST contrato (si hay archivo)
      setLoadingStage("contrato");
      if (contractFile) {
        const formData = new FormData();
        formData.append("comodato", createdId.toString());
        // nombre único con fecha y hora
        const timestamp = dayjs().format("YYYYMMDD_HHmmss");
        formData.append("nombre_archivo", `contrato_${timestamp}`);
        formData.append("archivo", contractFile);

        await axiosInstance.post("/comodatos/contratos/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Contrato subido exitosamente");
      } else {
        message.info(
          "No se seleccionó ningún contrato, se omitió la subida de archivo."
        );
      }

      // 3. Navegar al listado
      navigate("/comodatos");
    } catch (error) {
      console.error(error);
      message.error(
        loadingStage === "comodato"
          ? "Error al crear el comodato"
          : "Error al subir el contrato"
      );
    } finally {
      setLoadingStage(null);
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
    console.log("Selected client:", rut);
    setClientId(rut);
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
      <div className="p-6 max-w-5xl h-full mx-auto bg-white rounded-md">
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div>
    

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

              <Form.Item
                label="Marca"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione una marca",
                  },
                ]}
              >
                <MarcasSelector
                  value={selectedMarca?.id}
                  onChange={setSelectedMarca}
                  placeholder="Seleccione una marca"
                />
              </Form.Item>

              <Divider></Divider>
              <Form.Item
                label="Código de Representante Alatheia - (opcional)"
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

              <Divider />

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
                      message: "Por favor ingrese el rut del cliente",
                    },
                    {
                      validator: (_, value) =>
                        value && !validate(value)
                          ? Promise.reject("RUT inválido")
                          : Promise.resolve(),
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
                  label="Nombre del representante"
                  name="nombre_representante_alatheia"
                  rules={[
                    {
                      message:
                        "Porfavor ingrese el nombre representante alatheia",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el nombre" />
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
                      message: "Ingrese el rut del representante",
                    },
                    {
                      validator: (_, value) =>
                        value && !validate(value)
                          ? Promise.reject("RUT inválido")
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <Input placeholder="Ingrese el rut del representante" />
                </Form.Item>



                {/* AQUÍ LA SUBIDA DE ARCHIVO DEL CONTRATRO */}

                <Form.Item label="Contrato (archivo)">
                  <input
                    type="file"
                    accept="*"
                    onChange={(e) =>
                      setContractFile(e.target.files?.[0] || null)
                    }
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

              <Form.Item label="Fecha de Fin" name="fechaFin">
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
                  <div className="flex flex-col gap-2">
                    <Checkbox
                      checked={enableDinero}
                      onChange={(e) => setEnableDinero(e.target.checked)}
                    >
                      <span className="text-gray-500">Objetivo de Dinero</span>
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
                          {/* <div className="w-28">
                            <Select placeholder="Moneda" className="w-full">
                              <Select.Option value="CLP">CLP</Select.Option>
                              <Select.Option value="UF">UF</Select.Option>
                            </Select>
                          </div> */}
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

          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Observaciones</span>
            <Form.Item
              name="observaciones"
              rules={[
                {
                  required: true,
                  message: "Ingrese la observación",
                },
              ]}
            >
              <TextArea
                className="w-full"
                placeholder="Ingrese la observación"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col my-10">
            <InstrumentSelectorTable onChange={setSelectedInstrumentos} />
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Crear Comodato
            </Button>
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
};

export default CrearComodato;
