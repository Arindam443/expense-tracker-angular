import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { NgChartsModule } from 'ng2-charts';

import { AuthComponent } from './features/auth/auth.component';
import { ExpensesComponent } from './features/expenses/expenses.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ReportsComponent } from './features/reports/reports.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainLayoutComponent } from './layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ExpensesComponent,
    DashboardComponent,
    ReportsComponent,
    SidebarComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot([
      { path: 'login', component: AuthComponent },
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'expenses', component: ExpensesComponent },
          { path: 'reports', component: ReportsComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
