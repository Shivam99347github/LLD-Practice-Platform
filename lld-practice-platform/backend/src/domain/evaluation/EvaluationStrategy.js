export class EvaluationStrategy {
  async evaluate(submission, problem) {
    throw new Error("EvaluationStrategy.evaluate() must be implemented.");
  }
}
