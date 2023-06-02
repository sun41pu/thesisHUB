import { supabase } from "@sh/lib/middleware/SupabaseClient";
import {v4 as uuidv4} from 'uuid'
import { PATCHuserProfilePicture } from "@sh/api/user/PATCH.userProfilePicture";

export async function handleProfilePictureUpload(file, userId, setLoading, setError) {
  console.log(userId)
  console.log(file)

  // транзакция
  // - записываем файл в стор
  // - обновляем строку Picture в юзере

  try {
    setLoading(true)
    const {data, error} = await supabase
      .storage
      .from('user')
      .upload(userId + "/" + uuidv4(), file)

    // аборт при ошибке загрузки в стор
    if (!data) {
      throw new Error(error.message)
    }

    console.log(data)
    const path = data.path // returns user/file path
    const url = `${import.meta.env.VITE_STORAGE_URL}/user/${path}`

    // update picture row in database
    const user = PATCHuserProfilePicture(userId, url)

    return user

  } catch (error) {
    console.log("error", error)
    setError(error)

    return false

  } finally {
    setLoading(false)
  }

}
