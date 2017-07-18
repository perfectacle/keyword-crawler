// this file test for crawl(not infinite scroll)

import 'babel-polyfill';
import _page from 'webpage';
import fs from 'fs';
import {getDate} from './util';

const page = _page.create();
const URI = 'https://www.wanted.co.kr/wdlist/518/872?referer_id=25580'; // infinite URI
const WAIT_TIME = 3; // if network is unstable, increase time.

page.open(URI, async() => {
  // querySelectorAll isn't work correctly
  // querySelectorAll is ArrayLike Object,
  // It contains all of elementList, but It is only contain first element(0 index)
  // the other elementList is null,
  // so, It used to get the number of recruitments
  const _recruitments = page.evaluate(() => (
    document.querySelectorAll('#job > div.container > div:nth-child(2) > div > div > div > a')
  ));

  // It is used to save recruitments link.
  const recruitments = [];

  // save All recruitment link
  for(let i=0, len=_recruitments.length; i<len; i++) {
    recruitments.push(
      // evaluate is sandboxed, so evaluate can't access outer context (our app code),
      // but it can use our code.
      // Let's see below code :)
      page.evaluate(i => ( // use arguments
        document.querySelector(`#job > div.container > div:nth-child(2) > div > div > div:nth-child(${i+1}) > a`).href
      ), i) // pass arguments
    );
  }

  const path = ['./role.txt', './eligibility.txt', './preference.txt'];
  const seperateLine = '\n-------------------------------------------------------------\n';
  const date = getDate(new Date());

  // async/await isn't work correctly in array iterate method
  for(let i=0, len=recruitments.length; i<=len; i++) {
    await new Promise(res => {
      if(i===len) {
        phantom.exit(); // phantom close.
      }
      page.open(recruitments[i], () => {
        setTimeout(() => {
          const contents = page.evaluate(() => (
            document.querySelector('#job-detail-content > div.job-info > div.content.description > span').innerText
          ));
          const role = /주요업무\s((\s|\S)+(?=\s+자격요건))/.exec(contents);
          const eligibility = /자격요건\s((\s|\S)+(?=\s+우대사항))/.exec(contents);
          const preference = /우대사항\s((\s|\S)+(?=\s+혜택 및 복지))/.exec(contents);
          console.log(recruitments[i]);
          if(role) {
            fs.write(`./dist/demo/${date}/${path[0]}`, role[1]+seperateLine, 'a+');
            console.log(role[1]);
          }
          if(eligibility) {
            fs.write(`./dist/demo/${date}/${path[1]}`, eligibility[1]+seperateLine, 'a+');
            console.log(eligibility[1]);
          }
          if(preference) {
            fs.write(`./dist/demo/${date}/${path[2]}`, preference[1]+seperateLine, 'a+');
            console.log(preference[1]);
          }
          res();
        }, WAIT_TIME * 1000); // wait time for page redirect
      });
    });
  }
});