import { z } from 'zod';
export type Language = 'EN' | 'PT';
export type VisitSource = 'CODE' | 'QR' | 'DESK';
export type VoucherStatus = 'ACTIVE' | 'REDEEMED' | 'EXPIRED';
export type MenuCategory = 'FOOD' | 'DRINKS';
export type SubscriptionTopic = 'EVENTS' | 'PROMOS';
export type StaffRole = 'ADMIN' | 'CASHIER';
export interface WhatsAppMessage {
    from: string;
    id: string;
    timestamp: string;
    type: 'text' | 'interactive';
    text?: {
        body: string;
    };
    interactive?: {
        type: 'button_reply' | 'list_reply';
        button_reply?: {
            id: string;
            title: string;
        };
        list_reply?: {
            id: string;
            title: string;
        };
    };
}
export interface WhatsAppWebhookEntry {
    id: string;
    changes: Array<{
        value: {
            messaging_product: string;
            metadata: {
                display_phone_number: string;
                phone_number_id: string;
            };
            contacts?: Array<{
                profile: {
                    name: string;
                };
                wa_id: string;
            }>;
            messages?: WhatsAppMessage[];
            statuses?: Array<{
                id: string;
                status: string;
                timestamp: string;
                recipient_id: string;
            }>;
        };
        field: string;
    }>;
}
export interface WhatsAppWebhook {
    object: string;
    entry: WhatsAppWebhookEntry[];
}
export declare const CreateFamilyDto: z.ZodObject<{
    phone: z.ZodOptional<z.ZodString>;
    waId: z.ZodOptional<z.ZodString>;
    lang: z.ZodDefault<z.ZodEnum<["EN", "PT"]>>;
    kidsCount: z.ZodOptional<z.ZodNumber>;
    consentMarketing: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    phone?: string;
    waId?: string;
    lang?: "EN" | "PT";
    kidsCount?: number;
    consentMarketing?: boolean;
}, {
    phone?: string;
    waId?: string;
    lang?: "EN" | "PT";
    kidsCount?: number;
    consentMarketing?: boolean;
}>;
export declare const ConfirmVisitDto: z.ZodObject<{
    code: z.ZodString;
    staffId: z.ZodOptional<z.ZodString>;
    source: z.ZodDefault<z.ZodEnum<["CODE", "QR", "DESK"]>>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code?: string;
    staffId?: string;
    source?: "CODE" | "QR" | "DESK";
    note?: string;
}, {
    code?: string;
    staffId?: string;
    source?: "CODE" | "QR" | "DESK";
    note?: string;
}>;
export declare const IssueCodeDto: z.ZodObject<{
    familyId: z.ZodString;
    ttlMinutes: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    familyId?: string;
    ttlMinutes?: number;
}, {
    familyId?: string;
    ttlMinutes?: number;
}>;
export declare const LoginDto: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export declare const RedeemVoucherDto: z.ZodObject<{
    code: z.ZodString;
    staffId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code?: string;
    staffId?: string;
}, {
    code?: string;
    staffId?: string;
}>;
export declare const BroadcastDto: z.ZodObject<{
    templateName: z.ZodString;
    language: z.ZodEnum<["EN", "PT"]>;
    audience: z.ZodEnum<["ALL", "SUBSCRIBERS_EVENTS", "SUBSCRIBERS_PROMOS"]>;
    variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    templateName?: string;
    language?: "EN" | "PT";
    audience?: "ALL" | "SUBSCRIBERS_EVENTS" | "SUBSCRIBERS_PROMOS";
    variables?: Record<string, string>;
}, {
    templateName?: string;
    language?: "EN" | "PT";
    audience?: "ALL" | "SUBSCRIBERS_EVENTS" | "SUBSCRIBERS_PROMOS";
    variables?: Record<string, string>;
}>;
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface LoyaltyProgress {
    current: number;
    target: number;
    percentage: number;
}
export interface VisitConfirmation {
    visitId: string;
    loyaltyProgress: LoyaltyProgress;
    cardImageUrl?: string;
    voucherIssued?: {
        voucherId: string;
        code: string;
        imageUrl: string;
    };
}
export interface PaymentLink {
    url: string;
    id: string;
}
export interface CreatePaymentRequest {
    amountCents: number;
    currency: string;
    description: string;
    familyId: string;
}
export type CreateFamilyDtoType = z.infer<typeof CreateFamilyDto>;
export type ConfirmVisitDtoType = z.infer<typeof ConfirmVisitDto>;
export type IssueCodeDtoType = z.infer<typeof IssueCodeDto>;
export type LoginDtoType = z.infer<typeof LoginDto>;
export type RedeemVoucherDtoType = z.infer<typeof RedeemVoucherDto>;
export type BroadcastDtoType = z.infer<typeof BroadcastDto>;
//# sourceMappingURL=types.d.ts.map