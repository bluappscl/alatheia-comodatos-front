import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  InputNumber,
  Select,
  Divider,
} from "antd";
import ClientSelectionModal from "../../components/NuevoComodato/ClienteSelector";
import FileUploadDrawable from "../../components/shared/FileUploadDrawable";
import InstrumentSelectorTable from "../../components/Instrumentos/InstrumentSelectorTable";
import HeaderDescripcion from "../../components/shared/HeaderDescripcion";
import comodato_photo from "../../media/temporal/comodato_photo.png";
import { motion } from "motion/react";

const CrearDEMO: React.FC<{ CambiarSeleccionButton?: React.ReactNode }> = ({
  CambiarSeleccionButton,
}) => {
  const [plazoParaPago, setPlazoParaPago] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderDescripcion
        title="Registrar DEMO"
        description="Registra un nuevo DEMO para un cliente."
        photo_path={comodato_photo}
      />
      <div className="flex items-center justify-end">
        {CambiarSeleccionButton}
      </div>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-md">
        <Form layout="vertical">
          <Form.Item
            label="Contrato"
            rules={[{ required: true, message: "Por favor suba el contrato" }]}
          >
            <FileUploadDrawable />
          </Form.Item>
          <Form.Item
            label="Cliente"
            rules={[
              { required: true, message: "Por favor seleccione un cliente" },
            ]}
          >
            <ClientSelectionModal
              onSelectClient={() => {}}
              showSelectedClient={true}
            />
          </Form.Item>

          <label className="font-semibold text-primary-700">
            Representante del Cliente
          </label>
          <div className="flex flex-row gap-4 mt-4">
            <Form.Item
              className="w-full"
              label="Nombre"
              name="nombre_representante_cliente"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del representante",
                },
              ]}
            >
              <Input placeholder="Nombre del cliente" />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Rut"
              name="rut_representante_cliente"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el RUT del representante",
                },
              ]}
            >
              <Input placeholder="RUT del cliente" />
            </Form.Item>
          </div>

          <Divider />

          <label className="font-semibold text-primary-700">
            Representante de Alatheia
          </label>
          <div className="flex flex-row gap-4 mt-5">
            <Form.Item
              className="w-full"
              label="Nombre"
              name="nombre_representante_alatheia"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del representante",
                },
              ]}
            >
              <Input placeholder="Nombre del representante" />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Rut"
              name="rut_representante_alatheia"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el RUT del representante",
                },
              ]}
            >
              <Input placeholder="RUT del representante" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Dirección del cliente"
              name="sucursal"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la dirección del cliente",
                },
              ]}
            >
              <Input placeholder="Dirección" />
            </Form.Item>

            <Form.Item
              label="Representante de venta"
              name="representante_de_venta"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione un representante",
                },
              ]}
            >
              <Select placeholder="Seleccione">
                <Select.Option value={1}>AKC - Camilo Ramirez</Select.Option>
                <Select.Option value={2}>F8R - Ricardo Montaner</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              label="Código de Bodega"
              name="codigo_bodega"
              rules={[
                {
                  required: true,
                  message: "Porfavor ingrese el codigo de bodega",
                },
              ]}
            >
              <Input placeholder="Ingrese el codigo de bodega" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="Fecha de Inicio"
              name="fechaInicio"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione una fecha de inicio",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item
              label="Fecha de Fin"
              name="fechaFin"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione una fecha de fin",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={plazoParaPago}
                onChange={(e) => setPlazoParaPago(e.target.checked)}
              >
                Plazo para pagar facturas
              </Checkbox>
              {plazoParaPago && (
                <Form.Item
                  className="mt-4"
                  name="plazoPagoFacturas"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el plazo de pago",
                    },
                  ]}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Días para pagar"
                  />
                </Form.Item>
              )}
            </Form.Item>
          </div>

          <div className="my-10">
            <InstrumentSelectorTable />
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Crear DEMO
            </Button>
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
};

export default CrearDEMO;
