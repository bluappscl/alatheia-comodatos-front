import * as Yup from "yup";

export const comodatoSchema = Yup.object({
  rut_cliente: Yup.string().required("Seleccione un cliente"),

  marca: Yup.mixed().required("Seleccione una marca"),

  fechaInicio: Yup.date().required("Fecha de inicio requerida"),

  instrumentos: Yup.array().min(1, "Debes añadir al menos un instrumento"),

  // Campos opcionales
  fechaFin: Yup.date().nullable(),
  observaciones: Yup.string(),
  es_demo: Yup.boolean(),
  plazo_para_pago: Yup.boolean(),
  es_renovable: Yup.boolean(),
  se_renueva_automaticamente: Yup.boolean(),
});
