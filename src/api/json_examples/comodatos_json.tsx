export const comodatos_json =[
  {
    "id": 1,
    "contrato": "https://example.com/contract1.jpg",
    "compra_minima_mensual_dinero": 1000,
    "compra_minima_mensual_reactivo": 12000,
    "fecha_inicio": "2023-01-01",
    "fecha_fin": "2023-12-31",
    "estado": "Activo",
    "cliente_id": 1,
    "nombre_cliente_representante": "Cliente 1",
    "rut_cliente_representante": "11111111-1",
    "plazo_pago_facturas": 30,
    "tiempo_de_gracia": 2,
    "porcentaje_tiempo_de_gracia": 10,
    "es_renovable": true,
    "renovable_automatico": true,
    "instrumentos": [
      {
        "id": 3,
        "codigo": "54321-08",
        "producto": "Thermo Fisher QuantStudio 5",
        "numero_serie": "QS67890",
        "cantidad": 1,
        "moneda": "USD",
        "valor_neto": 3200
      }
    ],
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-06-01T12:00:00Z"
  },
  {
    "id": 2,
    "contrato": "https://example.com/contract2.jpg",
    "compra_minima_mensual_dinero": 1500,
    "compra_minima_mensual_reactivo": 18000,
    "fecha_inicio": "2023-02-01",
    "fecha_fin": "2023-12-31",
    "estado": "Activo",
    "cliente_id": 2,
    "nombre_cliente_representante": "Cliente 2",
    "rut_cliente_representante": "22222222-2",
    "plazo_pago_facturas": 45,
    "tiempo_de_gracia": 1,
    "porcentaje_tiempo_de_gracia": 15,
    "es_renovable": false,
    "renovable_automatico": false,
    "instrumentos": [
      {
        "id": 3,
        "codigo": "54321-08",
        "producto": "Thermo Fisher QuantStudio 5",
        "numero_serie": "QS67890",
        "cantidad": 1,
        "moneda": "USD",
        "valor_neto": 3200
      }
    ],
    "created_at": "2023-02-01T12:00:00Z",
    "updated_at": "2023-06-01T12:00:00Z"
  },
  {
    "id": 3,
    "contrato": "https://example.com/contract3.jpg",
    "compra_minima_mensual_dinero": 2000,
    "compra_minima_mensual_reactivo": 24000,
    "fecha_inicio": "2023-03-01",
    "fecha_fin": "2023-11-30",
    "estado": "Pendiente",
    "cliente_id": 3,
    "nombre_cliente_representante": "Cliente 3",
    "rut_cliente_representante": "33333333-3",
    "plazo_pago_facturas": 30,
    "tiempo_de_gracia": 3,
    "porcentaje_tiempo_de_gracia": 20,
    "es_renovable": true,
    "renovable_automatico": false,
    "instrumentos": [
      {
        "id": 3,
        "codigo": "54321-08",
        "producto": "Thermo Fisher QuantStudio 5",
        "numero_serie": "QS67890",
        "cantidad": 1,
        "moneda": "USD",
        "valor_neto": 3200
      }
    ],
    "created_at": "2023-03-01T12:00:00Z",
    "updated_at": "2023-07-01T12:00:00Z"
  }
]
