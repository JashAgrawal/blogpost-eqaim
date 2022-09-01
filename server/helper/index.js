const { tags } = require("../utils/index");
const converter = (data) => {
  for (const [key, value] of Object.entries(tags)) {
    data = data.replaceAll(key, value);
  }
  if (data.includes(tags["*img*"])) {
    const url = data.substring(
      data.lastIndexOf(tags["*img*"]) + tags["*img*"].length,
      data.lastIndexOf(tags["*/img*"])
    );
    data = data.replace(url, "");
    data = data.replace("*src*", url);
  }
  return data;
};
module.exports = converter;
