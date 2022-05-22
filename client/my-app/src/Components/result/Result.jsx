
import * as React from 'react';
import "./result.css";




export default function Result({result}) {
    
  return (
      <div >
          <h4 className="resultDiv">The best Crop you can plant is : {result}</h4>
      </div>
    
  );
}