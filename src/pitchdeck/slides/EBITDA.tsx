import React from 'react';
export default function EBITDA() {
  return (
    <div className="slide-content">
      <h2>EBITDA</h2>
      <ul>
        <li>Year 1: <span className="number-roller" data-value="-0.8">-$0.8M</span></li>
        <li>Year 2: <span className="number-roller" data-value="0.2">$0.2M</span></li>
        <li>Year 3: <span className="number-roller" data-value="2.5">$2.5M</span></li>
      </ul>
    </div>
  );
}