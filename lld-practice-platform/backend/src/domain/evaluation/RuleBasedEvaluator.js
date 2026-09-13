import { Evaluation } from "../entities/Evaluation.js";
import { EvaluationStrategy } from "./EvaluationStrategy.js";

export class RuleBasedEvaluator extends EvaluationStrategy {
  async evaluate(submission, problem) {
    const text = `${submission.designText || ""}\n${submission.codeText || ""}`.toLowerCase();

    const checks = [
      {
        name: "Responsibilities",
        weight: 20,
        pass: /responsib|class|service|manager/.test(text),
        good: "You have started describing classes and responsibilities.",
        bad: "Clearly list important classes and give each class one focused responsibility."
      },
      {
        name: "Abstraction",
        weight: 15,
        pass: /interface|abstract|abstraction/.test(text),
        good: "The design mentions an abstraction.",
        bad: "Explain where an interface or abstraction is useful and why."
      },
      {
        name: "Relationships",
        weight: 15,
        pass: /has-a|uses|association|composition|aggregation|relationship|dependency/.test(text),
        good: "Relationships between objects are considered.",
        bad: "Describe important relationships such as association, composition, or dependency."
      },
      {
        name: "SOLID / maintainability",
        weight: 15,
        pass: /solid|single responsibility|open\/closed|dependency inversion|loose coupling/.test(text),
        good: "You have considered maintainability or SOLID.",
        bad: "Explain at least one relevant SOLID principle and how your design follows it."
      },
      {
        name: "Extensibility",
        weight: 20,
        pass: /extend|extens|new vehicle|new type|future|strategy|factory|change/.test(text),
        good: "The design considers future changes.",
        bad: "Explain how the design handles a likely requirement change."
      },
      {
        name: "Behaviour / edge cases",
        weight: 15,
        pass: /edge case|error|exception|invalid|full|empty|not found|failure/.test(text),
        good: "You have considered behaviour or edge cases.",
        bad: "Mention important failure and edge cases and how the objects respond."
      }
    ];

    const criteria = checks.map(c => ({
      name: c.name,
      weight: c.weight,
      score: c.pass ? c.weight : Math.round(c.weight * 0.35),
      feedback: c.pass ? c.good : c.bad
    }));

    const overallScore = Math.round(criteria.reduce((sum, c) => sum + c.score, 0));
    const strengths = criteria.filter(c => c.score >= c.weight * 0.7).map(c => c.feedback);
    const issues = criteria.filter(c => c.score < c.weight * 0.7).map(c => c.feedback);
    const recommendations = issues.slice(0, 4);

    return new Evaluation({
      evaluatorType: "RULE_BASED",
      overallScore,
      summary: overallScore >= 70
        ? "Good starting design. Focus on making responsibilities and trade-offs more explicit."
        : "Your design has a workable starting point, but several LLD decisions need clearer explanation.",
      criteria,
      strengths,
      issues,
      recommendations
    });
  }
}
