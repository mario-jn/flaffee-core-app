import webStatic from './application/image-service';
import config from './application/config';
import { logger } from './application/logger';

const port: number = config.imgPort;

webStatic.listen(port, () => {
    logger.info(`App started on port ${port}`);
});
