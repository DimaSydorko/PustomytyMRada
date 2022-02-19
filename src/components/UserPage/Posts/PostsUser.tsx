import React from 'react'
import {useSelector} from 'react-redux'
import {useFirestoreConnect} from 'react-redux-firebase'
import {Post} from './post'
import {AppStateType} from '../../../redux/redux-store'
import styles from './PostsUser.module.scss';

export default function PostsUser() {
  useFirestoreConnect(['posts'])
  const posts = useSelector((state: AppStateType) => state.firestore.ordered.posts)

  return (
    posts ? (
      <div className={styles.postPageContainer}>
        <h1>Опубліковані пости:</h1>
        <div className={styles.postPageContainer}>
          {[...posts]
            .sort((a, b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0))
            .map(post => post.header ? <Post key={post.id} post={post}/> : null)}
        </div>
      </div>
    ) : null
  )
}
