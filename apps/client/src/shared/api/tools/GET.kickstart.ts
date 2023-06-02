import { handleRequest } from "@sh/lib/handlers/handleRequest";

export const GETKickstart = () => {
  return handleRequest(`/kickstart`);
}
