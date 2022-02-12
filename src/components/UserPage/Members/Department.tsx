import {FC} from "react"
import {useSelector} from "react-redux"
import {useFirestoreConnect} from "react-redux-firebase"
import {AppStateType} from "../../../redux/redux-store"
import {DepartmentT, MemberT} from "../../../Utils/types"
import {Member} from "./Member"
import styles from './members.module.scss'
import {Divider} from "@mui/material";

type DepartmentFCT = {
  department: DepartmentT
}

export const DepartmentFC: FC<DepartmentFCT> = ({department}) => {
  useFirestoreConnect(['members'])
  const members = useSelector((state: AppStateType) => state.firestore.ordered.members) as Array<MemberT>
  return members ? (
    <div>
      <Divider><h2>{department.header}</h2></Divider>
      {
        department.about
          ? <div className={styles.aboutDepartment}>{department.about}</div>
          : null
      }
      <div className={styles.memberContainer}>
        {[...members]
          .filter((member) => member.department === department.name)
          .map((member) => <Member member={member} key={member.id}/>)
        }
      </div>
    </div>
  ) : null
}