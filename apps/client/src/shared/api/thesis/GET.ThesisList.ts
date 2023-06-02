import { handleRequest } from "../../lib/handlers/handleRequest";

export function GetThesisList(statusId:number, reviewrId?:string) {
  if (!reviewrId) {
    return handleRequest(`/thesis/all?statusId=${statusId}`);
  }

  return handleRequest(`/thesis/all?statusId=${statusId}&reviewrId=${reviewrId}`);
}
