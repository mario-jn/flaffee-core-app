import web from "./application/web";
import config from "./application/config";
const port = config.port;

web.listen(port, () => {
    console.log(`App started on port ${port}`);
})