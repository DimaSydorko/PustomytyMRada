import React from 'react'
import { Carousel } from 'antd'
import { FileInStore } from '../../../Utils/types'
import './Carousel.css'

type Props = {
  postImges: Array<FileInStore>
}
export const ImgCarousel:React.FC<Props> = React.memo(
  ({postImges}) => {
    return postImges ? 
      <Carousel autoplay className='carousel'>
        {postImges.map(file =>
          <div key={file.id} className='imgInCarouselConatine'>
            <img src={file.url} alt={file.name} className='imgInCarousel'/> 
          </div>
        )} 
      </Carousel>
    : null
  }
)