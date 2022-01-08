import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-home-page',
  templateUrl: './supplier-home-page.component.html',
  styleUrls: ['./supplier-home-page.component.css']
})
export class SupplierHomePageComponent implements OnInit {
  data:any;

  chartOptions: any;
  constructor() { }

  ngOnInit(): void {
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }
      ]
  };
  }

}
