import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layouts/root-layout";
import Accordions from "./pages/accordions";
import Alerts from "./pages/alerts";
import Avatars from "./pages/avatars";
import Badges from "./pages/badge";
import Breadcrumbs from "./pages/breadcrums";
import Buttons from "./pages/buttons";
import CheckboxesAndRadios from "./pages/checkboxes-and-radios";
import ChoiceSelects from "./pages/choice-select";
import Collapses from "./pages/collapses";
import DateTimePickers from "./pages/date-and-time-picker";
import Drawers from "./pages/drawers";
import Dropdowns from "./pages/dropdowns";
import Emails from "./pages/email";
import FileUploaders from "./pages/file-uploaders";
import Inputs from "./pages/inputs";
import { Invoice } from "./pages/invoice";
import MaskInputs from "./pages/mask-inputs";
import Messages from "./pages/message";
import Modals from "./pages/modals";
import Paginations from "./pages/paginations";
import Popovers from "./pages/popovers";
import Ratings from "./pages/ratings";
import ResetPassword from "./pages/reset-password";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Sliders from "./pages/sliders";
import Spinners from "./pages/spinners";
import SweetAlerts from "./pages/sweet-alart";
import Tables from "./pages/table";
import Tabs from "./pages/tabs";
import TextEditors from "./pages/text-editor";
import Toasts from "./pages/toasts";
import Todos from "./pages/todo";
import Tooltips from "./pages/tooltips";
import Home from "./pages/home";
import RootLayoutPage from "./pages/root-layout";
import PaginationPage from "./pages/pagination";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout
      logo={"/images/logo.png"}
    />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: homeLoader,
      },
      {
        path: "root-layout",
        element: <RootLayoutPage />,
        // loader: homeLoader,
      },
      {
        path: "components/buttons",
        element: <Buttons />,
      },
      {
        path: "components/breadcrumbs",
        element: <Breadcrumbs />,
      },
      {
        path: "components/badges",
        element: <Badges />,
      },
      {
        path: "components/dropdowns",
        element: <Dropdowns />,
      },
      {
        path: "components/modals",
        element: <Modals />,
      },
      {
        path: "components/tabs",
        element: <Tabs />,
      },
      {
        path: "components/drawers",
        element: <Drawers />,
      },
      {
        path: "components/paginations",
        element: <Paginations />,
      },
      {
        path: "components/tooltips",
        element: <Tooltips />,
      },
      {
        path: "components/toasts",
        element: <Toasts />,
      },
      {
        path: "components/ratings",
        element: <Ratings />,
      },
      {
        path: "components/sweet-alert",
        element: <SweetAlerts />,
      },
      {
        path: "components/inputs",
        element: <Inputs />,
      },
      {
        path: "components/accordions",
        element: <Accordions />,
      },
      {
        path: "components/alerts",
        element: <Alerts />,
      },
      {
        path: "components/avatars",
        element: <Avatars />,
      },
      {
        path: "components/collapses",
        element: <Collapses />,
      },
      {
        path: "components/popovers",
        element: <Popovers />,
      },
      {
        path: "components/spinners",
        element: <Spinners />,
      },
      {
        path: "components/checkboxesAndRadios",
        element: <CheckboxesAndRadios />,
      },
      {
        path: "components/choice-select",
        element: <ChoiceSelects />,
      },
      {
        path: "components/date-and-time-picker",
        element: <DateTimePickers />,
      },
      {
        path: "components/file-uploader",
        element: <FileUploaders />,
      },
      {
        path: "components/text-editor",
        element: <TextEditors />,
      },
      {
        path: "components/mask-inputs",
        element: <MaskInputs />,
      },
      {
        path: "components/sliders",
        element: <Sliders />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/emails",
        element: <Emails />,
      },
      {
        path: "/todos",
        element: <Todos />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/table",
        element: <Tables />,
      },
      {
        path: "/pagination",
        element: <PaginationPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
