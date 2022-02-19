import React from "react";
import {useSelector} from "react-redux";
import Description from "../../components/UserPage/Description/Description";
import PostsAdmin from "../../components/Admin/PostsAdmin";
import EventAdmin from "../../components/Admin/EventAdmin";
import MemberUser from "../../components/UserPage/Members/MembersUser";
import MembersAdmin from "../../components/Admin/MembersAdmin";
import PostsUser from "../../components/UserPage/Posts/PostsUser";
import {EventUserPage} from "../../components/UserPage/Events/EventUser";
import {AppStateType} from "../../redux/redux-store";

export default function HomeScreen() {
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)

  return (
    <>
      <Description/>
      {!isAdmin && <PostsAdmin/>}
      <PostsUser/>
      {!isAdmin && <EventAdmin/>}
      <EventUserPage/>
      {!isAdmin && <MembersAdmin/>}
      <MemberUser/>
    </>
  )
}