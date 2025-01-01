import React from 'react';

function Edit({ user }) {
  console.log(user); 

  return (
    <div>
      {Object.entries(user).map(([key, value]) => (
        <p key={key}><strong>{key}:</strong> {JSON.stringify(value)}</p>
      ))}
    </div>
  );
}

export default Edit;
