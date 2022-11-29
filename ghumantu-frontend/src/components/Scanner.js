import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = (props) => {
  const [data, setData] = useState('No result');

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "20%", height: "10px"}}
      />
      <p>{data}</p>
    </div>
  );
};

export default Scanner;