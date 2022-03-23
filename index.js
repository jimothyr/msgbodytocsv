const fs = require("fs");
const msgReader = require("@kenjiuno/msgreader")["default"];
const { writeToPath } = require("@fast-csv/format");
const options = { headers: true, quoteColumns: true };
const path = "register.csv";
const dataArr = new Array;

//import MsgReader from '@kenjiuno/msgreader'
//open file
fs.readdir("./data", function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  files.forEach(function (file, index) {//loop through files
    const msgFileBuffer = fs.readFileSync("./data/"+file);
    const testMsg = new msgReader(msgFileBuffer);
    const str = testMsg.getFileData()["body"];
    const line = new Object();
    const result = str.split(/\r?\n/);
    result.forEach((element) => {
      if (element != "" && element.indexOf(":") >= 1) {
        out = element.replace(/\t/g, "").split(":"); //sort out data line
        line[out[0]] = out[1];//add to output object
      }
    });
    dataArr.push(line);

  });
  console.log(dataArr)
  writeToPath(path, dataArr, options)//write output object to CSV
  .on("error", (err) => console.error(err))
  .on("finish", () => console.log("Done writing."));
});




