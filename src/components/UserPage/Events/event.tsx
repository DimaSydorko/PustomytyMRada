import React from 'react'
import ConfirmButton from '../../common/ConfirmButton'
import { Card, Collapse } from 'antd'
import './Events.less'
import { CaretRightOutlined, EnvironmentOutlined, FacebookOutlined } from '@ant-design/icons'
import { Event } from '../../../Utils/types'
import { ImgCarousel } from '../../common/Carousel/imgCarousel'
import { SomeNetLink } from '../../common/SomeNetLink'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { deleteEvent } from '../../../Hook/useEvent'

const { Panel } = Collapse

export type MyOvnPostPropsType = {
  event: Event
}

export const EventCard:React.FC<MyOvnPostPropsType> = ({event}) => {
  const isAdmin = useSelector((state:AppStateType) => state.adminAuth.isAuth)
  const dispatch = useDispatch()

  const ifConfirm = () => {
    isAdmin ? dispatch(deleteEvent(event.id, event.header, event.sponsors.images)) : alert('How did you do this?')
  }

  return <div key={event.id}>
    <Card title={event.header} bordered={true} className='event-card'>
      <div className="event-data-location">
        <p>{event.dataTime}</p>
        <SomeNetLink link={event.location.link} name={event.location.text} img={<EnvironmentOutlined/>}/>
      </div>
      <Collapse 
        bordered={false}
        defaultActiveKey={['0']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        > 
        <Panel header={'Детальніше про подію'} key="1">
          <p>{event.text}</p>
          <SomeNetLink link={event.link} name={'Facebook'} img={<FacebookOutlined />}/>
          <ImgCarousel postImges={event.sponsors.images}/>
          {event.sponsors.name ? 
            <div>
              Спонсори: {event.sponsors.name}
            </div> 
          : null}                
        </Panel>
      </Collapse>

      {isAdmin ? 
        <ConfirmButton 
          title={'Видалити подію'} 
          confirmTitle={'Ви справді хочете видалити ць подію?'}
          funcToCompleate={ifConfirm} 
        /> : null
      }
    </Card>
  </div> 
} 