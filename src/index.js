require("dotenv/config")
// import { App } from "./server";
const App = require("./server");
const PORT = process.env.SERVER_PORT || 4444;
App.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
