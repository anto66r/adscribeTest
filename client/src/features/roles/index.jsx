import React, { useReducer } from "react";
import { useStore } from "store";
import { setRoles } from "store/actions";
import { useFetch } from "hooks";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditUser from "components/EditUser";

const Users = () => {
  const [state, dispatch] = useStore();
  const { data, loading, doLoad } = useFetch("/roles");
  React.useEffect(() => {
    if (data) dispatch(setRoles(data));
  }, [data, dispatch, setRoles]);
  console.log(state);
  return (
    <>
      <h1>Roles</h1>
      <button type="button" onClick={doLoad} disabled={loading}>
        {`Refresh roles${loading ? " (loading)" : ""}`}
      </button>
      <ul>
        {state.roles &&
          state.roles.map(({ name, _id }) => <li key={_id}>{name}</li>)}
      </ul>
    </>
  );
};
export default Users;
