import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Collapse} from 'antd'
import {CaretRightOutlined, EnvironmentOutlined, FacebookOutlined} from '@ant-design/icons'
import ConfirmButton from '../../common/ConfirmButton'
import {Event} from '../../../Utils/types'
import {Carousel} from '../../common/Carousel/Carousel'
import {SomeNetLink} from '../../common/SomeNetLink'
import {deleteEvent} from '../../../Hook/useEvent'
import {AppStateType} from '../../../redux/redux-store'
import styles from './Events.module.scss';

const {Panel} = Collapse

export type MyOvnPostPropsType = {
  event: Event
}

export const EventCard: React.FC<MyOvnPostPropsType> = ({event}) => {
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)
  const dispatch = useDispatch()

  const ifConfirm = () => {
    isAdmin && dispatch(deleteEvent(event.id, event.header, event.sponsors.images))
  }

  return <div key={event.id}>
    <Card title={event.header} bordered={true} className={styles.eventCard}>
      <div className={styles.eventDataLocation}>
        <p>{event.dataTime}</p>
        <SomeNetLink link={event.location.link} name={event.location.text} img={<EnvironmentOutlined/>}/>
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
      >
        <Panel header={'Детальніше про подію'} key="1">
          <p>{event.text}</p>
          <SomeNetLink link={event.link} name={'Facebook'} img={<FacebookOutlined/>}/>
          <Carousel postImages={event.sponsors.images}/>
          {event.sponsors.name && `Спонсори: ${event.sponsors.name}`}
        </Panel>
      </Collapse>

      {isAdmin && (
        <ConfirmButton
          title={'Видалити подію'}
          confirmTitle={'Ви справді хочете видалити ць подію?'}
          funcToComplete={ifConfirm}
        />
      )}
    </Card>
  </div>
} 