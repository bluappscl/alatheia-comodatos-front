import React, { useState } from "react";
import { Modal, Upload, message, Button, Typography } from "antd";
import { UploadOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";

interface UploadModalProps {
  open: boolean;
  onCancel: () => void;
  onUploadSuccess: () => void;
}

const InsumosExcelUpload: React.FC<UploadModalProps> = ({
  open,
  onCancel,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (info: any) => {
    console.log("aa ", info)
    const file = info.file;
    if (file) {
      setSelectedFile(file);
      message.success(`Archivo ${file.name} seleccionado. Confirme para subir.`);
    } else {
      message.error("Error al seleccionar el archivo. Por favor, intente de nuevo.");
    }
  };
  
  const handleConfirmUpload = async () => {
    if (!selectedFile) {
      message.error("No hay archivo seleccionado.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await fetch("http://localhost:3001/insumos/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        message.success("Archivo subido exitosamente.");
        onUploadSuccess();
        onCancel(); // Close modal after successful upload
        setSelectedFile(null); // Reset file selection
      } else {
        message.error(`Error al subir el archivo: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Error al subir el archivo.");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Clear selected file
    message.info("Archivo eliminado. Por favor, seleccione un nuevo archivo.");
  };

  return (
    <Modal
      title="Subir desde Excel"
      open={open}
      onCancel={() => {
        setSelectedFile(null);
        onCancel();
      }}
      footer={null}
    >
      {selectedFile ? (
        <div className="flex flex-col items-center">
          <Typography.Text strong>Archivo seleccionado:</Typography.Text>
          <Typography.Text>{selectedFile.name}</Typography.Text>
          <div className="flex gap-4 mt-4">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleConfirmUpload}
            >
              Confirmar Subida
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemoveFile}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleFileChange}
          showUploadList={false} // Hide the default file list
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno.</p>
        </Upload.Dragger>
      )}
    </Modal>
  );
};

export default InsumosExcelUpload;
