import fs from 'fs';
import {morphemeParser} from './morphemeParser';
import {getDate} from './util';

const date = getDate(new Date());
const txtFiles = [`${__dirname}/${date}/role.txt`, `${__dirname}/${date}/eligibility.txt`, `${__dirname}/${date}/preference.txt`];

const countKeyword = (lines, fileName) => {
  const words = {};
  lines.forEach(([w, h]) => {
    // NNG and NNP is noun, SL is foreign Language
    if(['NNG', 'NNP', 'SL'].some(v => v === h)) {
      // count word
      if(words[w] === undefined) {
        words[w] = 1;
      } else {
        words[w]++;
      }
    }
  });

  // word sorting by frequency
  const list = Object.entries(words).map(([k, v]) => ({
    word: k,
    nums: v
  }));
  list.sort((a, b) => b.nums - a.nums);

  // make json
  const json = JSON.stringify(list);
  fs.writeFileSync(`${__dirname}/${date}/${fileName}.json`, json, 'utf8');

  // remove origin text file
  fs.unlinkSync(`${__dirname}/${date}/${fileName}.txt`);
};


for(const txtFile of txtFiles) morphemeParser(txtFile, countKeyword);
