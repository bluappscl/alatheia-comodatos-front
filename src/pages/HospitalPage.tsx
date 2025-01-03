import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";

const HospitalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([
      { title: "Contactos", path: "/contactos" },
      { title: `Cliente ${id}`, path: `/contactos/${id}` },
    ]);
  }, [setBreadcrumbs, id]);

  const departments = [
    { id: 1, name: "Cardiology", head: "Dr. Smith", staffCount: 20 },
    { id: 2, name: "Neurology", head: "Dr. Johnson", staffCount: 15 },
    { id: 3, name: "Pediatrics", head: "Dr. Lee", staffCount: 25 },
  ];

  const columns = [
    {
      title: "Department",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Head of Department",
      dataIndex: "head",
      key: "head",
    },
    {
      title: "Staff Count",
      dataIndex: "staffCount",
      key: "staffCount",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { id: number }) => (
        <Button
          type="primary"
          onClick={() => navigate(`/hospital/${id}/department/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="m-4">
      <h1>Hospital Details</h1>
      <p>Hospital ID: {id}</p>
      <Table
        className="bg-orange-400 rounded-xl"
        dataSource={departments}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default HospitalDetails;
