import { Modal, Button, Space } from "antd";
import CrearComodato from "./NuevoComodato";
import CrearDEMO from "./CrearDemo";
import { useState } from "react";

export const CrearGeneral = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelection = (type: string) => {
    setSelectedType(type);
    setIsModalVisible(false);
  };

  const resetSelection = () => {
    setSelectedType(null);
    setIsModalVisible(true);
  };

  const ChangeSelectionButton = (
    <Button className="mb-4" onClick={resetSelection}>
      Cambiar selección
    </Button>
  );

  return (
    <div className="p-4">
      <Modal
        title="¿Qué deseas registrar?"
        visible={isModalVisible}
        footer={null}
        closable={false}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block onClick={() => handleSelection("comodato")}>
            Registrar Comodato
          </Button>
          <Button type="primary" block onClick={() => handleSelection("demo")}>
            Registrar Demo
          </Button>
        </Space>
      </Modal>

      {selectedType && (
        <div>
          {selectedType === "comodato" ? <CrearComodato CambiarSeleccionButton={ChangeSelectionButton} /> : <CrearDEMO CambiarSeleccionButton={ChangeSelectionButton} />}
        </div>
      )}
    </div>
  );
};
