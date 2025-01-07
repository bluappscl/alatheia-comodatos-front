interface BannerPageProps {
  title: string;
}
const BannerPage: React.FC<BannerPageProps> = ({ title }) => {
  return (
    <div className="mx-6 md:col-span-12 p-4 bg-blue-400 rounded-lg flex items-center gap-4">
      <img
        src={
          "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
        }
        alt={"nombre"}
        className="w-20 h-20 object-cover rounded-full"
      />
      <div>
        <h1 className="text-white text-3xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default BannerPage;
