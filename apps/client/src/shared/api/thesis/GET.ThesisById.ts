import { handleRequest } from "@sh/lib/handlers/handleRequest";

export const GETThesisById = (id: string|number) => {
  return handleRequest(`/thesis/${id}`);
}
