import React, { useState, useEffect } from 'react';
import { PlateEditor } from './components/PlateEditor';

const initialValue = null;
const App = () => {

  return (

    <div className="content" style={{
      padding: '50px'
    }}>
      <PlateEditor onChange={(val) => {
        console.log('Handle onChange: ', val);
      }}></PlateEditor>
    </div>
  );
};

export default App;
