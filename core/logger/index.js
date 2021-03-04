const { loggerCreate } = require("../../config/logger");
const winston = loggerCreate()
const { loggerConstant } = require("./loggerConstant");

class logger {
    error(error) {
        winston.log({
            message: error,
            label: this.getFixedPathFile(),
            level: loggerConstant.LOG_LEVEL_ERROR,
        });
    }

    info(message) {
        winston.log({
            message,
            label: this.getFixedPathFile(),
            level: loggerConstant.LOG_LEVEL_INFO,
        });
    }

    debug(message) {
        winston.log({
            message: `###${message}`,
            label: this.getFixedPathFile(),
            level: loggerConstant.LOG_LEVEL_DEBUG,
        });
    }

    getFixedPathFile() {
        try {
            throw new Error();
        } catch (e) {
            let path = e.stack.split("at");
            path = e.stack.split("at").length > 6 ? path[4].match(/\((.*)\)/)[1].split(/\\|\//) : path[4].split("/");
            return `${path[path.length - 2]}/${path[path.length - 1]}`.trim();
        }
    }
}

module.exports = {
    logger
}
