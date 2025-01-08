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
  );
};

export default HeaderDescripcion;
