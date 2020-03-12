import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'store';

const EditUser = () => {
  const [state] = useStore();
  const { users } = state;
  const { userId } = useParams();
  const user = users.find(item => item?.id === userId);
  return <input type="text" value={user.name} readOnly />;
};

export default EditUser;
