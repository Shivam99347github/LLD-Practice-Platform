import { useEffect, useState } from "react";
import { api } from "./api";

const emptySubmission = {
  designText: "",
  codeText: "",
  diagramUrl: ""
};

function App() {
  const [screen, setScreen] = useState("problems");
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [submission, setSubmission] = useState(emptySubmission);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProblems();
  }, []);

  async function loadProblems() {
    try {
      const result = await api.problems();
      setProblems(result.data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function openProblem(p) {
    setError("");
    setProblem(p);
    setScreen("detail");
  }

  async function start(p) {
    try {
      setError("");
      const result = await api.startAttempt(p.id);
      setAttempt(result.data);
      setSubmission(emptySubmission);
      setScreen("practice");
    } catch (e) { setError(e.message); }
  }

  async function save() {
    try {
      const result = await api.saveAttempt(attempt.id, submission);
      setAttempt(result.data);
      alert("Draft saved");
    } catch (e) { setError(e.message); }
  }

  async function submit() {
    try {
      setError("");
      const result = await api.saveAttempt(attempt.id, submission);
      const submitted = await api.submitAttempt(result.data.id);
      setAttempt(submitted.data);
      setScreen("feedback");
    } catch (e) { setError(e.message); }
  }

  async function loadHistory() {
    try {
      setError("");
      const result = await api.history();
      setHistory(result.data);
      setScreen("history");
    } catch (e) { setError(e.message); }
  }

  async function viewAttempt(a) {
    try {
      const result = await api.getAttempt(a.id);
      const foundProblem = await api.problem(result.data.problemId);
      setAttempt(result.data);
      setProblem(foundProblem.data);
      setScreen(result.data.status === "COMPLETED" ? "feedback" : "practice");
      if (result.data.submission) setSubmission(result.data.submission);
    } catch (e) { setError(e.message); }
  }

  if (loading) return <main className="center">Loading...</main>;

  return (
    <div className="app">
      <header>
        <div>
          <h1>LLD Practice</h1>
          <p>Practice. Submit. Understand. Improve.</p>
        </div>
        <nav>
          <button onClick={() => setScreen("problems")}>Problems</button>
          <button onClick={loadHistory}>History</button>
        </nav>
      </header>

      {error && <div className="error">{error}</div>}

      <main>
        {screen === "problems" && (
          <section>
            <div className="hero">
              <span className="eyebrow">LOW-LEVEL DESIGN</span>
              <h2>Choose a problem and start designing.</h2>
              <p>Get structured feedback on responsibilities, abstraction, relationships, SOLID, extensibility and edge cases.</p>
            </div>
            <div className="grid">
              {problems.map(p => (
                <article className="card" key={p.id}>
                  <span className="badge">{p.difficulty}</span>
                  <h3>{p.title}</h3>
                  <p>{p.statement}</p>
                  <button className="primary" onClick={() => openProblem(p)}>View problem →</button>
                </article>
              ))}
            </div>
          </section>
        )}

        {screen === "detail" && problem && (
          <section className="panel">
            <button className="back" onClick={() => setScreen("problems")}>← Problems</button>
            <span className="badge">{problem.difficulty}</span>
            <h2>{problem.title}</h2>
            <p>{problem.statement}</p>
            <h3>Requirements</h3>
            <ul>{problem.requirements.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h3>Constraints</h3>
            <ul>{problem.constraints.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <button className="primary" onClick={() => start(problem)}>Start practice</button>
          </section>
        )}

        {screen === "practice" && problem && (
          <section>
            <div className="practice-head">
              <div><span className="eyebrow">PRACTICE</span><h2>{problem.title}</h2></div>
              <span className="status">{attempt?.status}</span>
            </div>
            <div className="workspace">
              <aside className="panel statement">
                <h3>Problem</h3>
                <p>{problem.statement}</p>
                <h4>Requirements</h4>
                <ul>{problem.requirements.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </aside>
              <div className="panel editor">
                <label>Classes & responsibilities *</label>
                <textarea
                  value={submission.designText}
                  onChange={e => setSubmission({...submission, designText:e.target.value})}
                  placeholder={"Example:\nParkingLot - coordinates parking spots and availability.\nParkingSpot - represents one spot and knows its size.\nVehicle - base abstraction for vehicle types..."}
                />
                <label>Code / pseudocode (optional)</label>
                <textarea
                  value={submission.codeText}
                  onChange={e => setSubmission({...submission, codeText:e.target.value})}
                  placeholder="Paste important classes or pseudocode here..."
                />
                <label>Diagram URL (optional)</label>
                <input
                  value={submission.diagramUrl}
                  onChange={e => setSubmission({...submission, diagramUrl:e.target.value})}
                  placeholder="https://..."
                />
                <div className="actions">
                  <button onClick={save}>Save draft</button>
                  <button className="primary" onClick={submit}>Submit & evaluate</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {screen === "feedback" && attempt?.evaluation && (
          <section className="panel">
            <div className="score-row">
              <div><span className="eyebrow">EVALUATION COMPLETE</span><h2>Your feedback</h2></div>
              <div className="score">{attempt.evaluation.overallScore}<small>/100</small></div>
            </div>
            <p className="summary">{attempt.evaluation.summary}</p>

            <h3>Criteria</h3>
            <div className="criteria">
              {attempt.evaluation.criteria.map(c => (
                <div className="criterion" key={c.name}>
                  <div><b>{c.name}</b><span>{c.score}/{c.weight}</span></div>
                  <div className="bar"><i style={{width:`${(c.score/c.weight)*100}%`}} /></div>
                  <p>{c.feedback}</p>
                </div>
              ))}
            </div>

            <div className="feedback-cols">
              <div><h3>Strengths</h3><ul>{attempt.evaluation.strengths.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
              <div><h3>Improve next</h3><ul>{attempt.evaluation.recommendations.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
            </div>

            <div className="actions">
              <button onClick={() => start(problem)}>Try again</button>
              <button className="primary" onClick={loadHistory}>View history</button>
            </div>
          </section>
        )}

        {screen === "history" && (
          <section>
            <div className="hero compact"><span className="eyebrow">PROGRESS</span><h2>Attempt history</h2><p>Review previous designs and feedback.</p></div>
            {history.length === 0 ? (
              <div className="panel empty">No attempts yet. Solve your first problem.</div>
            ) : (
              <div className="history">
                {history.map(a => (
                  <button className="history-item" key={a.id} onClick={() => viewAttempt(a)}>
                    <span>{a.problemId}</span>
                    <b>{a.status}</b>
                    <strong>{a.evaluation?.overallScore ?? "—"}{a.evaluation ? "/100" : ""}</strong>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
