import express from "express";

const app = express();
app.use(express.json());

let subjects = [];
let sessions = [];

app.get("/subjects", (req, res) => {
  res.json(subjects);
});

app.post("/subjects", (req, res) => {
  const newSubject = { id: Date.now(), ...req.body };
  subjects.push(newSubject);
  res.status(201).json(newSubject);
});

app.delete("/subjects/:id", (req, res) => {
  const id = parseInt(req.params.id);
  subjects = subjects.filter(s => s.id !== id);
  res.status(204).send();
});

app.get("/sessions", (req, res) => {
  const { subjectId } = req.query;
  let result = sessions;
  if (subjectId) {
    result = result.filter(s => s.subjectId === subjectId);
  }
  res.json(result);
});

app.post("/sessions", (req, res) => {
  const newSession = { id: Date.now(), ...req.body };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.delete("/sessions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sessions = sessions.filter(s => s.id !== id);
  res.status(204).send();
});

app.get("/stats", (req, res) => {
  const totalSubjects = subjects.length;
  const totalSessions = sessions.length;
  res.json({ totalSubjects, totalSessions });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});