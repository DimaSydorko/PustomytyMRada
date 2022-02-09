import { NewEvent } from '../Utils/types'
import { FileInStore } from '../Utils/types'

export const apiEvents = {
  set(
    newEvent: NewEvent, 
    getFirebase: () => any,
    newImagesUrl: FileInStore[],
  ) {
    const firestore = getFirebase().firestore()      
    firestore.collection('events').add({
      header: newEvent.header,
      text: newEvent.text,
      dataTime: newEvent.dataTime,
      link: newEvent.link,
      location: newEvent.location,
      sponsors: {
        images: newImagesUrl,
        name: newEvent.sponsors.name,
      },
    })
  },
  delete(id: string, getFirebase: () => any) {
    getFirebase().firestore().collection('events').doc(id).delete()
  }
}