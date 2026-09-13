export class Evaluation {
  constructor({ evaluatorType, overallScore, summary, criteria, strengths, issues, recommendations }) {
    this.evaluatorType = evaluatorType;
    this.overallScore = overallScore;
    this.summary = summary;
    this.criteria = criteria;
    this.strengths = strengths;
    this.issues = issues;
    this.recommendations = recommendations;
    this.createdAt = new Date().toISOString();
  }
}
