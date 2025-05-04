import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { AuthService } from '../../core/services/auth.service';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  pieChartType: ChartType = 'pie';

  pieChartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384']
      }
    ]
  };

  constructor(
    private authService: AuthService,
    private expenseService: ExpenseService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.zone.run(() => {
          this.expenseService.getExpenses(user.uid).subscribe((expenses: any[]) => {
            console.log('🔥 Expenses fetched:', expenses);

            const categoryMap: { [key: string]: number } = {};
            expenses.forEach((e: any) => {
              categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
            });

            // ✅ Force reactivity for chart to update
            const labels = Object.keys(categoryMap);
            const data = Object.values(categoryMap);

            this.pieChartData = {
              labels,
              datasets: [
                {
                  data,
                  backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384']
                }
              ]
            };
          });
        });
      }
    });
  }
}
