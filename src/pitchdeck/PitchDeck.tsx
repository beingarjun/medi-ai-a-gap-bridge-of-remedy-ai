import React from 'react';
import './PitchDeck.css';
import MarketAnalysis from './slides/MarketAnalysis';
import GapAnalysis from './slides/GapAnalysis';
import TAMSlide from './slides/TAMSlide';
import SAMSlide from './slides/SAMSlide';
import SOMSlide from './slides/SOMSlide';
import Financials from './slides/Financials';
import FundRaising from './slides/FundRaising';
import Runway from './slides/Runway';
import Team from './slides/Team';
import Stack from './slides/Stack';
import EBITDA from './slides/EBITDA';
import FeaturesPrediction from './slides/FeaturesPrediction';
import Scalability from './slides/Scalability';

const slides = [
  <MarketAnalysis key="market" />, <GapAnalysis key="gap" />, <TAMSlide key="tam" />, <SAMSlide key="sam" />, <SOMSlide key="som" />,
  <Financials key="fin" />, <FundRaising key="fund" />, <Runway key="runway" />, <Team key="team" />, <Stack key="stack" />,
  <EBITDA key="ebitda" />, <FeaturesPrediction key="features" />, <Scalability key="scalability" />
];

export default function PitchDeck() {
  const [current, setCurrent] = React.useState(0);
  return (
    <div className="pitchdeck-container">
      <div className="slide">{slides[current]}</div>
      <div className="controls">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>Prev</button>
        <span>Slide {current + 1} / {slides.length}</span>
        <button onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))} disabled={current === slides.length - 1}>Next</button>
      </div>
    </div>
  );
}
