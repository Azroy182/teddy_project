"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2 = __importStar(require("argon2"));
const menuData = __importStar(require("../infra/scripts/menu.seed.json"));
const prisma = new client_1.PrismaClient();
async function generateClientCode() {
    const count = await prisma.family.count();
    const number = (count + 1).toString().padStart(6, '0');
    return `TF-${number}`;
}
async function seedAdmin() {
    const email = process.env.ADMIN_SEED_EMAIL || 'admin@teddy.pt';
    const password = process.env.ADMIN_SEED_PASSWORD || 'change_me';
    const existingAdmin = await prisma.staff.findUnique({
        where: { email },
    });
    if (existingAdmin) {
        console.log('Admin user already exists, skipping...');
        return;
    }
    const passwordHash = await argon2.hash(password);
    const admin = await prisma.staff.create({
        data: {
            email,
            name: 'System Admin',
            role: 'ADMIN',
            passwordHash,
        },
    });
    console.log(`✅ Created admin user: ${admin.email}`);
}
async function seedMenu() {
    console.log('Seeding menu items...');
    for (const category of menuData.categories) {
        for (const item of category.items) {
            const existingItem = await prisma.menuItem.findUnique({
                where: { sku: item.sku },
            });
            if (existingItem) {
                console.log(`Menu item ${item.sku} already exists, skipping...`);
                continue;
            }
            const menuItem = await prisma.menuItem.create({
                data: {
                    sku: item.sku,
                    nameEn: item.name_en,
                    namePt: item.name_pt,
                    descEn: item.desc_en || null,
                    descPt: item.desc_pt || null,
                    priceCents: Math.round(item.price_eur * 100),
                    category: category.key.toUpperCase(),
                    isActive: true,
                },
            });
            console.log(`✅ Created menu item: ${menuItem.sku}`);
        }
    }
}
async function seedTestFamily() {
    const existingFamily = await prisma.family.findFirst({
        where: { clientCode: { startsWith: 'TF-' } },
    });
    if (existingFamily) {
        console.log('Test family already exists, skipping...');
        return;
    }
    const clientCode = await generateClientCode();
    const family = await prisma.family.create({
        data: {
            phone: '+351912345678',
            waId: '351912345678',
            lang: 'PT',
            clientCode,
            kidsCount: 2,
            consentMarketing: true,
        },
    });
    await prisma.loyaltyCounter.create({
        data: {
            familyId: family.id,
            currentCycleCount: 0,
            totalVisits: 0,
        },
    });
    console.log(`✅ Created test family: ${family.clientCode}`);
}
async function main() {
    try {
        console.log('🌱 Starting database seeding...');
        await seedAdmin();
        await seedMenu();
        await seedTestFamily();
        console.log('✅ Database seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed.js.map