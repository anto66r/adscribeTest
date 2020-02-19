import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Roles from 'features/roles';
import { useStore } from 'store';
import { useFetchStuff } from 'hooks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Dashboards from '../dashboards';
import { Logout } from '../logout';
import TestApi from '../testapi';
import Users from '../users';

const Main: FunctionComponent = () => {
  const [state] = useStore();
  useFetchStuff();

  console.log(state);
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="middle-section-wrapper">
        <div className="content-wrapper">
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/testapi" component={TestApi} />
            <Route path="/dashboards" component={Dashboards} />
            <Route path="/roles" component={Roles} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
        <Sidebar />
      </div>
      <Footer label="footer" />
    </>
  );
};

export default Main;
