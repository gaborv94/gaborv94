import Database from 'better-sqlite3';

const db = new Database(process.env.SQLITE_PATH || 'fittrainer.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    sex TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    weight REAL NOT NULL,
    height REAL NOT NULL,
    activity_level TEXT NOT NULL,
    goal TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS body_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT NOT NULL,
    weight REAL NOT NULL,
    height REAL NOT NULL,
    waist REAL,
    hip REAL,
    chest REAL,
    arm REAL,
    thigh REAL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    routine TEXT NOT NULL,
    duration INTEGER NOT NULL,
    calories REAL NOT NULL,
    exercises INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

export function createUser(user) {
  const statement = db.prepare(`
    INSERT INTO users (first_name, last_name, email, sex, birthdate, weight, height, activity_level, goal)
    VALUES (@firstName, @lastName, @email, @sex, @birthdate, @weight, @height, @activityLevel, @goal)
  `);
  const result = statement.run(user);
  return { id: result.lastInsertRowid, ...user };
}

export function createBodyLog(bodyLog) {
  const statement = db.prepare(`
    INSERT INTO body_logs (user_id, date, weight, height, waist, hip, chest, arm, thigh, notes)
    VALUES (@userId, @date, @weight, @height, @waist, @hip, @chest, @arm, @thigh, @notes)
  `);
  const result = statement.run({ userId: null, notes: '', ...bodyLog });
  return { id: result.lastInsertRowid, ...bodyLog };
}

export function createWorkout(workout) {
  const statement = db.prepare(`
    INSERT INTO workouts (user_id, date, time, routine, duration, calories, exercises)
    VALUES (@userId, @date, @time, @routine, @duration, @calories, @exercises)
  `);
  const result = statement.run({ userId: null, ...workout });
  return { id: result.lastInsertRowid, ...workout };
}
