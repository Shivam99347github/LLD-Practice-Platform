import { ProblemRepository } from "../../domain/repositories/ProblemRepository.js";
import { Problem } from "../../domain/entities/Problem.js";

const problems = [
  new Problem({
    id: "parking-lot",
    title: "Parking Lot",
    difficulty: "Easy",
    statement: "Design a parking lot system that can park different types of vehicles and calculate parking fees.",
    requirements: [
      "Support motorcycle, car and truck.",
      "Support different parking spot sizes.",
      "Assign an appropriate available spot.",
      "Generate a ticket when a vehicle enters.",
      "Calculate the fee when the vehicle exits."
    ],
    constraints: [
      "The design should be easy to extend for a new vehicle type.",
      "Avoid putting every responsibility inside ParkingLot."
    ],
    rubric: ["responsibilities", "abstraction", "relationships", "SOLID", "extensibility", "edge cases"]
  }),
  new Problem({
    id: "vending-machine",
    title: "Vending Machine",
    difficulty: "Easy",
    statement: "Design a vending machine that accepts money, lets a user select a product, dispenses the product and returns change.",
    requirements: [
      "Support multiple products.",
      "Track product quantity.",
      "Accept coins/notes.",
      "Return change.",
      "Handle insufficient balance and sold-out products."
    ],
    constraints: [
      "The machine may have different states such as idle, product selected and dispensing.",
      "The design should allow adding new products."
    ],
    rubric: ["responsibilities", "state", "abstraction", "SOLID", "extensibility", "edge cases"]
  }),
  new Problem({
    id: "elevator",
    title: "Elevator System",
    difficulty: "Medium",
    statement: "Design an elevator system for a building with multiple floors and elevators.",
    requirements: [
      "Accept requests from floors.",
      "Move elevators between floors.",
      "Open and close doors.",
      "Assign an elevator to a request.",
      "Handle multiple requests."
    ],
    constraints: [
      "The elevator selection logic should be replaceable.",
      "The system should support multiple elevators."
    ],
    rubric: ["responsibilities", "strategy", "relationships", "SOLID", "extensibility", "edge cases"]
  })
];

export class InMemoryProblemRepository extends ProblemRepository {
  async findAll() {
    return problems;
  }

  async findById(id) {
    return problems.find(p => p.id === id) || null;
  }
}
