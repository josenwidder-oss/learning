import app from './index.js';
import config from "./src/config/env.js";

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});