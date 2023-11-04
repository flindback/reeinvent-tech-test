import { expect, test } from "bun:test";
import { addSynonym, checkIfSynonym } from ".";

test("Add synonyms", () => {
  expect(addSynonym("wash", "clean")).toBe(true);
});

test("Check if two words are synonyms", () => {
  addSynonym("wash", "clean");
  expect(checkIfSynonym("wash", "clean")).toBe(true);
});

test("Test that if A is a synonym to B, and B is a synonym to C, C has to be a synonym to A.", () => {
  addSynonym("wash", "clean");
  addSynonym("wash", "tidy");
  expect(checkIfSynonym("wash", "clean")).toBe(true);
  expect(checkIfSynonym("clean", "tidy")).toBe(true);
});
