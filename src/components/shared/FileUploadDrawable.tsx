import React, { useState } from "react";
import { Upload, message, Button, Typography } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

// interface FileUploaderProps {
//   onUploadSuccess: (url: string) => void; // Callback to return the uploaded file URL
// }

const FileUploadDrawable: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [uploading, setUploading] = useState(false);

  const handleFileChange = (info: any) => {
    const file = info.file;
    if (file) {
      setSelectedFile(file);
      message.success(`Archivo ${file.name} seleccionado.`);
    } else {
      message.error("Error al seleccionar el archivo.");
    }
  };

  // const handleConfirmUpload = async () => {
  //   if (!selectedFile) {
  //     message.error("No hay archivo seleccionado.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   try {
  //     setUploading(true);
  //     const response = await fetch("http://localhost:3001/upload/logo", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       message.success("Archivo subido exitosamente.");
  //       onUploadSuccess(result.url); // Return the uploaded file URL
  //       setSelectedFile(null); // Reset file selection
  //     } else {
  //       message.error("Error al subir el archivo.");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     message.error("Error al subir el archivo.");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    message.info("Archivo eliminado. Por favor, seleccione un nuevo archivo.");
  };

  return (
    <div className="p-4 bg-white">
      {selectedFile ? (
        <div className="flex flex-col items-center">
          <Typography.Text strong>Archivo seleccionado:</Typography.Text>
          <Typography.Text>{selectedFile.name}</Typography.Text>
          <div className="flex gap-4 mt-4">
            <Button danger icon={<DeleteOutlined />} onClick={handleRemoveFile}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false}
          onChange={handleFileChange}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>
            Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno.
          </p>
        </Upload.Dragger>
      )}
    </div>
  );
};

export default FileUploadDrawable;
