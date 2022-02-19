import React from 'react'
import ConfirmButton from '../../common/ConfirmButton'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import { FileInStore, MemberT } from '../../../Utils/types'
import { SomeNetLink } from '../../common/SomeNetLink'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { deleteMember } from "../../../Hook/useMembers"
import emptyAvaImg from '../../../Assets/emptyAva.png'
import styles from "./members.module.scss";

type MemberProps = {
  member: MemberT
}

export const Member: React.FC<MemberProps> = ({member}) => {
  const isAdmin = useSelector((state:AppStateType) => state.adminAuth.isAuth)
  const dispatch = useDispatch()

  const ifConfirm = () => {
    isAdmin ? dispatch(deleteMember(member.id, member.fullName, member.profileImg)) : alert('How did you do this?')
  }
  return (
    <div className={styles.aboutMember}>
      <Ava images={member.profileImg}/>
      <div className={styles.fullName}>{member.fullName}</div>
      <div className={styles.socLink}>
        <SomeNetLink link={member.facebookLink} name={'Facebook'} img={<FacebookOutlined/>}/>
      </div>
      <div className={styles.socLink}>
        <SomeNetLink link={member.instagramLink} name={'Instagram'} img={<InstagramOutlined/>}/>
      </div>
      {isAdmin ? 
        <div className={styles.coverDelete}>
          <ConfirmButton
            title={'Видалити учасника'} 
            confirmTitle={'Ви справді хочете видалити цього учасника?'}
            funcToComplete={ifConfirm}
          />
        </div> : null
      }
    </div>
  )
}

type AvaT ={
  images: Array<FileInStore>
}
const Ava:React.FC<AvaT> = ({images}) => {
  return (<div>
    {images.length ?
      images.map(img => {
        return <img key={img.id} src={img.url} alt={img.url} className={styles.avaImg}/>
      })
    : <img src={emptyAvaImg} alt={''} className={styles.avaImg}/>}
  </div>
  )
}