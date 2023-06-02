import { handleRequest } from "../../lib/handlers/handleRequest";
import axios from "axios";

export async function PATCHthesisStatus({ id, statusId, reviewrId }: { id: string, statusId: number, reviewrId?: string }) {
  console.log(id, statusId);

  const res = await axios.patch(
    `http://localhost:5173/api/thesis/update/${id}?statusId=${statusId} ${reviewrId ? `&revid=${reviewrId}` : ''}`,
  )
  return res;
}
