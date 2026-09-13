import crypto from "node:crypto";
import { Attempt } from "../../domain/entities/Attempt.js";

export class PracticeService {
  constructor({ problemRepository, attemptRepository, evaluator }) {
    this.problemRepository = problemRepository;
    this.attemptRepository = attemptRepository;
    this.evaluator = evaluator;
  }

  async listProblems() {
    return this.problemRepository.findAll();
  }

  async getProblem(id) {
    const problem = await this.problemRepository.findById(id);
    if (!problem) throw Object.assign(new Error("Problem not found"), { status: 404 });
    return problem;
  }

  async startAttempt(problemId, learnerId = "demo-user") {
    const problem = await this.getProblem(problemId);
    const attempt = new Attempt({
      id: crypto.randomUUID(),
      problemId: problem.id,
      learnerId
    });
    return this.attemptRepository.create(attempt);
  }

  async getAttempt(id) {
    const attempt = await this.attemptRepository.findById(id);
    if (!attempt) throw Object.assign(new Error("Attempt not found"), { status: 404 });
    return attempt;
  }

  async saveAttempt(id, submission) {
    const attempt = await this.getAttempt(id);
    attempt.saveSubmission(submission);
    return this.attemptRepository.save(attempt);
  }

  async submitAttempt(id) {
    const attempt = await this.getAttempt(id);
    const problem = await this.getProblem(attempt.problemId);

    attempt.submit();
    await this.attemptRepository.save(attempt);

    attempt.startEvaluation();
    await this.attemptRepository.save(attempt);

    try {
      const evaluation = await this.evaluator.evaluate(attempt.submission, problem);
      attempt.completeEvaluation(evaluation);
      return this.attemptRepository.save(attempt);
    } catch (error) {
      attempt.failEvaluation();
      await this.attemptRepository.save(attempt);
      throw error;
    }
  }

  async history(learnerId = "demo-user") {
    return this.attemptRepository.findByLearner(learnerId);
  }
}
