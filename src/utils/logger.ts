import { id } from 'cls-rtracer';
import { format  } from 'logform/dist/browser';
import { createLogger, transports } from 'winston';

const { combine, timestamp, printf } = format;

const rTracerFormat = printf((info) => {
    const rid = id();
    return rid
        ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
        : `${info.timestamp} [NO_REQUEST_ID]: ${info.message}`;
});

const options = {
    console: {
        stderrLevels: ['info', 'error', 'debug', 'warning'],
    },
};

export const logger = createLogger({
    format: combine(
        timestamp(),
        rTracerFormat,
    ),
    transports: [new transports.Console(options.console)],
});
