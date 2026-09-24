import 'dotenv/config';
import { z } from 'zod';

const schema = z
    .object({
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
        PORT: z.coerce.number().int().min(1).max(65535).default(3000),
        APP_URL: z.url(),
        FRONTEND_URL: z.url(),
        DATABASE_URL: z.url(),
        REDIS_URL: z.url(),
        JWT_SECRET: z.string().min(32),
        AFFILIATE_COOKIE_SECRET: z.string().min(32),
        AFFILIATE_COOKIE_DOMAIN: z.string().min(1),
        STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
        STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
    })
    .refine((e) => e.JWT_SECRET !== e.AFFILIATE_COOKIE_SECRET, {
        message: 'must be different from JWT_SECRET',
        path: ['AFFILIATE_COOKIE_SECRET'],
    });

const parsed = schema.safeParse(process.env);

// Fail fast at startup with a readable list of what's wrong
if (!parsed.success) {
    console.error('❌ Invalid environment variables:\n' + z.prettifyError(parsed.error));
    process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
