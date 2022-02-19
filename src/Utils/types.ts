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
  id: string
  url: string
  name: string
}

export type PostPage = {
  posts: PostType[]
}
export type PostType = {
  id: string
  header: string
  text: string
  images: FileInStore[]
  data: string
  files: FileInStore[]
}
export type NewPost = {
  header: string
  text: string
  images?: Blob[]
  data: string
  files?: Blob[]
}


export type EventPage = {
  events: Event[]
}
export type Event = {
  id: string
  header: string
  text: string
  sponsors: {
    images: FileInStore[]
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
    images: BlobType[]
  }  
}

export type MemberPage = {
  Members: MemberT[]
}
export type MemberT = {
  id: string,
  department: string,
  fullName: string,
  profileImg: FileInStore[],
  about: string | null,
  instagramLink: string | null,
  facebookLink: string | null,
}
export type NewMember = {
  department: string,
  fullName: string,
  instagramLink: string | null,
  facebookLink: string | null,
  profileImg: BlobType[],
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
  Finance: DepartmentT
  Pr: DepartmentT
  Chairman: DepartmentT
  Surrogate: DepartmentT
  Secretary: DepartmentT
}
