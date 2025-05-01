import web from "./application/web";
import config from "./application/config";
import {logger} from "./application/logger";

const port: number = config.port;

web.listen(port, () => {
    logger.info(`App started on port ${port}`);
});
