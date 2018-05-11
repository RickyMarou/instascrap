const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}${path}`, data, err => {
      if (err) reject(err);
      resolve();
    });
  });

function trimString(str, toTrim) {
  if (toTrim === "]") toTrim = "\\]";
  if (toTrim === "\\") toTrim = "\\\\";
  return str.replace(
    new RegExp("^[" + toTrim + "]+|[" + toTrim + "]+$", "g"),
    ""
  );
}

async function main(params) {
  // const page = await axios.get("https://www.instagram.com/ra_vide/");
  const { data: page } = await axios.get("https://www.instagram.com/ra_vide/");
  try {
    await writeFile("/test/test.html", page);
  } catch (e) {
    console.error(e);
  }
  // console.log({ page });
  // parseHTML(page);
}

main();

function scrap(html) {
  const $ = cheerio.load(html);
  $("script")
    .toArray()
    .forEach(function(script) {
      const scriptContent = $(script).html();
      if (scriptContent.startsWith("window._sharedData")) {
        const data = trimString(
          scriptContent.split("window._sharedData =")[1],
          ";"
        );

        return parseJSON(JSON.parse(data));
      }
    });
}

function parseJSON(json) {
  return json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(
    ({ node }) => {
      return node.display_url;
    }
  );
}

module.exports = {
  scrap,
  parseJSON
};
