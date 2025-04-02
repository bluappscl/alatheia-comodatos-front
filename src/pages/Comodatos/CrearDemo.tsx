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

const CrearDEMO: React.FC = () => {
  const [isRenovable, setIsRenovable] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [enableReactivos, setEnableReactivos] = useState(false);
  const [enableDinero, setEnableDinero] = useState(false);
  const [enableGraceTime, setEnableGraceTime] = useState(false);
  const [plazoParaPago, setPlazoParaPago] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <HeaderDescripcion
        title="Demo de Comodato"
        description="Vista de prueba crear comodato"
        photo_path={comodato_photo}
      />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-md">
        <Form layout="vertical">
          <Form.Item label="Contrato">
            <FileUploadDrawable />
          </Form.Item>
          <Form.Item label="Cliente">
            <ClientSelectionModal onSelectClient={() => {}} showSelectedClient={true} />
          </Form.Item>

          <label className="font-semibold text-primary-700">Representante del Cliente</label>
          <div className="flex flex-row gap-4 mt-4">
            <Form.Item className="w-full" label="Nombre" name="nombre_representante_cliente">
              <Input placeholder="Nombre del cliente" />
            </Form.Item>
            <Form.Item className="w-full" label="Rut" name="rut_representante_cliente">
              <Input placeholder="RUT del cliente" />
            </Form.Item>
          </div>

          <Divider />

          <label className="font-semibold text-primary-700">Representante de Alatheia</label>
          <div className="flex flex-row gap-4 mt-5">
            <Form.Item className="w-full" label="Nombre" name="nombre_representante_alatheia">
              <Input placeholder="Nombre del representante" />
            </Form.Item>
            <Form.Item className="w-full" label="Rut" name="rut_representante_alatheia">
              <Input placeholder="RUT del representante" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Dirección" name="sucursal">
              <Input placeholder="Dirección" />
            </Form.Item>

            <Form.Item label="Representante de venta" name="representante_de_venta">
              <Select placeholder="Seleccione">
                <Select.Option value={1}>AKC - Camilo Ramirez</Select.Option>
                <Select.Option value={2}>F8R - Ricardo Montaner</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item label="Fecha de Inicio" name="fechaInicio">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Fecha de Fin" name="fechaFin">
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item>
              <Checkbox checked={plazoParaPago} onChange={(e) => setPlazoParaPago(e.target.checked)}>
                Plazo para pagar facturas
              </Checkbox>
              {plazoParaPago && (
                <Form.Item name="plazoPagoFacturas">
                  <InputNumber className="w-full" placeholder="Días para pagar" />
                </Form.Item>
              )}
            </Form.Item>

            <Form.Item>
              <Checkbox checked={enableGraceTime} onChange={(e) => setEnableGraceTime(e.target.checked)}>
                Tiempo de gracia
              </Checkbox>
              {enableGraceTime && (
                <Form.Item name="tiempoDeGracia">
                  <div className="flex flex-row items-center gap-4">
                    <InputNumber className="w-full" placeholder="Meses de gracia" />
                    <InputNumber className="w-full" placeholder="Descuento %" suffix="%" />
                  </div>
                </Form.Item>
              )}
            </Form.Item>

            <Form.Item>
              <Checkbox checked={isRenovable} onChange={(e) => setIsRenovable(e.target.checked)}>
                Renovable
              </Checkbox>
              {isRenovable && (
                <Checkbox
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  disabled={!isRenovable}
                >
                  ¿Renovación automática?
                </Checkbox>
              )}
            </Form.Item>

            <Form.Item label="Objetivos">
              <Checkbox checked={enableReactivos} onChange={(e) => setEnableReactivos(e.target.checked)}>
                Objetivo de Reactivos
              </Checkbox>
              {enableReactivos && (
                <Form.Item name="objetivoReactivosCantidad">
                  <InputNumber className="w-full" placeholder="Cantidad" />
                </Form.Item>
              )}
              <Checkbox checked={enableDinero} onChange={(e) => setEnableDinero(e.target.checked)}>
                Objetivo de Dinero
              </Checkbox>
              {enableDinero && (
                <Form.Item name="objetivoDineroCantidad">
                  <InputNumber className="w-full" placeholder="Monto" />
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
