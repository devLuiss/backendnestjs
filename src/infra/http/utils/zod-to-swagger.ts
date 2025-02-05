import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export function toSwaggerSchema(zodSchema: z.ZodTypeAny) {
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
