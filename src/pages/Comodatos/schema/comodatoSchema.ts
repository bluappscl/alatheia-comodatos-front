import * as Yup from "yup";

export const comodatoSchema = Yup.object({
  rut_cliente: Yup.string().required("⚠️ Debe seleccionar un cliente"),

  marca: Yup.mixed().required("⚠️ Debe seleccionar una marca"),
  instrumentos: Yup.array()
    .of(
      Yup.object({
        serie: Yup.string().required("⚠️ La serie del instrumento es obligatoria"),
        codigo: Yup.string().required("⚠️ El código del instrumento es requerido"),
        descripcion: Yup.string().required("⚠️ La descripción del instrumento es requerida"),
        bodega: Yup.string().required("⚠️ Debe seleccionar una bodega para el instrumento"),
        codigo_ubicacion: Yup.number()
          .required("⚠️ Debe seleccionar una ubicación para el instrumento")
          .min(1, "⚠️ Debe seleccionar una ubicación válida para el instrumento")
          .test('not-zero', '⚠️ Debe seleccionar una ubicación válida para el instrumento', value => value !== 0),
        valor_neto: Yup.number().min(0, "⚠️ El valor neto debe ser mayor o igual a 0").required("⚠️ El valor neto es requerido"),
        monto_objetivo: Yup.number().min(0, "⚠️ El monto objetivo debe ser mayor o igual a 0").required("⚠️ El monto objetivo es requerido"),
      })
    ),

  // Campos opcionales
  fechaFin: Yup.date().nullable(),
  observaciones: Yup.string(),
  es_demo: Yup.boolean(),
  plazo_para_pago: Yup.boolean(),
  es_renovable: Yup.boolean(),
  se_renueva_automaticamente: Yup.boolean(),
});
