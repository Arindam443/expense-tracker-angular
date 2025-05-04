import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  expenses: any[] = [];
  categories = ['Food', 'Transport', 'Entertainment', 'Others'];
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      amount: [null, Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.authService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.userId = user.uid;
        this.expenseService.getExpenses(this.userId).subscribe((data: any[]) => {
          this.expenses = data;
        });
      }
    });
  }

  onAdd() {
    if (this.expenseForm.valid) {
      const expense = { ...this.expenseForm.value, userId: this.userId };
      this.expenseService.addExpense(expense);
      this.expenseForm.reset();
    }
  }

  onDelete(id: string) {
    this.expenseService.deleteExpense(id);
  }
}
