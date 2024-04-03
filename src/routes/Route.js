import { Suspense, lazy } from "react";
import { Navigate, Routes, useRoutes } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";
import Page404 from "../pages/ErrorPage/Page404";
import HomeLayout from "../layouts/HomeLayout";
import SectionLayout from "../layouts/SectionLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Auth/SignIn";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen></LoadingScreen>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout></AuthLayout>,
      children: [
       
        { path: "signin", element: <SignIn></SignIn> },
        

        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children: [
        { path: "", element: <HomePage></HomePage> },

        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/app",
      element: <SectionLayout></SectionLayout>,
      children: [
        { path: "", element: <Dashboard></Dashboard> },
        { path: "input/casting", element: <InputPage></InputPage> },
        // { path: "listing", element: <ShowData></ShowData> },
        { path: "listing", element: <CastingPage></CastingPage> },
        { path: "company", element: <Company></Company> },
        { path: "project", element: <Project></Project> },
        { path: "invoice-list", element: <InvoiceList></InvoiceList> },
        { path: "work-order", element: <WorkOrder></WorkOrder> },
        {
          path: "casting-analysis",
          element: <CastingAnalysis></CastingAnalysis>,
        },
        { path: "billing", element: <Billing></Billing> },
        { path: "payment", element: <Payment></Payment> },

        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// Lazy load page
const Dashboard = Loadable(lazy(() => import("../pages/Home/Dashboard")));
const HomePage = Loadable(lazy(() => import("../pages/Home/Home")));
const InputPage = Loadable(lazy(() => import("../pages/Input/InputPage")));
const ShowData = Loadable(lazy(() => import("../pages/Data/ShowData")));
const CastingPage = Loadable(
  lazy(() => import("../pages/Casting/CastingPage"))
);
const Company = Loadable(lazy(() => import("../pages/Company/CompanyPage")));
const Project = Loadable(lazy(() => import("../pages/Company/ProjectPage")));
const InvoiceList = Loadable(
  lazy(() => import("../pages/Invoice/InvoiceList"))
);
const ContractAnalysis = Loadable(
  lazy(() => import("../pages/Contract/ContractAnalysis"))
);
const CastingAnalysis = Loadable(
  lazy(() => import("../pages/Casting/CastingAnalysis"))
);
const Billing = Loadable(lazy(() => import("../pages/Billing/Billing")));
const Payment = Loadable(lazy(() => import("../pages/Payment/Payment")));
const WorkOrder = Loadable(lazy(() => import("../pages/WorkOrder/WorkOrder")));
