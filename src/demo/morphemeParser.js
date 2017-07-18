import fs from 'fs';
import _execSync from 'child_process';
const execSync = _execSync.execSync;

export const morphemeParser = (txtFile, cb) => {
  const date = getDate(new Date()); // YYYY-MM-DD
  const fileName = txtFile.split('/').slice(-1)[0].replace('.txt', ''); // file name except extension
  const output = `${__dirname}/${date}/tmp-${fileName}.txt`;
  const cmd = `mecab ${txtFile} --output=${output}`;
  const opt = {encoding: 'utf-8'};
  let res;

  try { // morpheme parsing text file make for reading.
    execSync(cmd, opt);
    res = fs.readFileSync(output, 'utf-8');
  } catch(e) { console.log(e); }

  // reading text make prettier
  res = res.replace(/\r/g, '');
  res = res.replace(/\s+$/g, '');
  const lines = res.split('\n');
  res = lines.map(v => v.replace('\t', ',').split(','));

  // remove morpheme parsing text files
  fs.unlinkSync(output);

  cb(res, fileName);
};