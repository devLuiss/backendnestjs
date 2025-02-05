"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSwaggerSchema = toSwaggerSchema;
const zod_to_json_schema_1 = require("zod-to-json-schema");
function toSwaggerSchema(zodSchema) {
    const jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(zodSchema, {
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
//# sourceMappingURL=zod-to-swagger.js.map