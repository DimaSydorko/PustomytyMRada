import {FileInStore} from '../Utils/types'
import {NewPost} from "../Utils/types"
import {firestore} from "../Utils/firebase";

export const apiPosts = {
  set(
    newPost: NewPost,
    newFilesUrl: FileInStore[],
    newImagesUrl: FileInStore[],
  ) {
    firestore
      .collection('posts')
      .add({
        header: newPost.header,
        text: newPost.text,
        data: newPost.data,
        files: newFilesUrl,
        images: newImagesUrl,
      })
      .catch(err => console.error(err))
  },
  delete(id: string) {
    firestore
      .collection('posts')
      .doc(id)
      .delete()
      .catch(err => console.error(err))
  }
}