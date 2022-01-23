import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: '10%',
    text: '(Pay off the Plug) We will Pay all people who believed and invested in us back.',
  },
  {
    title: '20%',
    text: 'We will release The Puffer Coins (tokens held back from the sale)(used to participate in Exclusive Contest.) are airdropped to random Puffer holders.',
  },
  {
    title: '50%',
    text: 'The Puffers Club gets its own Currency. Breadcoin ($BREAD) 10,000.00 Coins will be sent to Every members wallet.',
  },
  {
    title: '60%',
    text: 'Members-Only Puffers Club Gift Shop gets unlocked, featuring Limited Edition Rolling Trays, Grinders, Hoodies, and other exclusives assets.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">Phase II</h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
