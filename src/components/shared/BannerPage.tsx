interface BannerPageProps {
  photo_path?: string;
  title: string;
  rounded?: boolean;
}

const BannerPage: React.FC<BannerPageProps> = ({
  photo_path,
  title,
  rounded,
}) => {
  return (
    <div className="mb-6 md:col-span-12 p-4 bg-dark-700 rounded-lg flex items-center gap-4">
      {photo_path && (
        <img
          src={photo_path}
          alt="Banner"
          className={`w-12 h-12 object-cover ${rounded ? "rounded-full" : ""}`}
        />
      )}
      <div>
        <h1 className="text-white text-lg font-semibold">{title}</h1>
        <h6 className="text-white">
          Aqui puedes ver el detalle de tus comodatos
        </h6>
      </div>
    </div>
  );
};

export default BannerPage;
