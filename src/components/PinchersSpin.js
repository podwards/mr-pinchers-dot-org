import React from 'react';
import mr_pinchers_1 from './mr_pinchers_1.jpg';
import mr_pinchers_2 from './mr_pinchers_2.jpg';
import mr_pinchers_3 from './mr_pinchers_3.jpg';
import mr_pinchers_4 from './mr_pinchers_4.jpg';
import './PinchersSpin.css';


function PinchersSpin() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <img src={mr_pinchers_1} className="App-logo" alt="logo" />
          <img src={mr_pinchers_2} className="App-logo" alt="logo" />
        </div>
        <div className="row">
          <img src={mr_pinchers_3} className="App-logo" alt="logo" />
          <img src={mr_pinchers_4} className="App-logo" alt="logo" />
        </div>
      </header>
    </div>
  );
}

export default PinchersSpin;
