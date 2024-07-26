import {App} from "./server";

const PORT = process.env.PORT || 9999;
App.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
