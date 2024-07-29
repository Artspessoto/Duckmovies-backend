const env = process.env.NODE_ENV === "production" ? "prod.env" : ".env.example";
require("dotenv").config({ path: env })

const App = require("./server");
const PORT = process.env.SERVER_PORT || 4444;
App.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
