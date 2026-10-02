const fs = require("fs/promises");
const path = require("path");

const pathofFile = path.join(__dirname, "..", "db.json");

async function readData() {
  try {
    let data = await fs.readFile(pathofFile, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function writeData(products) {
  try {
    await fs.writeFile(pathofFile, JSON.stringify(products, null, 2), {
      encoding: "utf8",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function delayReadData() {
  await new Promise((res, rej) => {
    setTimeout(res, 1500);
  });
  return await readData();
}

module.exports = { readData, writeData, delayReadData };