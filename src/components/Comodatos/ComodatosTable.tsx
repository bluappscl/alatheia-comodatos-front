import React, { useState, useEffect } from "react";
import { Button, DatePicker, Table, Tooltip, Typography, Modal, Input, message } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { formatCurrency } from "../../utils/formatCurrency";
import axiosInstance from "../../api/axiosInstance";
// import { MessageCircleIcon } from "lucide-react";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export interface ComodatoInterface {
  id: number;
  nombre_cliente: string;
  rut_cliente: string;
  codigo_representante_venta: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  objetivo_compra_mensual: string;
  compra_mensual_realizada: string;
  objetivo_cantidad_mensual: string;
  cantidad_mensual_realizada: string;
  estado: boolean;
  es_demo: boolean;
}

const ComodatosTable: React.FC = () => {
  const [comodatos, setComodatos] = useState<ComodatoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  console.log('dateRange', dateRange)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ComodatoInterface | null>(null);
  const [comment, setComment] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{ comodatos: ComodatoInterface[] }>("/comodatos/")
      .then((res) => setComodatos(res.data.comodatos))
      .catch((err) => console.error("Error al obtener comodatos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleNavigateToDetalle = (id: number) => navigate(`/comodato/${id}`);

  // const openCommentModal = (record: ComodatoInterface) => {
  //   setCurrentRecord(record);
  //   setComment("");
  //   setIsModalVisible(true);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
    setComment("");
  };

  const handleSaveComment = async () => {
    if (!currentRecord) return;
    try {
      await axiosInstance.post(`/comodatos/${currentRecord.id}/comentarios`, { comentario: comment });
      message.success("Comentario guardado exitosamente");
      handleCancel();
    } catch (error) {
      console.error("Error al guardar comentario:", error);
      message.error("No se pudo guardar el comentario");
    }
  };

  const columns: ColumnsType<ComodatoInterface> = [
    {
      title: "Cliente",
      dataIndex: "nombre_cliente",
      key: "nombre_cliente",
    },
    {
      title: "RUT Cliente",
      dataIndex: "rut_cliente",
      key: "rut_cliente",
      align: "center",
    },
    {
      title: "Código Representante de Venta",
      dataIndex: "codigo_representante_venta",
      key: "codigo_representante_venta",
      align: "center",
    },
    {
      title: "Fecha de Fin",
      dataIndex: "fecha_fin",
      key: "fecha_fin",
      align: "center",
      render: (date: string | null) => date ? dayjs(date).format("DD/MM/YYYY") : "-",
    },
    {
      title: "Objetivo Compra $",
      dataIndex: "objetivo_compra_mensual",
      key: "objetivo_compra_mensual",
      align: "center",
      render: (value: string) => formatCurrency(Number(value), "CLP"),
    },
    {
      title: "Compra $ Realizada",
      dataIndex: "compra_mensual_realizada",
      key: "compra_mensual_realizada",
      align: "center",
      render: (value: string) => formatCurrency(Number(value), "CLP"),
    },
    {
      title: "Objetivo Reactivos",
      dataIndex: "objetivo_cantidad_mensual",
      key: "objetivo_cantidad_mensual",
      align: "center",
    },
    {
      title: "Reactivos Realizados",
      dataIndex: "cantidad_mensual_realizada",
      key: "cantidad_mensual_realizada",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      filters: [
        { text: "Vigente", value: true },
        { text: "Pendiente", value: false },
      ],
      onFilter: (value, record) => record.estado === value,
      render: (estado: boolean) => (
        <Typography.Text className={estado ? "text-green-600" : "text-red-600"}>
          {estado ? "Vigente" : "Pendiente"}
        </Typography.Text>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "es_demo",
      key: "es_demo",
      align: "center",
      filters: [
        { text: "Demos", value: true },
        { text: "Comodato", value: false },
      ],
      onFilter: (value, record) => record.es_demo === value,
      render: (val: boolean) => (val ? "Demo" : "Comodato"),
    },
    {
      title: "Detalle",
      key: "detalle",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-1">
          <Tooltip title="Ver Detalle del Comodato">
            <Button onClick={() => handleNavigateToDetalle(record.id)}>
              <ZoomInOutlined />
            </Button>
          </Tooltip>
          {/* <Tooltip title="Agregar Comentario">
            <Button onClick={() => openCommentModal(record)}>
              <MessageCircleIcon />
            </Button>
          </Tooltip> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex sm:flex-col lg:flex-row gap-4 w-full mb-4">
        <div className="flex flex-row w-full gap-2 items-center">
          <RangePicker className="w-full" onChange={setDateRange} />
        </div>
      </div>

      <Table
        dataSource={comodatos}
        columns={columns}
        rowKey="id"
        className="bg-dark-100 rounded-xl"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 500 }}
        loading={{
          spinning: loading,
          tip: "Obteniendo comodatos..."
        }}
      />

      <Modal
        title="Agregar Comentario"
        visible={isModalVisible}
        onOk={handleSaveComment}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe tu comentario..."
        />
      </Modal>
    </>
  );
};

export default ComodatosTable;
