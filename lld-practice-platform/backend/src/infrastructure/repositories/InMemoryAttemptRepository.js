import { AttemptRepository } from "../../domain/repositories/AttemptRepository.js";

export class InMemoryAttemptRepository extends AttemptRepository {
  constructor() {
    super();
    this.items = new Map();
  }

  async create(attempt) {
    this.items.set(attempt.id, attempt);
    return attempt;
  }

  async findById(id) {
    return this.items.get(id) || null;
  }

  async save(attempt) {
    this.items.set(attempt.id, attempt);
    return attempt;
  }

  async findByLearner(learnerId) {
    return [...this.items.values()].filter(a => a.learnerId === learnerId);
  }
}
