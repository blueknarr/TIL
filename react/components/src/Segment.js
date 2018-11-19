import React from 'react'

export default function Segment(props) {
  return (
    <div>
      <div className="ui placeholder segment">
        {props.children}
      </div>
    </div>
  )
}
