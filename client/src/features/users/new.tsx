import React, { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";

type User = {
  name: string;
  cognitoId: string;
};

const Users = () => {
  const { data, isLoading, error } = useFetch<User>("users");
  const { dispatch } = useContext(UserContext);

  if (data.length) dispatch({ type: "setUsers", payload: data });
  console.log(data, isLoading, error);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error?.message) {
    return <div>{error.message}</div>;
  }

  if (error) {
    return (
      <div>
        Error: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {data.map(user => (
          <li key={user.cognitoId}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
