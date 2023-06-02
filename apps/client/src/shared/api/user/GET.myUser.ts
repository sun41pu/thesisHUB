import { handleRequest } from "@sh/lib/handlers/handleRequest";

export const GETMyUser = () => {
  return handleRequest(`/users`);
}
