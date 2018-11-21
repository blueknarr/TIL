import React from 'react'
import './SeasonDisplay.css'

const SeasonDisplay = (props) => {
    const season = getSeason(new Date().getMonth(),props.lat);
    const { text, iconName } = seasonConfig[season];
  
    return (
  
      <div className={`season-display ${season}`}>
        <i className={`icon ${iconName} massive upper-left`}></i>
        {text}
        <i className={`icon ${iconName} massive bottom-right`}></i>
      </div>
    )
  }
  

const getSeason = (month, lat) => {
    if(month > 2 && month < 9){
        return lat > 0 ? 'summer' : 'winter';
    }else{
        return lat > 0 ? 'winter' : 'summer';
    }
} 

const seasonConfig = {
    summer: {
        text: '뻘뻘뻘',
        iconName: 'sun'
    },
    winter:{
        text: '덜덜덜',
        iconName: 'snowflake'
    }
};

export default SeasonDisplay;