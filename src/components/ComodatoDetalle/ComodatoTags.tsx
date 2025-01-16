import React from "react";

interface ComodatoTagsProps {
  estado: string;
  es_renovable: boolean;
  renovable_automatico: boolean;
}

const ComodatoTags: React.FC<ComodatoTagsProps> = ({
  estado,
  es_renovable,
  renovable_automatico,
}) => {
  return (
    <div className="flex flex-row gap-4">
      <div
        className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full ${
          estado === "Vigente" ? "bg-success-700" : "bg-error-700"
        }`}
      >
        {estado}
      </div>

      <div
        className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full ${
          es_renovable ? "bg-success-700" : "bg-error-700"
        }`}
      >
        {es_renovable ? "Renovable" : "No Renovable"}
      </div>

      {es_renovable && (
        <div
          className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full ${
            renovable_automatico ? "bg-success-700" : "bg-error-700"
          }`}
        >
          {renovable_automatico ? "Automático" : "Manual"}
        </div>
      )}
    </div>
  );
};

export default ComodatoTags;
