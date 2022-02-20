import {BlobType, FileInStore} from "../Utils/types"
import firebase from "../Utils/firebase";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const apiFiles = {
  async add(Files: BlobType[], folder: string, groupName: string, groupFileType: string, callBack: (newFiles: FileInStore[]) => void) {
    const filesUrl = [] as Array<FileInStore>
    Files.length > 0 ?
    await new Promise (resolve => {
      Files.map(async e => {
        const file = e.originFileObj
        const uploadTask = firebase.storage().ref(`${folder}/${groupName}/${groupFileType}`).child(file.name).put(file)
        return uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        }, (error) => {
          console.log("error:-", error)
        },
         () => {
          const uniId = `${Date.now()}`
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newFile = {
              name: file.name.toString(),
              id: uniId,
              url: downloadURL.toString()
            }
            console.log('push', newFile)
            filesUrl.push(newFile)

          }).then(()=>{
            console.log('await', filesUrl)
          })
          resolve(filesUrl)
        })
      })
    }).then(async()=>{
      await timeout(5000)
      callBack(filesUrl)
    })
    : callBack(filesUrl)
  },
  delete(folder: string, groupName: string, groupFileType: string, files: FileInStore[]) {
    let desertRef = firebase.storage().ref(`${folder}/${groupName}/${groupFileType}`)

    files.map(async file => {
      await desertRef.child(file.name).delete().then(() => {
      }).catch((error) => {
        console.error(error)
      })
    })
  }
}