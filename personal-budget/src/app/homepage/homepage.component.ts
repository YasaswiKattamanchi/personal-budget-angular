import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions } from 'chart.js/auto';

// Define an interface to represent the shape of your API response
interface BudgetItem {
  budget: number;
  title: string;
}

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  public data_p = {
    data: [] as number[], // Explicitly specify the type here
    backgroundColor: [
      '#ffcd56',
      '#ff6384',
      '#36a2eb',
      '#fd6b19',
      '#000080',
      '#800080',
      '#808080',
      '#a52a2a'
    ],
    labels: [] as string[], // Explicitly specify the type here
  };

  private myPieChart: Chart | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res : any) => {
        console.log(res);
        for (const item of res) {
          this.data_p.data.push(item.budget);
          this.data_p.labels.push(item.title);
        }
        this.createChart();
      });
  }

  createChart() {
    setTimeout(() => {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      console.log(ctx);
      if (!ctx) {
        console.error('Canvas element not found.');
        return;
      }

      if (this.myPieChart) {
        this.myPieChart.destroy();
      }

      try {
        this.myPieChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.data_p.labels,
            datasets: [{
              label: 'Budget Data',
              data: this.data_p.data,
              backgroundColor: this.data_p.backgroundColor,
            }]
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
          } as ChartOptions
        });
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    // Call createChart here if needed after the view has been initialized
  }

  ngOnDestroy(): void {
    if (this.myPieChart) {
      this.myPieChart.destroy();
    }
  }
}
