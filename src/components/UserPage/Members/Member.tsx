import React from 'react'
import ConfirmButton from '../../common/ConfirmButton'
import './members.less'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import { FileInStore, MemberT } from '../../../Utils/types'
import { SomeNetLink } from '../../common/SomeNetLink'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { deleteMember } from "../../../Hook/useMembers"
import emptyAvaImg from '../../../Assets/logo/emptyAva.png'

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
    <div className="about-member">
      <Ava imgs={member.profileImg}/>
      <div className='full-name'>{member.fullName}</div>
      <div className='soc-link'>
        <SomeNetLink link={member.facebookLink} name={'Facebook'} img={<FacebookOutlined/>}/>
      </div>
      <div className='soc-link'>
        <SomeNetLink link={member.instgramLink} name={'Instagram'} img={<InstagramOutlined/>}/>
      </div>
      {isAdmin ? 
        <div className="cover-delate">
          <ConfirmButton
            title={'Видалити учасника'} 
            confirmTitle={'Ви справді хочете видалити цього учасника?'}
            funcToCompleate={ifConfirm} 
          />
        </div> : null
      }
    </div>
  )
}

type AvaT ={
  imgs: Array<FileInStore>
}
const Ava:React.FC<AvaT> = ({imgs}) => {
  return (<div>
    {imgs.length ? 
      imgs.map(img => {
        return <img key={img.id} src={img.url} alt={img.url} className='ava-img'/>
      })
    : <img src={emptyAvaImg} alt={''} className='ava-img'/>}
  </div>
  )
}