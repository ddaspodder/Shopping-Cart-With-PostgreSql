const fs = require("fs/promises");
const AppError = require("./appError");
const path = require("path");

const rootPath = process.cwd();

const resolvePath = (fileName) =>
  path.resolve(rootPath, "src", "data", fileName);

const getData = (fileName) => {
  return fs
    .readFile(resolvePath(fileName), "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      throw new AppError("Error reading data", 500);
    });
};

const save = async (fileName, data) => {
  const filePath = resolvePath(fileName);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  return fs
    .writeFile(filePath, JSON.stringify(data))
    .then(() => {
      return data;
    })
    .catch((err) => {
      throw new AppError("Error saving data", 500);
    });
};

module.exports = { getData, save };
