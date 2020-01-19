const express = require("express");
const app = express();
const mongoose = require("mongoose");
const body = require("body-parser");
const cros = require("cors");
const excel = require("exceljs");
const varModel = mongoose.model("collection", {
  firstVar: String,
  secondVar: String,
  thirdVar: String
});

app.use(body.json());
mongoose.connect("mongodb://localhost:27017/saveExcel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var crosobj = {
  orign: "http://localhost:4200",
  optionSucessStatus: 200
};
app.use(cros(crosobj));

app.listen(3000, () => {
  console.log("server listening the port 3000");
});

app.post("/saveVlaue", (req, res) => {
  var collectionObj = new varModel();
  collectionObj.firstVar = req.body.firstVar;
  collectionObj.secondVar = req.body.secondVar;
  collectionObj.thirdVar = req.body.thirdVar;
  collectionObj.save((err, resSave) => {
    if (err) {
      console.log(err);
    } else {
      console.log(resSave._id);
      res.send(collectionObj);
    }
  });
});

app.get("/downloadValue", (req, res) => {
  console.log("comes");
  varModel.find({}, {}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      res.send(docs);
      // let workbook = new excel.Workbook(); //creating workbook
      // let worksheet = workbook.addWorksheet('document');
      //  worksheet.columns = [
      //   { header: 'Id', key: '_id', width: 10 },
      //   { header: 'firstVar', key: 'firstVar', width: 30 },
      //   { header: 'secondVar', key: 'secondVar', width: 30},
      //   { header: 'thirdVar', key: 'thirdVar', width: 30,}
      // ];
      // worksheet.addRows(docs);
      // workbook.xlsx.writeFile("document.xlsx")
      //   .then(function() {
      //     console.log("file saved!");
      //   });
    }
  });
});
