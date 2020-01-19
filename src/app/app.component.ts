import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = "downloadexcel";
  firstVar = "";
  secondVar = "";
  thirdVar = "";

  SaveValue = () => {
    var obj = {
      firstVar: this.firstVar,
      secondVar: this.secondVar,
      thirdVar: this.thirdVar
    };
    console.log('comes');
    this.http
      .post("http://localhost:3000/saveVlaue", obj)
      .subscribe(data => {  
        console.log('success'+data);
      },
      error=>{
        console.log(error);
      });
    console.log(obj);
  };

 DownloadData=()=>{
   alert('works');
   this.http
      .get("http://localhost:3000/downloadValue")
      .subscribe(data => {  
        console.log('success'+data);
      },
      error=>{
        console.log(error);
      });
 }


}
