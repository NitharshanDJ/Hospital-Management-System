import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/general/NavBar";
import Dashboard from "./components/home/Dashboard";
import AddNewHospital from "./components/hospital/AddHospital";
import AllManageHospitals from "./components/hospital/AllHospitals";
import AdminManageHospital from "./components/hospital/ManageHospital";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route
            path="/superadmin/hospitals/manage/:id"
            component={AdminManageHospital}
          />
          <Route path="/superadmin/hospitals/add" component={AddNewHospital} />
          <Route path="/superadmin/hospitals" component={AllManageHospitals} />
          <Route path="/superadmin" component={Dashboard} />
          <Redirect from="/" to="/superadmin" />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
