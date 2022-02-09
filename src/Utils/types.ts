export type BlobType = {
  uid: string
  lastModified: number
  lastModifiedDate: string
  name: string
  size: number
  type: string
  percent: number
  originFileObj: File
  error: object
  status: string
  thumUrl?: string
}
export type FileInStore = {
  name: string
  id: string
  url: string
}

export type PostPage = {
  posts: Array<PostType>
}
export type PostType = {
  id: string
  Header: string
  Text: string
  Images: Array<FileInStore>
  Data: string
  Files: Array<FileInStore>
}
export type NewPost = {
  Header: string
  Text: string
  Images: Array<BlobType>
  Data: string
  Files: Array<BlobType>
}


export type EventPage = {
  events: Array<Event>
}
export type Event = {
  id: string
  header: string
  text: string
  sponsors: {
    images: Array<FileInStore>
    name: string | null 
  }  
  dataTime: string
  link: string | null
  location: {
    text: string
    link: string | null
  }
}
export type NewEvent = {
  header: string
  text: string
  dataTime: string
  link: string | null
  location: {
    text: string
    link: string | null
  }
  sponsors: {
    name: string | null 
    images: Array<BlobType>
  }  
}

export type MemberPage = {
  Members: Array<MemberT>
}
export type MemberT = {
  id: string,
  department: string,
  fullName: string,
  profileImg: Array<FileInStore>,
  about: string | null,
  instgramLink: string | null,
  facebookLink: string | null,
}
export type NewMember = {
  department: string,
  fullName: string,
  instgramLink: string | null,
  facebookLink: string | null,
  profileImg: Array<BlobType>,
}


export type DepartmentT = {
  header: string
  about: string
  name: string
  isLeadership: boolean
}
export type DepartmentsT = {
  Culture: DepartmentT
  Eco: DepartmentT
  Education: DepartmentT
  Finace: DepartmentT
  Pr: DepartmentT
  Chairman: DepartmentT
  Surrogate: DepartmentT
  Secretary: DepartmentT
}
