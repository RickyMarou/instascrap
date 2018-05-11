const { scrap, parseJSON } = require("./main");
const fs = require("fs");

const readFile = file =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

async function testPraseHTML() {
  const html = await readFile("./test/test.html");

  scrap(html);
}

async function testParseJSON() {
  const json = await readFile("./test/data.json");
  console.log(parseJSON(JSON.parse(json)));
}

// testPraseHTML();
testParseJSON();
