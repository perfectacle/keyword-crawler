require('babel-polyfill');
const page = require('webpage').create();
const URI = 'https://www.wanted.co.kr/wdlist/518/872?referer_id=25580'; // infinite URI
const WAIT_TIME = 3; // if network is unstable, increase time.

page.open(URI, () => {
  // previous height
  let base = 0;

  // current height
  let tmp = 0;

  // timer id for stop the interval
  const timerID = setInterval(async() => {
    // evaluate is sandboxed, so evaluate can't access outer context (our app code),
    // only can access in page context (in browser code).
    // and evaluate is sync.
    // first, scroll to bottom.
    // second, return document.body.scrollHeight.
    // third, assign return value to tmp.
    tmp = page.evaluate(() => document.body.scrollTop = document.body.scrollHeight);

    // if previous height and current height isn't same
    if(base !== tmp) {
      console.log(`previous height: ${base}px, current height: ${tmp}px`);
      return base = tmp;
    }

    // if previous height and current height is same
    console.log(`page height is ${base}px`);
    clearInterval(timerID); // stop interval function

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
            if(role) console.log(role[1]);
            if(eligibility) console.log(eligibility[1]);
            if(preference) console.log(preference[1]);
            res();
          }, WAIT_TIME * 1000);
        });
      });
    }
  }, WAIT_TIME * 1000);
});