import test from "node:test";
import assert from "node:assert/strict";
import { Attempt, AttemptStatus } from "../src/domain/entities/Attempt.js";

test("attempt starts in progress", () => {
  const a = new Attempt({ id: "1", problemId: "parking-lot" });
  assert.equal(a.status, AttemptStatus.IN_PROGRESS);
});

test("empty submission cannot be submitted", () => {
  const a = new Attempt({ id: "1", problemId: "parking-lot" });
  assert.throws(() => a.submit(), /empty design/);
});

test("submitted attempt enters submitted state", () => {
  const a = new Attempt({ id: "1", problemId: "parking-lot" });
  a.saveSubmission({ designText: "ParkingLot manages spots." });
  a.submit();
  assert.equal(a.status, AttemptStatus.SUBMITTED);
});

test("completed attempt cannot be edited", () => {
  const a = new Attempt({ id: "1", problemId: "parking-lot" });
  a.saveSubmission({ designText: "ParkingLot manages spots." });
  a.submit();
  a.startEvaluation();
  a.completeEvaluation({ overallScore: 70 });
  assert.throws(() => a.saveSubmission({ designText: "changed" }), /in-progress/);
});
