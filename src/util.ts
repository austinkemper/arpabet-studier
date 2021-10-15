import { dictionary } from 'cmu-pronouncing-dictionary'
import { words } from './words';

const cmuSuffixes = ['', '(1)', '(2)', '(3)', '(4)', '(5)'];

const phonesForWord = (word: string): string[] => {
  const result: string[] = [];
  const keys = cmuSuffixes.map((suffix) => word + suffix);
  keys.forEach((key) => {
    const dictEntry = dictionary[key];
    if (dictEntry !== undefined) {
      result.push(dictEntry);
    }
  });

  return result;
};

const stripAccent = (phones: string) => {
  return phones.replace(/\d/g, '');
}

export const strippedPhonesForWord = (word: string): string[] => {
  return phonesForWord(word).map(stripAccent);
}

let quizWordIndex = Math.floor(Math.random() * words.length);
export const getNextQuizWord = (): string => {
  quizWordIndex++;
  quizWordIndex = quizWordIndex % words.length;
  return words[quizWordIndex];
};

export const getNextQuizWordThatHasPhones = (): string => {
  let candidate = getNextQuizWord();
  while (phonesForWord(candidate).length === 0) {
    candidate = getNextQuizWord();
  }
  return candidate;
}
