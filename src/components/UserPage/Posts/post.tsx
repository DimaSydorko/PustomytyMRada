import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Divider} from 'antd'
import {deletePost} from '../../../Hook/usePost'
import ConfirmButton from '../../common/ConfirmButton'
import {ImgCarousel} from '../../common/Carousel/imgCarousel'
import {FilePreview} from '../../common/filesConfig/FilePreview/filePreview'
import {AppStateType} from '../../../redux/redux-store'
import {PostType} from '../../../Utils/types'
import styles from './PostsUser.module.scss'

export type MyOvnPostPropsType = {
  post: PostType
}

export const Post: React.FC<MyOvnPostPropsType> = React.memo(
  ({post}) => {
    const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)
    const dispatch = useDispatch()
    const ifConfirm = () => {
      isAdmin ? dispatch(deletePost(post.id, post.Header, post.Files, post.Images)) : alert('How did you do this?')
    }
    return (
      <div className={styles.post}>
        <Divider orientation="left" plain>
          <h2 className={styles.postHeader}>{post.Header}</h2>
        </Divider>
        <ImgCarousel postImages={post.Images}/>
        <div className={styles.postText}>
          {post.Text}
          <FilePreview files={post.Files}/>
        </div>

        <Divider orientation="right" plain>
          {isAdmin ?
            <ConfirmButton
              title={'Видалити пост'}
              confirmTitle={'Ви справді хочете видалити цей пост?'}
              funcToComplete={ifConfirm}
            /> : null
          }
          <div className={styles.postData}>{post.Data}</div>
        </Divider>
      </div>
    )
  }
)