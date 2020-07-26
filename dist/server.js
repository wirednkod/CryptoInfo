"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger_1 = require("./middleware/logger");
const basic_1 = require("./routers/basic");
const gecko_1 = require("./routers/gecko");
const app_1 = require("./app");
dotenv.config();
const app = new app_1.default({
    port: parseInt(process.env.PORT || '8000', 10),
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        cors(),
        helmet(),
        logger_1.default,
    ],
    routes: [
        basic_1.default,
        gecko_1.default,
    ],
});
app.listen();
//# sourceMappingURL=server.js.map