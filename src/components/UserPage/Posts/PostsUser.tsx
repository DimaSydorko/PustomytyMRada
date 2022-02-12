import React from 'react'
import {useSelector} from 'react-redux'
import {useFirestoreConnect} from 'react-redux-firebase'
import {Post} from './post'
import {Loader} from '../../common/loader/loader'
import {AppStateType} from '../../../redux/redux-store'
import styles from './PostsUser.module.scss';

export const PostUserPage = () => {
  const posts = useSelector((state: AppStateType) => state.firestore.ordered.posts)
  useFirestoreConnect(['posts'])
  return posts ?
    <div className={styles.postPageContainer}>
      <h1>Опубліковані пости:</h1>
      <div className={styles.postPageContainer}>
        {[...posts].sort(
          (a, b) => (a.Data < b.Data) ? 1 : ((b.Data < a.Data) ? -1 : 0)
        ).map(post => post.Header ? <Post key={post.id} post={post}/> : null)}
      </div>
    </div>
    : <Loader/>
}
