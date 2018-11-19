import React from 'react'

export default function Message(props) {
    console.log(props);
    return (
    
    <div className="ui message">
    <div className="header">
        {props.header}
    </div>
    <p>
        {props.body}
    </p>
    </div>
  )
}
