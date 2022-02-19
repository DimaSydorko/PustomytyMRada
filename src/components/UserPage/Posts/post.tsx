import React from 'react'
import {useSelector} from 'react-redux'
import ConfirmButton from '../../common/ConfirmButton'
import {Carousel} from '../../common/Carousel/Carousel'
import {FilePreview} from '../../common/UploadFiles/FilePreview/filePreview'
import {AppStateType} from '../../../redux/redux-store'
import {PostType} from '../../../Utils/types'
import styles from './PostsUser.module.scss'
import {Divider} from "@mui/material";
import usePost from "../../../Hook/UsePost";

export type MyOvnPostPropsType = {
  post: PostType
}

export const Post = React.memo(({post}: MyOvnPostPropsType) => {
    const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)
    const {deletePost} = usePost()

    const onConfirm = () => {
      isAdmin && deletePost(post.id, post.header, post.files, post.images);
    }

    return (
      <div className={styles.post}>
        <Divider>
          <h2 className={styles.postHeader}>{post.header}</h2>
        </Divider>
        <Carousel postImages={post.images}/>
        <div className={styles.postText}>
          {post.text}
          <FilePreview files={post.files}/>
        </div>

        <Divider>
          {isAdmin && (
            <ConfirmButton
              title={'Видалити пост'}
              confirmTitle={'Ви справді хочете видалити цей пост?'}
              funcToComplete={onConfirm}
            />
          )}
          <div className={styles.postData}>{post.data}</div>
        </Divider>
      </div>
    )
  }
)