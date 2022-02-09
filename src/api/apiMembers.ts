import { NewMember } from '../Utils/types';
import { FileInStore } from '../Utils/types'

export const apiMembers = {
  set(
    newMember: NewMember, 
    getFirebase: () => any,
    newImagesUrl: Array<FileInStore>,
  ) {
    const firestore = getFirebase().firestore()      
    firestore.collection('members').add({
      department: newMember.department,
      fullName: newMember.fullName,
      instgramLink: newMember.instgramLink,
      facebookLink: newMember.facebookLink,
      profileImg: newImagesUrl,
    })
  },
  delete(id: string, getFirebase: () => any) {
    getFirebase().firestore().collection('members').doc(id).delete()
  }
}