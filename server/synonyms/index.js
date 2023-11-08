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

    /**
     * The following line handles path compression.
     * It makes every node in the path point to the root, or parent, string.
     * This is done to speed up future find operations.
     */

    // If this word isn't the parent of its group...
    if (this.roots[word] !== word) {
      // ...find the parent, and then...
      this.roots[word] = this.find(this.roots[word]);
      // ...directly connect this word to the parent.
    }
    // Now, this word is directly connected to the parent.
    // Next time we want to find its parent, it's just one step away!
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
  findAllSynonyms(word) {
    const synonyms = [];
    const wordRoot = this.find(word);

    if (wordRoot === undefined) {
      return synonyms; // Word not found
    }

    for (const word in this.roots) {
      const rootOfCurrentWord = this.find(word);
      if (rootOfCurrentWord === wordRoot) {
        synonyms.push(word);
      }
    }

    return synonyms;
  }
}
