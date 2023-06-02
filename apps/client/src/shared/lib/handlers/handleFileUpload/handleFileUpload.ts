import { supabase } from "@sh/lib/middleware/SupabaseClient";
import {v4 as uuidv4} from 'uuid'
import { PATCHuserProfilePicture } from "@sh/api/user/PATCH.userProfilePicture";
import { removeSpecialCharacters } from "@sh/lib/parsers";

export async function handleFileUpload(file, userId, setLoading, setError) {
  console.log(userId)
  console.log(file)

  // транзакция
  // - записываем файл в стор
  // - обновляем строку Picture в юзере

  try {
    setLoading(true)

    const filename = uuidv4()
    console.log(filename)

    const {data, error} = await supabase
      .storage
      .from('thesis')
      .upload(userId + "/" + filename, file)

    // аборт при ошибке загрузки в стор
    if (!data) {
      throw new Error(error.message)
    }

    console.log(data)
    const path = data.path // returns user/file path
    const url = `${import.meta.env.VITE_STORAGE_URL}/thesis/${path}`

    return url

  } catch (error) {
    console.log("error", error)
    setError(error)

    return false

  } finally {
    setLoading(false)
  }

}
