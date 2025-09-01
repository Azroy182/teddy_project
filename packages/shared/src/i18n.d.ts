import enTranslations from '../i18n/en.json';
import type { Language } from './types';
type TranslationKey = keyof typeof enTranslations;
declare const translations: {
    EN: {
        greeting: string;
        menu: {
            loyalty: string;
            cafe: string;
            hours: string;
            events: string;
            rules: string;
            profile: string;
            unsubscribe: string;
        };
        onboarding: {
            choose_language: string;
            welcome: string;
            customer_number: string;
            menu_hint: string;
        };
        loyalty: {
            progress: string;
            completed: string;
            voucher_ready: string;
        };
        checkout: {
            message: string;
        };
        subscribe: {
            prompt: string;
            ok: string;
            no: string;
        };
        unsubscribe: {
            done: string;
        };
    };
    PT: {
        greeting: string;
        menu: {
            loyalty: string;
            cafe: string;
            hours: string;
            events: string;
            rules: string;
            profile: string;
            unsubscribe: string;
        };
        onboarding: {
            choose_language: string;
            welcome: string;
            customer_number: string;
            menu_hint: string;
        };
        loyalty: {
            progress: string;
            completed: string;
            voucher_ready: string;
        };
        checkout: {
            message: string;
        };
        subscribe: {
            prompt: string;
            ok: string;
            no: string;
        };
        unsubscribe: {
            done: string;
        };
    };
};
export declare function t(key: string, lang?: Language, variables?: Record<string, string>): string;
export { translations };
export type { TranslationKey };
//# sourceMappingURL=i18n.d.ts.map