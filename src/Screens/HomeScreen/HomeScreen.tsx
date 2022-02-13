import React from "react";
import Description from "../../components/UserPage/Description/Description";
import PostsAdmin from "../../components/AdminPage/PostsAdmin";
import EventAdmin from "../../components/AdminPage/EventAdmin";
import MemberUser from "../../components/UserPage/Members/MembersUser";
import MembersAdmin from "../../components/AdminPage/MembersAdmin";
import {PostsUser} from "../../components/UserPage/Posts/PostsUser";
import {EventUserPage} from "../../components/UserPage/Events/EventUser";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

export default function HomeScreen() {
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)

  return (
    <>
      <Description/>
      {isAdmin && <PostsAdmin/>}
      <PostsUser/>
      {isAdmin && <EventAdmin/>}
      <EventUserPage/>
      {isAdmin && <MembersAdmin/>}
      <MemberUser/>
    </>
  )
}