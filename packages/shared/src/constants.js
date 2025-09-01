"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBSCRIPTION_TOPICS = exports.WABA_MESSAGE_TYPES = exports.BRAND_COLORS = exports.IMAGE_DIMENSIONS = exports.QUIET_HOURS = exports.VOUCHER_CODE_LENGTH = exports.CLIENT_CODE_PREFIX = exports.RAPID_VISIT_BLOCK_MINUTES = exports.VISIT_CODE_TTL_MINUTES = exports.VOUCHER_VALID_DAYS = exports.LOYALTY_TARGET = void 0;
exports.LOYALTY_TARGET = 5;
exports.VOUCHER_VALID_DAYS = 30;
exports.VISIT_CODE_TTL_MINUTES = 10;
exports.RAPID_VISIT_BLOCK_MINUTES = 5;
exports.CLIENT_CODE_PREFIX = 'TF';
exports.VOUCHER_CODE_LENGTH = 8;
exports.QUIET_HOURS = {
    START: 21,
    END: 8,
};
exports.IMAGE_DIMENSIONS = {
    WIDTH: 1200,
    HEIGHT: 628,
};
exports.BRAND_COLORS = {
    PRIMARY: '#8B4513',
    SECONDARY: '#228B22',
    ACCENT: '#FFD700',
    BACKGROUND: '#F5F5DC',
    TEXT: '#2F4F4F',
};
exports.WABA_MESSAGE_TYPES = {
    TEXT: 'text',
    INTERACTIVE: 'interactive',
    IMAGE: 'image',
    DOCUMENT: 'document',
};
exports.SUBSCRIPTION_TOPICS = {
    EVENTS: 'events',
    PROMOS: 'promos',
};
//# sourceMappingURL=constants.js.map