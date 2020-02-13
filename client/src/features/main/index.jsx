import React from "react";
import { Switch, Route } from "react-router-dom";

import { useStore } from "store";
import { useFetch } from "hooks";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Content from "components/Content";
import Roles from "features/roles";
import Users from "features/users/new";
import { setRoles } from "store/actions";

const Main = () => {
  const [state, dispatch] = useStore();
  const { data, loading, doLoad } = useFetch("/roles");
  React.useEffect(() => {
    doLoad();
  }, []);
  React.useEffect(() => {
    if (data && data.length) dispatch(setRoles(data));
  }, [data, dispatch, setRoles]);

  return (
    <>
      <Header />
      <Sidebar />
      <Content>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/roles" component={Roles} />
        </Switch>
      </Content>
      <Footer label="footer" />
    </>
  );
};

export default Main;
