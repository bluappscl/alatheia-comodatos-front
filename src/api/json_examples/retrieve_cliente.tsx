export const retrieve_cliente = [
  {
    id: 1,
    nombre: "Clinica Dávila",
    rut: "12345678-9",
    codigo_comuna: "001",
    direccion: "Calle Principal 123",
    created_at: "2023-01-01T12:00:00Z",
    updated_at: "2023-05-01T12:00:00Z",
    logo: "https://staticnew-prod.topdoctors.cl/provider/111400/image/profile/medium/clinica-davila-1664821372",
    comodatos: [
      {
        id: 1,
        contrato:
          "https://firebasestorage.googleapis.com/v0/b/okairum-v2.appspot.com/o/shared%2FComodato_Contrato.pdf?alt=media&token=25d6876a-2073-46b8-a8aa-0c09ee1a807e",
        compra_minima_mensual_dinero: 3300000,
        compra_minima_mensual_reactivo: 350,
        fecha_inicio: "2022-02-11",
        fecha_fin: "2023-02-10",
        estado: "Pendiente",
        nombre_cliente_representante: "Carlos Eduardo Garcés Garcés",
        rut_cliente_representante: "15.224.788-5",
        plazo_pago_facturas: 30,
        tiempo_de_gracia: 2,
        porcentaje_tiempo_de_gracia: 10,
        es_renovable: true,
        renovable_automatico: true,
        instrumentos: [
          {
            id: 1,
            codigo: "1845097-IVD",
            producto: "CFX dx ORM",
            marca: "BIORAD",
            numero_serie: "BR123456",
            cantidad: 2,
            moneda: "CLP",
            valor_neto: 23500000, // CLP
          },
          {
            id: 2,
            codigo: "088.M0501.00E",
            producto: "Maelstrom 4810",
            marca: "TANBEAD",
            numero_serie: "TB654321",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 6500000, // CLP
          },
        ],
        created_at: "2023-01-01T12:00:00Z",
        updated_at: "2023-06-01T12:00:00Z",
      },
      {
        id: 2,
        contrato:
          "https://firebasestorage.googleapis.com/v0/b/okairum-v2.appspot.com/o/shared%2FComodato_Contrato_2.pdf?alt=media&token=abcd1234-5678-90ef-ghij-klmnopqrstuv",
        compra_minima_mensual_dinero: 1500000, // 15,000,000 CLP
        compra_minima_mensual_reactivo: 280, // 18,000 unidades de reactivos
        fecha_inicio: "2023-02-01",
        fecha_fin: "2024-01-31",
        estado: "Vigente",
        nombre_cliente_representante: "León Eugene Kramarenko Squirrell",
        rut_cliente_representante: "18.638.954-9",
        plazo_pago_facturas: 45, // días
        tiempo_de_gracia: 1, // meses
        porcentaje_tiempo_de_gracia: 15, // %
        es_renovable: false,
        renovable_automatico: false,
        instrumentos: [
          {
            id: 3,
            codigo: "54321-08",
            producto: "Thermo Fisher QuantStudio 5",
            marca: "Thermo Fisher",
            numero_serie: "QS67890",
            cantidad: 1,
            moneda: "USD",
            valor_neto: 3200, // USD
          },
        ],
        created_at: "2023-03-01T12:00:00Z",
        updated_at: "2023-07-01T12:00:00Z",
      },
    ],
  },
  {
    id: 3,
    nombre: "Clinica Alemana",
    rut: "87654321-0",
    codigo_comuna: "002",
    direccion: "Avenida Secundaria 456",
    created_at: "2023-02-01T12:00:00Z",
    updated_at: "2023-06-01T12:00:00Z",
    logo: "",
    comodatos: [
      {
        id: 3,
        contrato:
          "https://firebasestorage.googleapis.com/v0/b/okairum-v2.appspot.com/o/shared%2FComodato_Contrato_3.pdf?alt=media&token=xyz98765-4321-0abc-defg-hijklmnopqrs",
        compra_minima_mensual_dinero: 1800000, // 18,000,000 CLP
        compra_minima_mensual_reactivo: 240, // 20,000 unidades de reactivos
        fecha_inicio: "2024-03-15",
        fecha_fin: "2025-03-14",
        estado: "Pendiente",
        nombre_cliente_representante: "María Fernanda López Pérez",
        rut_cliente_representante: "19.876.543-2",
        plazo_pago_facturas: 60, // días
        tiempo_de_gracia: 3, // meses
        porcentaje_tiempo_de_gracia: 20, // %
        es_renovable: true,
        renovable_automatico: false,
        instrumentos: [
          {
            id: 4,
            codigo: "67890-12",
            producto: "Beckman Coulter DxH 800",
            marca: "Beckman Coulter",
            numero_serie: "BC123789",
            cantidad: 3,
            moneda: "USD",
            valor_neto: 4500, // USD
          },
          {
            id: 5,
            codigo: "09876-54",
            producto: "Roche Cobas 8000",
            marca: "Roche",
            numero_serie: "RC456123",
            cantidad: 2,
            moneda: "USD",
            valor_neto: 5000, // USD
          },
        ],
        created_at: "2023-02-01T12:00:00Z",
        updated_at: "2023-06-01T12:00:00Z",
      },
    ],
  },
  {
    id: 4,
    nombre: "Laboratorio Clínico Bioclinic Ltda",
    rut: "76.698.223-9",
    codigo_comuna: "001",
    direccion: "Avenida Secundaria 456",
    created_at: "2023-02-01T12:00:00Z",
    updated_at: "2023-06-01T12:00:00Z",
    logo: "",
    comodatos: [
      {
        id: 4,
        contrato:
          "https://firebasestorage.googleapis.com/v0/b/okairum-v2.appspot.com/o/shared%2FBioclinic_Contrato_Amplificacion_y_Extraccion_CM_1.pdf?alt=media&token=4a6a2258-4c05-4490-9cdc-961f77188039",
        compra_minima_mensual_dinero: 3450000, // 3,450,000 CLP
        compra_minima_mensual_reactivo: 630, // 630 unidades de reactivos
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-03-04",
        estado: "Vigente",
        nombre_cliente_representante: "Carlos Eduardo Garcés Garcés",
        rut_cliente_representante: "15.224.788-5",
        plazo_pago_facturas: 30, // días
        tiempo_de_gracia: 2, // meses
        porcentaje_tiempo_de_gracia: 10, // %
        es_renovable: false,
        renovable_automatico: false,
        instrumentos: [
          {
            id: 1,
            codigo: "1845097-IVD",
            producto: "CFX dx ORM",
            marca: "BIORAD",
            numero_serie: "BR654321",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 23500000, // CLP
          },
          {
            id: 2,
            codigo: "1841000-IVD",
            producto: "C1000",
            marca: "BIORAD",
            numero_serie: "BI098765",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 6500000, // CLP
          },
          {
            id: 3,
            codigo: "088.M0501.00E",
            producto: "Maelstrom 4810",
            marca: "TANBEAD",
            numero_serie: "TB123456",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 37506000, // CLP
          },
        ],
        created_at: "2023-03-01T12:00:00Z",
        updated_at: "2023-07-01T12:00:00Z",
      },
      {
        id: 5,
        contrato:
          "https://firebasestorage.googleapis.com/v0/b/okairum-v2.appspot.com/o/shared%2FBioclinic_Contrato_Amplificacion_y_Extraccion_CM_2.pdf?alt=media&token=4a6a2258-4c05-4490-9cdc-961f77188039",
        compra_minima_mensual_dinero: 2300000, // 2,300,000 CLP
        compra_minima_mensual_reactivo: 370, // 370 unidades de reactivos
        fecha_inicio: "2024-01-01",
        fecha_fin: "2025-08-31", // Fecha corregida a un día válido
        estado: "Vigente",
        nombre_cliente_representante: "Carlos Eduardo Garcés Garcés",
        rut_cliente_representante: "15.224.788-5",
        plazo_pago_facturas: 30, // días
        tiempo_de_gracia: 2, // meses
        porcentaje_tiempo_de_gracia: 10, // %
        es_renovable: false,
        renovable_automatico: false,
        instrumentos: [
          {
            id: 1,
            codigo: "1845097-IVD",
            producto: "CFX dx ORM",
            marca: "BIORAD",
            numero_serie: "BR789012",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 23500000, // CLP
          },
          {
            id: 2,
            codigo: "1841000-IVD",
            producto: "C1000",
            marca: "BIORAD",
            numero_serie: "BI567890",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 6500000, // CLP
          },
          {
            id: 3,
            codigo: "088.M0501.00E",
            producto: "Maelstrom 4810",
            marca: "TANBEAD",
            numero_serie: "TB789012",
            cantidad: 1,
            moneda: "CLP",
            valor_neto: 37506000, // CLP
          },
        ],
        created_at: "2023-03-01T12:00:00Z",
        updated_at: "2023-07-01T12:00:00Z",
      },
    ],
  },
];
