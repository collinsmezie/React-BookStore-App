import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RoundProgressBar = ({ percentage }) => (
  <div style={{ width: '140px', margin: 'auto' }}>
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        textColor: '#1e51dc',
        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
        trailColor: '#d6d6d6',
      })}
    />
  </div>
);

export default RoundProgressBar;
