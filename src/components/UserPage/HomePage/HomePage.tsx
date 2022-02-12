import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { compose } from 'redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router'
import {Button} from "@mui/material";
import { AppStateType } from "../../../redux/redux-store"
import { Loader } from '../../common/loader/loader'
import {fbDatabase} from "../../../Utils/firebase";
import styles from './HomePage.module.scss';
import MembersAdmin from "../../AdminPage/MembersAdmin";
import PostsAdmin from "../../AdminPage/PostsAdmin";
import EventAdminPage from "../../AdminPage/EventAdmin";

const HomePage = () => {
  useFirestoreConnect(['members', 'posts'])
  const posts = useSelector((state:AppStateType) => state.firestore.ordered.posts)
  const members = useSelector((state:AppStateType) => state.firestore.ordered.members)

  const [aboutUs, setAboutUs] = useState('')
  
  useEffect(() => {
    fbDatabase.ref('aboutUs').on('value', e => setAboutUs(e.val()))
  }, [])

  return ((members && posts) ?
    <>
      <div className={styles.videoContainer}>
        <div className={styles.video}>
          <div className={styles.video}>
            <video autoPlay loop muted className={styles.video}>
              {/*<source src={video} type='video/mp4'/>*/}
            </video>
          </div>
        </div>
        <div className={styles.videoBg0}/>
        <div className={styles.videoBg1}/>
        <div className={styles.videoBg2}/>
        <div className={styles.videoBg3}/>
      </div>
      
      <div className={styles.titleContainer}>
        {/*<img src={logo} alt='MRada' className='logo'/>*/}
        <div className={styles.title}>МОЛОДІЖНА РАДА ПУСТОМИТІВСЬКОЇ ТГ</div>
      </div>

      <div className={styles.aboutContainer}>
        <h2 className={styles.aboutHeader}>Що таке молодіжна рада?</h2>
        <div className={styles.description}>{aboutUs}</div>
        <div className={styles.joinButtonContainer}>
          <Button
            variant='contained'
            className={styles.joinButton}
            onClick={()=>alert('will be added soon')}
          >
            Стати членом МР
          </Button>
        </div>
      </div>

      <div className={styles.countAll}>
        <div className={styles.countContainer}>
          <div className={styles.count}>{members.length}</div>
          УЧАСНИКІВ 
        </div>
        <div className={styles.countContainer}>
          <div className={styles.count}>{posts.length}</div>
          РЕАЛІЗОВАНИХ ПРОЄКТІВ 
        </div>
      </div>
      <PostsAdmin/>
      <EventAdminPage/>
      <MembersAdmin/>
    </>

    : <Loader/>
  )
}

export default compose<React.ComponentType>(
  withRouter,
) (HomePage)