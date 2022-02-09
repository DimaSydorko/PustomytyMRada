import { FileInStore } from '../Utils/types'
import { NewPost } from "../Utils/types"

export const apiPosts = {
  set(
    newPost: NewPost, 
    getFirebase: () => any,
    newFilesUrl: Array<FileInStore>, 
    newImagesUrl: Array<FileInStore>,
  ) {
    const firestore = getFirebase().firestore()      
    firestore.collection('posts').add({
      Header: newPost.Header,
      Text: newPost.Text,
      Data: newPost.Data,
      Files: newFilesUrl,
      Images: newImagesUrl,
    })
  },
  delete(id: string, getFirebase: ()=>any) {
    getFirebase().firestore().collection('posts').doc(id).delete()
  }
}