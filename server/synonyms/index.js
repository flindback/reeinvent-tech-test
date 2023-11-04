export class SynonymsService {
  constructor() {
    this.roots = {}; // Key-value pairs of word: root-word
  }
  areSynonyms(word, synonym) {
    if (this.find(word) === undefined || this.find(synonym) === undefined) {
      return false; // One or both words do not exist in set
    }
    return this.find(word) === this.find(synonym);
  }

  add(synonyms) {
    if (synonyms.length < 2) {
      console.log("You need to provide at least two synonyms!");
      return false;
    }
    synonyms.map((synonym) => {
      this.makeSet(synonym);
      this.union(synonyms[0], synonym);
    });
    return true;
  }

  makeSet(word) {
    if (this.roots[word] === undefined) {
      this.roots[word] = word;
    }
  }

  find(word) {
    if (this.roots[word] === undefined) return undefined;

    if (this.roots[word] !== word) {
      this.roots[word] = this.find(this.roots[word]);
    }
    return this.roots[word];
  }

  union(word, synonym) {
    // Ensure both elements exist
    if (this.roots[word] === undefined || this.roots[synonym] === undefined) {
      console.log("One or both elements are not initialized!");
      return;
    }

    const wordRoot = this.find(word);
    const synonymRoot = this.find(synonym);

    if (wordRoot !== synonymRoot) {
      // Only merge if they are in different sets
      this.roots[synonymRoot] = wordRoot;
    }
  }
}
