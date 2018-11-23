import React from 'react'

export default function ImageList(props) {
  const images = props.images.map(image => {
      return <img
                key={image.id} 
                src={image.urls.regular} 
                alt={image.description}/>
  })
    return (
    <div>
      {images}
    </div>
  )
}
