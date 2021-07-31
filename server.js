const app = require("./app");
const server = require("http").createServer(app);
var port = process.env.PORT || 3030;
server.listen(port, (_) => console.log(`Server listening at port ${port}`));