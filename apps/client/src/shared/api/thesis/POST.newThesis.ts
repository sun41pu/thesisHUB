import { handleRequest } from "@sh/lib/handlers/handleRequest";

export function newThesis(data:any) {
  return handleRequest('/thesis/newThesis', {method: 'POST', data: data});
}
