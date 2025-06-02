import { getCurrentUser } from "@/actions/user.actions"
import ProfileForm from "@/components/forms/ProfileForm"
import { redirect } from "next/navigation"

const ProfilePage = async () => {

  const user = await getCurrentUser()

  if (!user) redirect('/login')
  return (
    <ProfileForm user={user}/>
  )
}

export default ProfilePage
