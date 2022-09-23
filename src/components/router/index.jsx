import React from "react";
import { Routes, Route} from "react-router-dom";
import NotFound from "../../screens/notFound";
import HomePage from "../../screens/home";
import { ROUTE_END_POINTS } from "../../constants/routeConstants";
import CreateEmployeePage from "../../screens/create/create";
import ViewEmployee from "../../screens/view";

function Router() {
    const ROUTE_PATH = ROUTE_END_POINTS;
  return (
          <Routes>
            <Route path={ROUTE_PATH.HOME} element={<HomePage/>} />
            <Route path={ROUTE_PATH.CREATE_EMPLOYEE} element={<CreateEmployeePage/>} />
            <Route path={ROUTE_PATH.VIEW_EMPLOYEE} element={<ViewEmployee/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
  );
}

export default Router;