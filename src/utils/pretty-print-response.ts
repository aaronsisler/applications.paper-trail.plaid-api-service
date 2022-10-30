const util = require("util");

const prettyPrintResponse = (response: any) => {
  console.log(util.inspect(response.data, { colors: true, depth: 2 }));
};

export { prettyPrintResponse };
