"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
const dayJs = dayjs.tz.setDefault('America/Sao_Paulo');
exports.default = dayJs;
//# sourceMappingURL=dayjs.js.map