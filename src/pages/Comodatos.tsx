import { Card, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ComodatosTable from "../components/Contactos/ComodatosTable";
import { ComodatoInterface } from "../interfaces/Comodato";
import { comodatos_json } from "../api/json_examples/comodatos_json";

const ComodatosPage = () => {
  const [comodatos, setComodatos] = useState<ComodatoInterface[]>([]);
  useEffect(() => {
    const fetchComodato = async () => {
      try {
        // const response = await axios.get(`http://localhost:3001/comodatos`);
        // setComodatos(response.data); // Pass data directly to the state
        setComodatos(comodatos_json);
      } catch (error) {
        console.error("Error fetching client data:", error);
        message.error("Error al cargar la información del cliente.");
      }
    };

    fetchComodato();
  }, []);

  return (
    <>
      {comodatos.length > 0 ? (
        <div className="md:col-span-12">
          <Card title="Comodatos Vigentes">
            <ComodatosTable comodatos={comodatos} /> {/* Pass array directly */}
          </Card>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
};


export default ComodatosPage;