import React from 'react'
import { Post } from './post'
import './posts.less'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Loader } from '../../common/loader/loader'

export const PostUserPage = React.memo(() => {
    const posts = useSelector((state:AppStateType) => state.firestore.ordered.posts)
    useFirestoreConnect(['posts'])
    return posts ? 
      <div className='postPageConatiner'>
        <h1>Опубліковані пости:</h1>
        <div className='postContainer'>
          {[...posts].sort(
            (a,b) => (a.Data < b.Data) ? 1 : ((b.Data < a.Data) ? -1 : 0)
          ).map(post => post.Header ? <Post key={post.id} post={post}/> : null)}
        </div>
      </div> 
    : <Loader/> 
  }
)