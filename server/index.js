import cors from 'cors';
import express from 'express';
import { createBodyLog, createUser, createWorkout } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'sqlite', futureAdapters: ['mysql', 'postgresql'] });
});

app.post('/api/users', (request, response) => {
  response.status(201).json(createUser(request.body));
});

app.post('/api/body-logs', (request, response) => {
  response.status(201).json(createBodyLog(request.body));
});

app.post('/api/workouts', (request, response) => {
  response.status(201).json(createWorkout(request.body));
});

app.listen(port, () => console.log(`FitTrainer API running on ${port}`));
