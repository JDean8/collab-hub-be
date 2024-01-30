const { server } = require("./dist/api.js");
const { PORT = 3000 } = process.env;

server.listen(PORT, () => console.log(`Listening on ${PORT}...`));
