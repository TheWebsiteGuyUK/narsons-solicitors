import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
const PORT = 3000;

const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});