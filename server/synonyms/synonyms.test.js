import { expect, test } from "bun:test";
import { SynonymsService } from ".";

test("Add synonyms", () => {
  const synonyms = new SynonymsService();
  expect(synonyms.add(["wash", "clean"])).toBe(true);
});

test("Check if two words are synonyms", () => {
  const synonyms = new SynonymsService();
  synonyms.add(["wash", "clean"]);
  expect(synonyms.areSynonyms("wash", "clean")).toBe(true);
});

test("Test that if A is a synonym to B, and B is a synonym to C, C has to be a synonym to A.", () => {
  const synonyms = new SynonymsService();
  synonyms.add(["wash", "clean"]);
  synonyms.add(["wash", "tidy"]);
  expect(synonyms.areSynonyms("wash", "clean")).toBe(true);
  expect(synonyms.areSynonyms("clean", "tidy")).toBe(true);
});

test("Find all synonyms for a word", () => {
  const synonyms = new SynonymsService();
  synonyms.add(["wash", "clean"]);
  synonyms.add(["wash", "tidy"]);
  expect(synonyms.findAllSynonyms("wash")).toEqual(["wash", "clean", "tidy"]);
});
