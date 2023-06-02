import { IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";


export class CreateCommentDTO {
  @IsString({message: 'текст комменатрия должен быть строкой'})
  @IsNotEmpty({message: 'текст комменатрия не может быть пустым'})
  text: string;

  @ValidateIf(({ parent_id }) => parent_id !== null,
         {message:'id родительского комментария должно быть либо null, либо числом'})
  @IsInt({message: 'Указавая id родительского комментария, приведенный id должен быть числом'})
  parent_id: number | null;

  @IsString({message: 'id автора комментария должен быть строкой'})
  @IsNotEmpty({message: 'id автора комментария не может быть пустым'})
  authorId: string;

  @IsInt({message: 'id работы должен быть числом'})
  @IsNotEmpty({message: 'id работы не может быть пустым'})
  thesisId: number
}
