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
    <div className="mb-6 md:col-span-12 p-4 bg-blue-400 rounded-lg flex items-center gap-4">
      {photo_path && (
        <img
          src={photo_path}
          alt="Banner"
          className={`w-20 h-20 object-cover ${rounded ? "rounded-full" : ""}`}
        />
      )}
      <div>
        <h1 className="text-white text-3xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default BannerPage;
