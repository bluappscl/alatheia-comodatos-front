import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
import InstrumentosTable from "../components/Instrumentos/InstrumentosTable";
import { InstrumentoInterface } from "../interfaces/InstrumentoInterface";
import BannerPage from "../components/shared/BannerPage";
import comodato_photo from "../assets/comodato_photo.png";
import { comodatos_id_json } from "../api/json_examples/comodatos_id_json";

interface ComodatoData {
  id: number;
  contrato: string;
  compra_minima_mensual_dinero: number;
  compra_minima_mensual_reactivo: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  cliente_id: number;
  nombre_cliente_representante: string;
  rut_cliente_representante: string;
  plazo_pago_facturas: number;
  tiempo_de_gracia: number;
  porcentaje_tiempo_de_gracia: number;
  es_renovable: boolean;
  renovable_automatico: boolean;
  instrumentos: InstrumentoInterface[];
  created_at: string;
  updated_at: string;
}

const ComodatoDetalle: React.FC = () => {
  const { id } = useParams();
  const [comodatoData, setComodatoData] = useState<ComodatoData | null>(null);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    const fetchComodato = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3001/comodatos/${id}`
        // );
        // setComodatoData(response.data);
        setComodatoData(comodatos_id_json);
      } catch (error) {
        console.error("Error fetching comodato details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComodato();
  }, [id]);

  if (!comodatoData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BannerPage
        photo_path={comodato_photo}
        title="Comodato - XXD663D"
        rounded={false}
      />
      <div className="p-6 w-full h-full mx-auto bg-white rounded-md">
        <div
          className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full bg-green-500`}
        >
          {comodatoData.estado}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="flex flex-row gap-4 mb-4">
              <div className="w-full">
                <label className="font-semibold">Fecha Inicio</label>
                <Input value={comodatoData.fecha_inicio} readOnly />
              </div>
              <div className="w-full">
                <label className="font-semibold">Fecha Fin</label>
                <Input value={comodatoData.fecha_fin} readOnly />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-semibold">Representante</label>
              <Input
                value={comodatoData.nombre_cliente_representante}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">RUT Representante</label>
              <Input value={comodatoData.rut_cliente_representante} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Plazo de Pago (días)</label>
              <Input
                value={comodatoData.plazo_pago_facturas.toString()}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Tiempo de Gracia (meses)</label>
              <Input
                value={comodatoData.tiempo_de_gracia.toString()}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Porcentaje Tiempo de Gracia
              </label>
              <Input
                value={`${comodatoData.porcentaje_tiempo_de_gracia}%`}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Es Renovable</label>
              <Input value={comodatoData.es_renovable ? "Sí" : "No"} readOnly />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Renovación Automática</label>
              <Input
                value={comodatoData.renovable_automatico ? "Sí" : "No"}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Compra Mínima Mensual (Dinero)
              </label>
              <Input
                value={`$${comodatoData.compra_minima_mensual_dinero.toLocaleString()}`}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Compra Mínima Mensual (Reactivos)
              </label>
              <Input
                value={comodatoData.compra_minima_mensual_reactivo.toLocaleString()}
                readOnly
              />
            </div>
          </div>
          <div>
            <div className="border-2 border-blue-50 rounded-lg bg-blue-50">
              <div className="flex flex-row p-4">
                <div className="text-lg font-semibold">Contrato</div>
                <div className="ml-auto">
                  <Button type="primary" size="large">
                    Descargar
                  </Button>
                </div>
              </div>
              <iframe
                src={comodatoData.contrato}
                className="w-full h-[600px] border rounded-md"
                title="Contrato PDF"
              />
            </div>
          </div>
        </div>
        <hr className="my-6 border-2"/>
        <div className="flex-col w-full">
          <h2 className="text-lg font-semibold mt-6">
            Instrumentos en comodato
          </h2>
          <InstrumentosTable
            data={comodatoData.instrumentos}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ComodatoDetalle;
