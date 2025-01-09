interface CardTitleNumberProps {
  title: string;
  content: string;
}

const CardTitleNumber: React.FC<CardTitleNumberProps> = ({
  title,
  content,
}) => {
  return (
    <div className="flex flex-col p-3 bg-primary-700 text-white rounded-lg w-full">
      <label className="font-semibold h-full">{title}</label>
      <p className="text-base text-primary-700 font-semibold ml-auto py-2 px-4 bg-white rounded-full">
        {content}
      </p>
    </div>
  );
};
export default CardTitleNumber;

// interface CardTitleNumberProps {
//   title: string;
//   content: string;
// }

// const CardTitleNumber: React.FC<CardTitleNumberProps> = ({
//   title,
//   content,
// }) => {
//   return (
//     <div className="flex flex-col p-3 text-primary-700 rounded-lg w-full border-2 border-primary-700">
//       <label className="font-bold h-full">{title}</label>
//       <p className="text-base text-primary-700 font-semibold ml-auto py-2 px-4 border-2 border-primary-700 rounded-full">
//         {content}
//       </p>
//     </div>
//   );
// };
// export default CardTitleNumber;
