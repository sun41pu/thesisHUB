import { handleRequest } from "@sh/lib/handlers/handleRequest";

export const PATCHuserProfilePicture = async (id:string, url:string) => {
  console.log("ID", id)
  console.log("URL", url)

  return await handleRequest(`/users/${id}`, {method: 'PATCH', data: {picture: url}});
}
