import { motion } from "motion/react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface BannerPageProps {
  photo_path?: string;
  title: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const HeaderDescripcion: React.FC<BannerPageProps> = ({
  photo_path,
  title,
  description,
  showBackButton = false,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 md:col-span-12 p-6  rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                className="text-black hover:text-gray-200 hover:bg-black/10 border-0 flex items-center justify-center"
                size="large"
              />
            )}
            {photo_path && (
              <div className="bg-black/10 p-2 rounded-lg">
                <img
                  src={photo_path}
                  alt="Banner"
                  className="w-10 h-10 object-cover rounded"
                />
              </div>
            )}
            <div>
              <h1 className="text-black text-xl font-bold mb-1">{title}</h1>
              {description && (
                <p className="text-black/90 text-sm">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderDescripcion;
