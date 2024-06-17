import { BaseHTTP } from './base-http.module.js';

const http = new BaseHTTP();

export { http };
export { HTTPCode } from './libs/enums/enums.js';
export { type HTTP, type HTTPOptions } from './libs/types/types.js';
