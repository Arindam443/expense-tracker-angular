import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total = 0;
  weeklyTotal = 0;
  monthlyTotal = 0;

  constructor(private authService: AuthService, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.expenseService.getExpenses(user.uid).subscribe((data: any[]) => {
          this.total = data.reduce((sum: number, e: any) => sum + e.amount, 0);
          const now = new Date();
          this.weeklyTotal = data
            .filter((e: any) => this.isThisWeek(new Date(e.date)))
            .reduce((sum: number, e: any) => sum + e.amount, 0);
          this.monthlyTotal = data
            .filter((e: any) => new Date(e.date).getMonth() === now.getMonth())
            .reduce((sum: number, e: any) => sum + e.amount, 0);
        });
      }
    });
  }

  isThisWeek(date: Date): boolean {
    const now = new Date();
    const start = new Date(now.setDate(now.getDate() - now.getDay()));
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return date >= start && date < end;
  }
}
