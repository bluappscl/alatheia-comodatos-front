import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbContext } from "../contexts/breadCrumbContext";

const MyPage: React.FC = () => {
  const setBreadcrumbs = useBreadcrumbContext((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([
      { title: "Home", path: "/" },
      { title: "My Page", path: "/mypage" },
    ]);
  }, [setBreadcrumbs]);

  return (
    <>
      <div>My Page</div>
      <Link to="/">Volver</Link>
    </>
  );
};

export default MyPage;
