import { config } from 'dotenv';
import Joi from '@hapi/joi';

const requiredEnvs = {
};

const optionsEnvs = {
    NODE_ENV: Joi.string()
        .valid('local', 'development', 'production', 'staging')
        .default('development'),
    PORT: Joi.number().port().default(3000),
    APP_VERSION: Joi.string().default('1.00.0'),
};

const envs = {
    ...requiredEnvs,
    ...optionsEnvs,
};

if (process.env.NODE_ENV !== 'production') {
    const envConfig = config({ path: `.env.${process.env.NODE_ENV}` });
    const env = envConfig.parsed || {};

    process.env = {
        ...env,
        ...process.env,
    };
}

const validateAndReturnTypedEnv = () => {
    const keys = Object.keys(envs);
    const globalEnvs: { [key: string]: any } = {};
    keys.forEach(key => {
        globalEnvs[key] = process.env[key];
    });
    const { error, value } = Joi.object(requiredEnvs).concat(Joi.object(optionsEnvs))
        .validate(globalEnvs, { allowUnknown: false, abortEarly: true });
    if (error) {
        throw new Error(error.message);
    }
    return value as { [key in keyof typeof envs]: any };
};

export const typedEnv = validateAndReturnTypedEnv();
