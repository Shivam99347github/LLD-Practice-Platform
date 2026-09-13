export const AttemptStatus = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  SUBMITTED: "SUBMITTED",
  EVALUATING: "EVALUATING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
});

export class Attempt {
  constructor({ id, problemId, learnerId = "demo-user", status = AttemptStatus.IN_PROGRESS, submission = null, evaluation = null, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.problemId = problemId;
    this.learnerId = learnerId;
    this.status = status;
    this.submission = submission;
    this.evaluation = evaluation;
    this.createdAt = createdAt;
  }

  saveSubmission(submission) {
    if (this.status !== AttemptStatus.IN_PROGRESS) {
      throw new Error("Only an in-progress attempt can be edited.");
    }
    if (!submission.designText?.trim()) {
      throw new Error("Design explanation is required.");
    }
    this.submission = submission;
  }

  submit() {
    if (!this.submission?.designText?.trim()) {
      throw new Error("Cannot submit an empty design.");
    }
    this.status = AttemptStatus.SUBMITTED;
  }

  startEvaluation() {
    if (this.status !== AttemptStatus.SUBMITTED) {
      throw new Error("Only a submitted attempt can be evaluated.");
    }
    this.status = AttemptStatus.EVALUATING;
  }

  completeEvaluation(evaluation) {
    this.evaluation = evaluation;
    this.status = AttemptStatus.COMPLETED;
  }

  failEvaluation() {
    this.status = AttemptStatus.FAILED;
  }
}
