// const app = require('./src/app')
import app from "./src/app.js";
import cors from 'cors';

// const PORT = 8000
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
})