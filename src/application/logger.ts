import winston from "winston"
import "winston-daily-rotate-file"
import config from "./config";

class Logger {
    private static _instance: winston.Logger;

    public static getInstance(): winston.Logger{
        if(!Logger._instance) {
            this._instance = this.createLoggerInstance();
        }
        return this._instance;
    }

    private static createLoggerInstance(): winston.Logger {
        const transports: winston.transport[] = [
            new winston.transports.DailyRotateFile({
                filename: config.log.filename,
                dirname: config.log.dirname,
                datePattern: config.log.datePattern,
                zippedArchive: true,
                maxSize: config.log.maxSize,
                maxFiles: config.log.maxFiles,
                format: this.fileFormat,
            })
        ];

        if(config.env !== "production") {
            transports.push(new winston.transports.Console({
                level: "debug",
                format: this.consoleFormat,
            }));
        }

        return winston.createLogger({
            level: "info",
            transports: transports,
        });
    }

    private static readableFormat = winston.format.printf(({level, message, timestamp, ...metadata}) => {
        const meta = Object.keys(metadata).length ? JSON.stringify(metadata) : "";
        return `${timestamp} [${level}]: ${message} ${meta}`;
    });

    private static consoleFormat = winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.colorize(),
        this.readableFormat,
    );

    private static fileFormat = winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.json(),
    );

}

export const logger = Logger.getInstance();
