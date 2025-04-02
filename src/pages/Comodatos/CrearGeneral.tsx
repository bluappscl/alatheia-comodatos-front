import { Tabs } from "antd";
import CrearComodato from "./NuevoComodato";
import CrearDEMO from "./CrearDemo";

const { TabPane } = Tabs;

export const CrearGeneral = () => {
  return (
    <div className="p-4">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Crear Comodato" key="1">
          <CrearComodato />
        </TabPane>
        <TabPane tab="Crear DEMO" key="2">
          <CrearDEMO/>
        </TabPane>
      </Tabs>
    </div>
  );
};
