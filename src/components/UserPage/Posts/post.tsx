import './posts.less'
import React from 'react'
import { Divider } from 'antd'
import ConfirmButton from '../../common/ConfirmButton'
import { ImgCarousel } from '../../common/Carousel/imgCarousel'
import { PostType } from '../../../Utils/types'
import { FilePreview } from '../../common/filesConfig/FilePreview/filePreview'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { deletePost } from '../../../Hook/usePost'

export type MyOvnPostPropsType = {
  post: PostType
}

export const Post:React.FC<MyOvnPostPropsType> = React.memo(
  ({post}) => {
    const isAdmin = useSelector((state:AppStateType) => state.adminAuth.isAuth)
    const dispatch = useDispatch()
    const ifConfirm = () => {
      isAdmin ? dispatch(deletePost(post.id, post.Header, post.Files, post.Images)) : alert('How did you do this?')
    }
    return (
      <div className='post'>
        <Divider orientation="left" plain>
          <h2 className='post-header'>{post.Header}</h2>
        </Divider>
        <ImgCarousel postImges={post.Images}/>
        <div className='post-text'>
          {post.Text}
          <FilePreview files={post.Files}/>
        </div>

        <Divider orientation="right" plain>
          { isAdmin ? 
            <ConfirmButton 
              title={'Видалити пост'} 
              confirmTitle={'Ви справді хочете видалити цей пост?'}
              funcToCompleate={ifConfirm} 
            /> : null
          }
          <div className='post-data'>{post.Data}</div>
        </Divider>
      </div>
    )
  }
)