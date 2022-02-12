import React from 'react'
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {EventCard} from './event'
import {Loader} from '../../common/loader/loader';
import {AppStateType} from '../../../redux/redux-store';
import styles from './Events.module.scss';

export const EventUserPage = React.memo(() => {
  useFirestoreConnect(['events'])
  const events = useSelector((state: AppStateType) => state.firestore.ordered.events)
  return (events ? <div>
        <h1>Анонси майбутніх подій у нашій громаді</h1>
        <div className={styles.cardContainer}>
          {[...events]
            .sort((a, b) => (a.dataTime > b.dataTime) ? 1 : ((b.dataTime > a.dataTime) ? -1 : 0))
            .map(event => event.header ? <EventCard key={event.id} event={event}/> : null)}
        </div>
      </div>
      : <Loader/>
  )
})