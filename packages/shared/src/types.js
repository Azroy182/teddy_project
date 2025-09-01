"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastDto = exports.RedeemVoucherDto = exports.LoginDto = exports.IssueCodeDto = exports.ConfirmVisitDto = exports.CreateFamilyDto = void 0;
const zod_1 = require("zod");
exports.CreateFamilyDto = zod_1.z.object({
    phone: zod_1.z.string().optional(),
    waId: zod_1.z.string().optional(),
    lang: zod_1.z.enum(['EN', 'PT']).default('EN'),
    kidsCount: zod_1.z.number().optional(),
    consentMarketing: zod_1.z.boolean().default(false),
});
exports.ConfirmVisitDto = zod_1.z.object({
    code: zod_1.z.string(),
    staffId: zod_1.z.string().optional(),
    source: zod_1.z.enum(['CODE', 'QR', 'DESK']).default('CODE'),
    note: zod_1.z.string().optional(),
});
exports.IssueCodeDto = zod_1.z.object({
    familyId: zod_1.z.string(),
    ttlMinutes: zod_1.z.number().default(10),
});
exports.LoginDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.RedeemVoucherDto = zod_1.z.object({
    code: zod_1.z.string(),
    staffId: zod_1.z.string(),
});
exports.BroadcastDto = zod_1.z.object({
    templateName: zod_1.z.string(),
    language: zod_1.z.enum(['EN', 'PT']),
    audience: zod_1.z.enum(['ALL', 'SUBSCRIBERS_EVENTS', 'SUBSCRIBERS_PROMOS']),
    variables: zod_1.z.record(zod_1.z.string()).optional(),
});
//# sourceMappingURL=types.js.map