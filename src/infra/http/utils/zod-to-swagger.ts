import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export function toSwaggerSchema(zodSchema: z.ZodTypeAny) {
  // @ts-expect-error TS2589: zod-to-json-schema com zod 3 + target openApi3 causa
  // type instantiation excessively deep. Resultado em runtime e correto.
  const jsonSchema = zodToJsonSchema(zodSchema, {
    $refStrategy: 'none',
    target: 'openApi3',
  });

  if (jsonSchema.definitions) {
    const keys = Object.keys(jsonSchema.definitions);
    if (keys.length === 1) {
      return jsonSchema.definitions[keys[0]];
    }
  }

  return jsonSchema;
}
