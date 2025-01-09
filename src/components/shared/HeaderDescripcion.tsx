import { motion } from "motion/react";

interface BannerPageProps {
  photo_path?: string;
  title: string;
  description?: string;
}

const HeaderDescripcion: React.FC<BannerPageProps> = ({
  photo_path,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 md:col-span-12 p-4 border-b-2 flex items-end gap-4">
        {photo_path && (
          <img
            src={photo_path}
            alt="Banner"
            className={`w-12 h-12 object-cover`}
          />
        )}
        <div>
          <h1 className="text-dark-700 text-lg font-semibold">{title}</h1>
          <h6>{description}</h6>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderDescripcion;
