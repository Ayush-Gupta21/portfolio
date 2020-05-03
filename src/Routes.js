import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/home"
import Signin from "./auth/signin";
import MyDashboard from "./dashboard/dashboard"
import AdminRoute from "./auth/helper/AdminRoutes"
import CreateMyPortflio from "./dashboard/createPortfolio";
import UpdateMyPortflio from "./dashboard/updatePortfolio";
import Contacts from "./core/contact"
import DashboardAbout from "./dashboard/About";



const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <AdminRoute path="/dashboard" exact component={MyDashboard} />
          <AdminRoute path="/dashboard/createportfolio" exact component={CreateMyPortflio} />
          <AdminRoute path="/dashboard/updateportfolio/:portfolioId" exact component={UpdateMyPortflio} />
          <AdminRoute path="/dashboard/contacts" exact component={Contacts} />
          <AdminRoute path="/dashboard/aboutme" exact component={DashboardAbout} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  