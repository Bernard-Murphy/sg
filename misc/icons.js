const { favicons } = require("favicons");
const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(__dirname + "/sg.png");
const iconDirectory = path.join(__dirname, "..", "ui", "public", "icons");

if (!fs.existsSync(iconDirectory)) fs.mkdirSync(iconDirectory);

favicons(source).then(async (res) => {
  res.images.forEach((image) =>
    fs.writeFileSync(iconDirectory + "/" + image.name, image.contents)
  );
});
