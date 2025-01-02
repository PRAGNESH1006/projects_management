import React from 'react';

function Edit({ project }) {
  console.log(project); 

  return (
    <div>
      {Object.entries(project``).map(([key, value]) => (
        <p key={key}><strong>{key}:</strong> {JSON.stringify(value)}</p>
      ))}
    </div>
  );
}

export default Edit;
