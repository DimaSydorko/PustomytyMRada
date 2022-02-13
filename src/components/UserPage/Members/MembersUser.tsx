import React, {useEffect, useState} from "react"
import {DepartmentFC} from "./Department"
import {fbDatabase} from "../../../Utils/firebase";
import {DepartmentsT} from "../../../Utils/types"
import styles from './members.module.scss'

export default function MemberUser() {
  const [departments, setDepartments] = useState({} as DepartmentsT)
  useEffect(() => {
    fbDatabase
      .ref("Department")
      .on("value", (e) => setDepartments(e.val()))
  }, [])

  function DepartmentF(isLeadership = false) {
    let arr = []
    for (let key in departments) {
      //@ts-ignore
      if (isLeadership === departments[key].isLeadership) arr.push(departments[key])
    }
    return arr.map((e, i) => <DepartmentFC department={e} key={i}/>)
  }

  return <>
    <h1>Учасники МРади</h1>
    <div className={styles.leadership}>
      {DepartmentF(true)}
    </div>
    {DepartmentF()}
  </>
}