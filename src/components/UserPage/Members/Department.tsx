import { Divider } from "antd"
import { FC } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppStateType } from "../../../redux/redux-store"
import { DepartmentT, MemberT } from "../../../Utils/types"
import { Member } from "./Member"

type DepartmentFCT = {
  department: DepartmentT
}

export const DepartmentFC: FC<DepartmentFCT> = ({ department }) => {
  useFirestoreConnect(['members'])
  const members = useSelector((state: AppStateType) => state.firestore.ordered.members) as Array<MemberT>
  return members ? (
    <div>
      <Divider plain ><h2>{department.header}</h2></Divider>
      {
        department.about 
        ? <div className='about-department'>{department.about}</div>
        : null
      }
      <div className='member-container'>
        {[...members]
          .filter((member) => member.department === department.name)
          .map((member) => <Member member={member} key={member.id} />)
        }
      </div>
    </div>
  ) : null
}