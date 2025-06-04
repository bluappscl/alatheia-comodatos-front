/* --------------------------------------------------------------------------
   src/forms/ComodatoForm.tsx
   Formulario completo (crear / editar) con Formik + Yup
--------------------------------------------------------------------------- */

import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Typography,
  Upload,
  UploadProps,
  Card,
} from "antd";
import { Formik, Form as FormikForm, Field } from "formik";
import { useState } from "react";
import dayjs from "dayjs";
import {
  BankOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  AimOutlined,
  TagOutlined,
  ToolOutlined,
  ExperimentOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UploadOutlined,
  FileOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import axiosInstance from "../../../api/axiosInstance";
import { ComodatoPayload } from "../interfaces/comodato";
import MarcasSelector from "../../../components/MarcasSelector";
import ClientSelectionModal from "../../../components/NuevoComodato/ClienteSelector";
import InstrumentSelectorTable, {
  SelectedInstrumento,
} from "../../../components/Instrumentos/InstrumentSelectorTable";
import RepresentanteSelector, {
  Representante,
} from "../../../components/RepresentantesSelect";
import { comodatoSchema } from "../schema/comodatoSchema";

const { Title, Text } = Typography;

/* -------------------------------------------------------------------------- */
/*                               initial values                               */
/* -------------------------------------------------------------------------- */
function buildInitialValues() {
  return {
    /* Cabecera */
    numero_comodato: "",
    rut_cliente: "",
     marca: "",

    /* Información del cliente (para modo edición) */
    clienteInfo: null as {
      rut: string;
      nombre: string;
      direccion: string;
      codigo_comuna: string;
      nombre_comuna?: string;
    } | null,

    /* Representantes */
    nombre_representante_cliente: "",
    rut_representante_cliente: "",
    nombre_representante_alatheia: "",
    rut_representante_alatheia: "",
    direccion_cliente: "",
    representante_de_venta: "",

    /* Fechas */
    fechaInicio: dayjs().toDate(),
    fechaFin: null as Date | null,

    /* Plazos */
    plazo_para_pago: false,
    plazo_pago_facturas: undefined as number | undefined,

    /* Tiempo de gracia (sin checkbox, siempre visible) */
    tiempoDeGracia: [0, 0] as [number, number],

    /* Renovación */
    es_renovable: false,
    se_renueva_automaticamente: false,

    /* Objetivos */
    objetivo_reactivos_check: false,
    objetivoReactivosCantidad: undefined as number | undefined,

    objetivo_dinero_check: false,
    objetivoDineroCantidad: undefined as number | undefined,

    es_demo: false,

    /* Instrumentos */
    instrumentos: [] as SelectedInstrumento[],

    /* Representante objeto */
    representanteSeleccionado: { codigo: "", nombre: "" } as Representante,

    /* Observaciones */
    observaciones: "",

    /* Contrato */
    contratoFile: null as File | null,
    contratoExistente: null as { id: number; nombre_archivo: string; archivo: string } | null,
  };
}

/* -------------------------------------------------------------------------- */
/*                         convierte a payload de API                         */
/* -------------------------------------------------------------------------- */
function mapValuesToPayload(
  values: ReturnType<typeof buildInitialValues>
): ComodatoPayload {
  // Debug para ver los valores antes de mapear
  console.log("Values antes de mapear:", values);
  console.log("plazo_para_pago:", values.plazo_para_pago);
  console.log("plazo_pago_facturas:", values.plazo_pago_facturas);
  
  return {
    comodato: {
      fecha_inicio: values.fechaInicio ? dayjs(values.fechaInicio).format("YYYY-MM-DD") : undefined,
      fecha_fin: values.fechaFin ? dayjs(values.fechaFin).format("YYYY-MM-DD") : undefined,
      marca: values.marca,
      rut_cliente: values.rut_cliente,
      direccion_cliente: values.direccion_cliente || undefined,
      rut_representante_cliente: values.rut_representante_cliente || undefined,
      nombre_representante_cliente: values.nombre_representante_cliente || undefined,
      rut_representante_alatheia: values.rut_representante_alatheia || undefined,
      nombre_representante_alatheia: values.nombre_representante_alatheia || undefined,
      codigo_representante: values.representanteSeleccionado?.codigo || undefined,
      // Corregir el manejo de dias_plazo - enviar el valor numérico directamente
      dias_plazo: values.plazo_para_pago && values.plazo_pago_facturas ? values.plazo_pago_facturas : undefined,
      // Corregir el manejo de meses_gracia y porcentaje_descuento
      meses_gracia: values.tiempoDeGracia[0] > 0 ? values.tiempoDeGracia[0] : undefined,
      porcentaje_descuento: values.tiempoDeGracia[1] > 0 ? String(values.tiempoDeGracia[1]) : undefined,
      // Enviar los valores boolean siempre, no solo cuando son true
      es_renovable: values.es_renovable,
      es_automatica: values.es_renovable ? values.se_renueva_automaticamente : false,
      // Corregir la lógica de objetivos
      objetivo_cantidad: values.objetivoReactivosCantidad || undefined,
      objetivo_monto: values.objetivoDineroCantidad || undefined,
      observacion: values.observaciones || undefined,
      es_demo: values.es_demo,
    },
    instrumentos: values.instrumentos.map((i) => ({
      id: i.id || undefined, // Para instrumentos existentes
      codigo: i.codigo,
      descripcion: i.descripcion,
      adn: i.adn,
      marca: i.marca,
      serie: i.serie || undefined,
      objetivo_monto: i.monto_objetivo || undefined,
      codigo_bodega: i.bodega || undefined, // Mapear bodega a codigo_bodega
      codigo_ubicacion: i.codigo_ubicacion || undefined,
      valor_neto: String(i.valor_neto || 0), // Convertir a string
      moneda: i.moneda || undefined,
    })),
  };
}

/* -------------------------------------------------------------------------- */
/*                               Form component                               */
/* -------------------------------------------------------------------------- */
interface Props {
  initialValues?: Partial<ReturnType<typeof buildInitialValues>>;
  onCompleted: () => void;
  isEditing?: boolean; // Nuevo prop para indicar si es edición
}

const ComodatoForm: React.FC<Props> = ({ initialValues, onCompleted, isEditing = false }) => {
  const mergedInitials = { ...buildInitialValues(), ...initialValues };
  const [loadingStage, setLoadingStage] = useState<"comodato" | "contrato" | null>(null);
  
  // En modo edición, usar la información del cliente que viene en initialValues
  const clienteInfo = isEditing && mergedInitials.clienteInfo ? mergedInitials.clienteInfo : null;

  // Función para descargar contrato actualizada
  const handleDownloadContract = async (contratoExistente: { id: number; nombre_archivo: string; archivo: string } | null) => {
    if (!contratoExistente?.archivo) return;
    
    try {
      // Si el archivo ya es una URL (como en S3), usarla directamente
      if (contratoExistente.archivo.startsWith('http')) {
        const link = document.createElement('a');
        link.href = contratoExistente.archivo;
        link.download = contratoExistente.nombre_archivo || 'contrato';
        link.target = '_blank'; // Abrir en nueva pestaña como respaldo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        message.success('Descarga iniciada');
      } else {
        // Fallback: usar el endpoint de descarga si no es una URL directa
        const response = await axiosInstance.get(`/comodatos/bodega/${contratoExistente.id}`, {
          responseType: 'blob',
        });
        
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = contratoExistente.nombre_archivo || 'contrato';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        message.success('Contrato descargado exitosamente');
      }
    } catch (error) {
      console.error('Error downloading contract:', error);
      message.error('Error al descargar el contrato');
    }
  };

  return (
    <Formik
      initialValues={mergedInitials}
      validationSchema={comodatoSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          setLoadingStage("comodato");
          
          // Debug para ver los valores en el submit
          console.log("Values en submit:", values);
          console.log("objetivoReactivosCantidad:", values.objetivoReactivosCantidad);
          console.log("objetivoDineroCantidad:", values.objetivoDineroCantidad);
          
          const payload = mapValuesToPayload(values);
          
          // Debug para ver el payload final
          console.log("Payload final:", payload);
          
          let comodatoId: number;
          
          if (isEditing) {
            // Modo edición: PUT al comodato existente
            const { status } = await axiosInstance.put(`/comodatos/${values.numero_comodato}/`, payload);
            if (status !== 200) throw new Error();
            comodatoId = Number(values.numero_comodato);
            message.success("Comodato actualizado");
          } else {
            // Modo creación: POST nuevo comodato
            const { status, data } = await axiosInstance.post("/comodatos/", payload);
            if (status !== 201) throw new Error();
            comodatoId = data.id_comodato;
            message.success("Comodato guardado");
          }

          // Subir contrato si hay archivo (tanto en creación como edición)
          if (values.contratoFile) {
            setLoadingStage("contrato");
            const formData = new FormData();
            formData.append("comodato", comodatoId.toString());
            formData.append("nombre_archivo", `contrato_${dayjs().format("YYYYMMDD_HHmmss")}`);
            formData.append("archivo", values.contratoFile);

            if (isEditing && values.contratoExistente) {
              // En edición, reemplazar contrato existente
              await axiosInstance.put(`/comodatos/contratos/${values.contratoExistente.id}/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              message.success("Contrato actualizado exitosamente");
            } else {
              // Nuevo contrato
              await axiosInstance.post("/comodatos/contratos/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              message.success("Contrato subido exitosamente");
            }
          }

          onCompleted();
        } catch (error) {
          console.error("Error submitting form:", error);
          message.error(
            loadingStage === "comodato"
              ? isEditing ? "Error al actualizar el comodato" : "Error al guardar el comodato"
              : "Error al subir el contrato"
          );
          setStatus({ submitError: true });
        } finally {
          setLoadingStage(null);
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => {
        const uploadProps: UploadProps = {
          beforeUpload: (file) => {
            setFieldValue("contratoFile", file);
            return false; // Prevent auto upload
          },
          onRemove: () => {
            setFieldValue("contratoFile", null);
          },
          maxCount: 1,
          accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
        };

        // Agregar log para debug
        console.log("Form Errors:", errors);
        console.log("Form Values:", values);
        console.log("Form Touched:", touched);

        // Debug logs para verificar los valores
        console.log("isEditing:", isEditing);
        console.log("contratoExistente:", values.contratoExistente);

        return (
          <FormikForm className="space-y-8">
            {/* ------------------------------------------------------------------ */}
            {/* Cliente y marca                                                    */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="flex items-center gap-2 mb-4">
                <BankOutlined /> Cliente y marca
              </Title>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                <Form.Item
                  validateStatus={
                    touched.rut_cliente && errors.rut_cliente ? "error" : ""
                  }
                  help={touched.rut_cliente && errors.rut_cliente}
                >
                  {isEditing ? (
                    // Mostrar información del cliente de forma estática en modo edición
                    <div>
                      <Text strong className="block mb-2">Cliente (no editable)</Text>
                      {clienteInfo ? (
                        <Card className="bg-gray-50">
                          <Typography.Title level={5}>
                            {clienteInfo.nombre}
                          </Typography.Title>
                          <Typography.Text>RUT: {clienteInfo.rut}</Typography.Text>
                          <br />
                          <Typography.Text>
                            Cód. Comuna: {clienteInfo.codigo_comuna}
                          </Typography.Text>
                          <br />
                          <Typography.Text>
                            Dirección: {clienteInfo.direccion}
                          </Typography.Text>
                        </Card>
                      ) : (
                        <Card className="bg-gray-50">
                          <Typography.Text>
                            Cargando información del cliente...
                          </Typography.Text>
                        </Card>
                      )}
                    </div>
                  ) : (
                    // Modo creación: mostrar el modal de selección
                    <ClientSelectionModal
                      onSelectClient={(rut) => setFieldValue("rut_cliente", rut)}
                      selectedRut={values.rut_cliente}
                    />
                  )}
                </Form.Item><Form.Item
                  validateStatus={touched.marca && errors.marca ? "error" : ""}
                  help={touched.marca && (errors.marca as string)}
                >
                {isEditing ? (
                  <Input
                    value={values.marca}
                    disabled
                    placeholder="Marca (no editable)"
                    style={{ backgroundColor: '#f5f5f5', color: '#999' }}
                  />
                ) : (
                  <MarcasSelector
                    value={values.marca}
                    onChange={(m) => setFieldValue("marca", m)}
                  />
                )}
                </Form.Item>
              </div>
            </section>

            <Divider />

            {/* ------------------------------------------------------------------ */}
            {/* Representantes                                                     */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="flex items-center gap-2 mb-4">
                <UserOutlined /> Representantes
              </Title>

              {/* Representante Alatheia (selector) */}
              <Form.Item>
                <Text strong>Representante Alatheia</Text>
                <RepresentanteSelector
                   value={values.representanteSeleccionado.codigo}
                  onChange={(rep) => {
                    setFieldValue("representanteSeleccionado", rep);
                  }}
                />
              </Form.Item>

              <Divider />

              {/* Datos representantes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Text strong className="col-span-2">
                  Representante del cliente
                </Text>
                <Field
                  name="nombre_representante_cliente"
                  as={Input}
                  placeholder="Nombre representante cliente"
                />
                <Field
                  name="rut_representante_cliente"
                  as={Input}
                  placeholder="RUT representante cliente"
                />

                <Text strong className="col-span-2">
                  Representante Alatheia (manual)
                </Text>
                <Field
                  name="nombre_representante_alatheia"
                  as={Input}
                  placeholder="Nombre representante Alatheia"
                />
                <Field
                  name="rut_representante_alatheia"
                  as={Input}
                  placeholder="RUT representante Alatheia"
                />

                <Text strong className="col-span-2">
                  Dirección cliente
                </Text>
                <Field
                  name="direccion_cliente"
                  as={Input}
                  placeholder="Dirección cliente"
                  className="col-span-2"
                />
              </div>
            </section>

            <Divider />

            {/* ------------------------------------------------------------------ */}
            {/* Fechas                                                             */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="flex items-center gap-2 mb-4">
                <CalendarOutlined /> Fechas del comodato
              </Title>

              <div className="grid grid-cols-2 gap-6">
                <Form.Item label="Inicio">
                  <DatePicker
                    value={dayjs(values.fechaInicio)}
                    onChange={(date) =>
                      setFieldValue("fechaInicio", date?.toDate())
                    }
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item label="Fin">
                  <DatePicker
                    value={values.fechaFin ? dayjs(values.fechaFin) : null}
                    onChange={(date) =>
                      setFieldValue("fechaFin", date?.toDate())
                    }
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Configuración (plazos / gracia / renovación / demo)                */}
            {/* ------------------------------------------------------------------ */}
            <section className="space-y-6">
              <Title level={4} className="flex items-center gap-2 mb-4">
                <ToolOutlined /> Configuración
              </Title>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plazos */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Title level={5} className="flex items-center gap-2 !mb-4">
                    <ClockCircleOutlined /> Plazo para pago de facturas
                  </Title>
                  <Checkbox
                    checked={values.plazo_para_pago}
                    onChange={(e) =>
                      setFieldValue("plazo_para_pago", e.target.checked)
                    }
                  >
                    Activar plazo
                  </Checkbox>
                  {values.plazo_para_pago && (
                    <InputNumber
                      min={1}
                      value={values.plazo_pago_facturas}
                      placeholder="Días"
                      className="w-full"
                      onChange={(v) => setFieldValue("plazo_pago_facturas", v)}
                    />
                  )}
                </div>

                {/* Tiempo de gracia */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Title level={5} className="flex items-center gap-2 !mb-4">
                    <TagOutlined /> Tiempo de gracia
                  </Title>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <small>Meses</small>
                      <InputNumber
                        className="w-full mt-1"
                        min={1}
                        value={values.tiempoDeGracia[0]}
                        onChange={(v) =>
                          setFieldValue("tiempoDeGracia", [
                            v,
                            values.tiempoDeGracia[1],
                          ])
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <small>Porcentaje</small>
                      <InputNumber
                        className="w-full mt-1"
                        min={1}
                        max={100}
                        value={values.tiempoDeGracia[1]}
                        onChange={(v) =>
                          setFieldValue("tiempoDeGracia", [
                            values.tiempoDeGracia[0],
                            v,
                          ])
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Renovación */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Title level={5} className="flex items-center gap-2 !mb-4">
                    <AimOutlined /> Renovación
                  </Title>
                  <Checkbox
                    checked={values.es_renovable}
                    onChange={(e) =>
                      setFieldValue("es_renovable", e.target.checked)
                    }
                  >
                    Renovable
                  </Checkbox>

                  {values.es_renovable && (
                    <Checkbox
                      className="ml-6"
                      checked={values.se_renueva_automaticamente}
                      onChange={(e) =>
                        setFieldValue(
                          "se_renueva_automaticamente",
                          e.target.checked
                        )
                      }
                    >
                      Se renueva automáticamente
                    </Checkbox>
                  )}
                </div>

                {/* Demo */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Title level={5} className="flex items-center gap-2 !mb-4">
                    <ExperimentOutlined /> Tipo
                  </Title>
                  <Checkbox
                    checked={values.es_demo}
                    onChange={(e) => setFieldValue("es_demo", e.target.checked)}
                  >
                    Es demo
                  </Checkbox>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Objetivos                                                          */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="flex items-center gap-2 mb-4">
                <DollarOutlined /> Objetivos
              </Title>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reactivos */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Title level={5} className="flex items-center gap-2 !mb-4">
                    <ShoppingOutlined /> Reactivos (cantidad)
                  </Title>

                  <InputNumber
                    min={0}
                    value={values.objetivoReactivosCantidad}
                    placeholder="Cantidad de reactivos"
                    className="w-full"
                    onChange={(v) => setFieldValue("objetivoReactivosCantidad", v)}
                  />
                </div>

                {/* Dinero */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Title level={5} className="flex items-center gap-2 !mb-4">
                    <DollarOutlined /> Dinero
                  </Title>
                  <InputNumber
                    min={0}
                    value={values.objetivoDineroCantidad}
                    placeholder="Monto objetivo"
                    className="w-full"
                    onChange={(v) => setFieldValue("objetivoDineroCantidad", v)}
                  />
                </div>
              </div>
            </section>

            <Divider />

            {/* ------------------------------------------------------------------ */}
            {/* Instrumentos                                                       */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="flex items-center gap-2 mb-4">
                <ToolOutlined /> Instrumentos
              </Title>

              <InstrumentSelectorTable
                selectedMarca={values.marca}  
                defaultInstruments={values.instrumentos}
                onChange={(insts) => setFieldValue("instrumentos", insts)}
                isEditing={isEditing} // Pasar el prop de edición
              />
            </section>

            <Divider />

            {/* ------------------------------------------------------------------ */}
            {/* Observaciones                                                      */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="mb-2">
                Observaciones
              </Title>
              <Field name="observaciones" as={Input.TextArea} rows={3} />
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Contrato                                                           */}
            {/* ------------------------------------------------------------------ */}
            <section>
              <Title level={4} className="flex items-center gap-2 mb-4">
                <FileOutlined /> Contrato
              </Title>

              {/* Mostrar contrato existente si hay */}
              {values.contratoExistente && (
                <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Text strong>Contrato actual: </Text>
                      <Text>{values.contratoExistente.nombre_archivo}</Text>
                    </div>
                    <div className="flex gap-2">
                      {/* Botón para abrir en nueva pestaña */}
                      <Button 
                        type="link"
                        icon={<FileOutlined />}
                        onClick={() => {
                          if (values.contratoExistente?.archivo) {
                            window.open(values.contratoExistente.archivo, '_blank');
                          }
                        }}
                      >
                        Abrir
                      </Button>
                      {/* Botón para descargar */}
                      <Button 
                        type="link"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownloadContract(values.contratoExistente)}
                      >
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                  {values.contratoExistente ? "Cambiar contrato" : "Subir contrato"}
                </Button>
              </Upload>
              
              {values.contratoFile && (
                <div className="mt-2">
                  <Text type="secondary">
                    {values.contratoExistente ? "Nuevo archivo seleccionado: " : "Archivo seleccionado: "}
                    {values.contratoFile.name}
                  </Text>
                </div>
              )}
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Enviar                                                             */}
            {/* ------------------------------------------------------------------ */}
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting || loadingStage !== null}
              block
              size="large"
            >
              {loadingStage === "comodato" ? 
                (isEditing ? "Actualizando comodato..." : "Guardando comodato...") : 
               loadingStage === "contrato" ? "Subiendo contrato..." : 
               (isEditing ? "Actualizar Comodato" : "Guardar Comodato")}
            </Button>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default ComodatoForm;
