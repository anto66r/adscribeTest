import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useStore } from "store";
import { setUsers } from "store/actions";
import EditUser from "components/EditUser";
import useFetch from "hooks/useFetch";

const Users = () => {
  const [state, dispatch] = useStore();
  const { data, loading, doLoad } = useFetch("/users");
  React.useEffect(() => {
    if (data) dispatch(setUsers(data));
  }, [data, dispatch, setUsers]);
  return (
    <Router>
      <Route path="/">
        <button type="button" onClick={doLoad} disabled={loading}>
          {`Refresh users${loading ? " (loading)" : ""}`}
        </button>
        <ul>
          {state &&
            state.users &&
            state.users.map(user => (
              <li key={user.cognitoId}>
                {user.name} <Link to={`/users/edit/${user._id}`}>edit</Link>
              </li>
            ))}
        </ul>
      </Route>
      <Route path="/users/edit/:userId" component={EditUser} />
    </Router>
  );
};
export default Users;
