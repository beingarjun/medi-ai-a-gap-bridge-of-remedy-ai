import React from 'react';
export default function Financials() {
  return (
    <div className="slide-content">
      <h2>Financials</h2>
      <ul>
        <li>Year 1 Revenue: <span className="number-roller" data-value="0.5">$0.5M</span></li>
        <li>Year 2 Revenue: <span className="number-roller" data-value="2">$2M</span></li>
        <li>Year 3 Revenue: <span className="number-roller" data-value="8">$8M</span></li>
        <li>Gross Margin: <span className="number-roller" data-value="70">70%</span></li>
      </ul>
    </div>
  );
}