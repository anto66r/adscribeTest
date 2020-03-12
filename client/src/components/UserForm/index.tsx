import React, { useState, FunctionComponent } from 'react';

import { IUser, IRole } from 'types';
import { useRoles } from 'hooks';

type UserFormProps = {
  user?: IUser;
  loading?: boolean;
  onSubmit: (user: IUser) => void;
  onCancel: () => void;
};

const UserForm: FunctionComponent<UserFormProps> = ({
  user = {
    email: '',
    roles: [],
    name: '',
  },
  onSubmit,
  onCancel,
  loading,
}) => {
  const { roles: allRoles } = useRoles();
  const { roles = [] } = user;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emptyFields = () => [name, email].some(x => !x.length);

  const [checkedItems, setCheckedItems] = useState(() => roles.reduce((acc: any, cur: string) => {
    acc[cur] = true;
    return acc;
  }, {}));

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckedItems({ ...checkedItems, [e.target.value]: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (emptyFields()) {
      setMessage('All fields should be filled');
      return;
    }

    const filteredRoles = Object.keys(checkedItems).filter(item => checkedItems[item]);
    try {
      onSubmit({
        roles: filteredRoles,
        name,
        email,
      });
    } catch (err) {
      setMessage(`Error creating a new account: ${err.technical}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          message && (
            <div className="alert alert-danger">
              {message}
            </div>
          )
        }
        <div className="form-group">
          <label>Name</label>
          <input type="user" className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <ul>
          {allRoles.sort().map((item: IRole) => (
            <li key={item.name}>
              <input
                data-testid={item}
                type="checkbox"
                name={item.name}
                value={item?.id}
                checked={checkedItems[item?.id] || false}
                onChange={handleCheckChange}
              />
              {item.name}
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
