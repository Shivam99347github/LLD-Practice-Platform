import { InMemoryProblemRepository } from "../infrastructure/repositories/InMemoryProblemRepository.js";
import { InMemoryAttemptRepository } from "../infrastructure/repositories/InMemoryAttemptRepository.js";
import { RuleBasedEvaluator } from "../domain/evaluation/RuleBasedEvaluator.js";
import { PracticeService } from "./services/PracticeService.js";

const problemRepository = new InMemoryProblemRepository();
const attemptRepository = new InMemoryAttemptRepository();
const evaluator = new RuleBasedEvaluator();

export const practiceService = new PracticeService({
  problemRepository,
  attemptRepository,
  evaluator
});
