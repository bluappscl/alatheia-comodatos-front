import { useParams } from "react-router-dom";
import HistorialFacturas from "./HistorialFacturas"
import ComodatosCliente from "./ComodatosCliente";
import { Divider } from "antd";


const ClienteDetalle = () => {

  const { rut } = useParams<{ rut: string }>();

  return (
    <div  >

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Información del Cliente</h1>
        <p className="text-gray-500">Detalle de comodatos y facturas del cliente</p>
      </div>
      <Divider />

  
      <div className="max-w-7xl mx-auto p-2">
        {rut && (
          <>
            <div>
              <ComodatosCliente rut={rut} />
            </div>
            <Divider />
            <div>
              <HistorialFacturas rut={rut} />

            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ClienteDetalle
