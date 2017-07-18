# keyword crawler
This is keyword crawler for node.js with phantomjs-prebuilt.  
This crawler fit to infinite scroll page, not pagination page.  
[grpah for crawled and morpheme parsing contents](https://perfectacle.github.io/crawl-temp/)

## installation
```bash
npm i
```

### morpheme parser(korean)
* [mecab-ko](https://bitbucket.org/eunjeon/mecab-ko/)  
* [mecab-ko-dic](https://bitbucket.org/eunjeon/mecab-ko-dic)

## develop
### first, run task runner(gulp)
1. eslint  
2. babel

```bash
npm run dev
```
If you want to run another task,  
Let's edit npm script in package.json or  
run below command. (npm v5.2.0 or higher)
```bash
npx gulp TASK_NAME
```

### second, write your crawler code
1. crawler code (/src/crawlContents.js)  
2. crawled content's morpheme parsing code(/src/morphemeParser.js)  
3. count morpheme word code(/src/countKeyword.js)  

If you don't know how to write upper codes,
Let's see code in demo directory. (It is korean recruitments site sample.)

### run crawler(phantomjs-prebuilt)
```bash
npm start
```

If you want to run another crawler,  
Let's edit npm script in package.json or  
run below command. (npm v5.2.0 or higher)  
```bash
npx phantomjs ANOTHER_CRAWLER.js
```

### run crawler demo
```bash
npm test
```