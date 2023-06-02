import { handleRequest } from "@sh/lib/handlers/handleRequest";
import { signupDTO } from "@sh/api/auth/dto/signupDTO";

export function signUp(data:signupDTO) {
  return handleRequest('/auth/signup', {method: 'POST', data: data});
}
