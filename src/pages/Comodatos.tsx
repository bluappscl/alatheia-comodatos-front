import { Card, message } from "antd";
import { useEffect, useState } from "react";
import ComodatosTable from "../components/Contactos/ComodatosTable";
import { ComodatoInterface } from "../interfaces/Comodato";
import { comodatos_json } from "../api/json_examples/comodatos_json";
import HeaderDescripcion from "../components/shared/HeaderDescripcion";

import comodato_photo from "../media/temporal/comodato_photo.png";

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
      <HeaderDescripcion
        title="Comodatos"
        description="Aqui puedes ver tus los comodatos existentes"
        photo_path={comodato_photo}
      />
      {comodatos.length > 0 ? (
        <div className="md:col-span-12">
          <ComodatosTable comodatos={comodatos} />
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
};

export default ComodatosPage;
