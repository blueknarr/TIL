import React from 'react'

export default function Error(props) {
  return (
    <div>
      {props.message}
    </div>
  )
}

Spinner.defaultProps = {
message:'error default message'
}