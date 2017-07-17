const page = require('webpage').create();
const URI = ''; // infinite URI

page.open(URI, () => {
  // previous height
  let base = 0;

  // current height
  let tmp = 0;

  // timer id for stop the interval
  const timerID = setInterval(() => {
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
    page.render('screen.png'); // capture
    clearInterval(timerID); // stop interval function
    phantom.exit(); // phantom close.

    // if network is unstable, increase time.
  }, 2000);
});