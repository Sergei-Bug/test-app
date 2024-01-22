// import { useState } from 'react';
// import UsersTable from '../UsersTable/UsersTable';

const Filter = () => {
  // const [value, setValue] = useState('');

  // const filteredUsers = users.filter(user => {
  //   return user.email.toLowerCase().includes(value.toLowerCase());
  // });

  return (
    <div>
      <form className="search-form">
        <input
          type="text"
          placeholder="Search user"
          className="search-input"
          // onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};
export default Filter;
