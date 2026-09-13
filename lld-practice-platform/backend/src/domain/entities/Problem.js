export class Problem {
  constructor({ id, title, difficulty, statement, requirements, constraints, rubric }) {
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.statement = statement;
    this.requirements = requirements;
    this.constraints = constraints;
    this.rubric = rubric;
  }
}
