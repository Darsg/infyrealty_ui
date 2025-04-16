import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Utility } from "../../service/utility/Utility";
import { RootState } from "../../service/store/store";

export default function LineChart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userPermission, userInfo } = useSelector((state: RootState) => state);

  // Loading state to control content rendering
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the result to avoid recomputation
  const isAllowed = useMemo(() => {
    const allowed = Utility.isPathAllowed({ userPermission, userInfo }, location.pathname);
    setIsLoading(false); // Set loading to false once the check is done
    return allowed;
  }, [userPermission, userInfo, location.pathname]);

  // Perform the check only once and avoid nesting inside useEffect
  useEffect(() => {
    if (!isAllowed) {
      navigate("/not-found", {replace: true});
    }
  }, [isAllowed, navigate]);

  // Do not render content until isAllowed is true
  if (isLoading || !isAllowed) {
    return null;
  }

  return (
    <>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
