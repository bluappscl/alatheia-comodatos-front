import React from "react";
import { Modal, Table, TableColumnsType } from "antd";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductDetail {
  code: string;
  description: string;
  quantity: number;
  value: number;
}

interface FacturaDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  products: ProductDetail[];
  facturaNumber: string;
}

const FacturaDetailModal: React.FC<FacturaDetailModalProps> = ({
  isVisible,
  onClose,
  products,
  facturaNumber,
}) => {
  const columns: TableColumnsType<ProductDetail> = [
    { title: "Código", dataIndex: "code", key: "code", align: "center" },
    { title: "Descripción", dataIndex: "description", key: "description", align: "center" },
    { title: "Cantidad", dataIndex: "quantity", key: "quantity", align: "center" },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      align: "center",
      render: (value) => formatCurrency(value, "CLP"),
    },
  ];

  return (
    <Modal
      title={`Productos de la Factura: ${facturaNumber}`}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Table
        dataSource={products}
        columns={columns}
        pagination={false}
        rowKey="code"
        bordered
      />
    </Modal>
  );
};

export default FacturaDetailModal;
