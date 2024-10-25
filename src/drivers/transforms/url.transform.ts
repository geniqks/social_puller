import { TransformFnParams } from 'class-transformer';

export function urlTransform({ value }: TransformFnParams) {
  if (Array.isArray(value)) {
    return value;
  }
  return typeof value === 'string' ? value.split(',') : [value];
}
