import {isNumberString, ValidateBy, ValidationOptions} from 'class-validator'
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments'

const IS_TYPE = 'isType'

// этот валидатор можно использовать для разрешения нескольких типов значений
// при валидации поля в DTO

// пример:
//  @IsType(['number', 'string-number'])
//  phone: number|string;

export function IsType(
  types: Array<
    | 'string'
    | 'string-number'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function'
  >,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_TYPE,
      validator: {
        validate: (value: unknown) => {
          if(types.includes('string-number') && typeof value === 'string'){
            return isNumberString(value) || types.includes('string');
          }
          return types.includes(typeof value);
        },
        defaultMessage: ({ value }: ValidationArguments) =>
          `Получено значение типа ${typeof value}, ожидалось [${types.join(', ')}]`,
      },
    },
    validationOptions,
  )
}
