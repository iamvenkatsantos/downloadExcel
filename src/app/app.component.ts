import { Component } from "@angular/core";
import { ExcelServicesService } from "./services/excel-service.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    private excelService: ExcelServicesService
  ) {}
  title = "downloadexcel";
  firstVar = "";
  secondVar = "";
  thirdVar = "";
  excel = [];
  SaveValue = () => {
    var obj = {
      firstVar: this.firstVar,
      secondVar: this.secondVar,
      thirdVar: this.thirdVar
    };
    console.log("comes");
    this.http.post("http://localhost:3000/saveVlaue", obj).subscribe(
      data => {
        console.log("success" + data);
      },
      error => {
        console.log(error);
      }
    );
    console.log(obj);
  };
  //Observable<any>
  DownloadData = () => {
    this.getJson().subscribe(
      data => {
        data.forEach(row => {
          this.excel.push(row);
        });
        console.log("====================================");
        console.log(this.excel);
        console.log("====================================");
        this.excelService.exportAsExcelFile(this.excel, "documents");
      },
      error => {
        console.log(error);
      }
    );
  };
  public getJson(): Observable<any> {
    return this.http.get("http://localhost:3000/downloadValue");
  }
}
