import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.css']
})
export class ChecklistTableComponent implements OnInit {

  shifts: any[] = [];
  viewType: string = 'grid';
  dashboardSummary: any;
  name: string = '';
  type: string = '';
  date: Date | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardSummary();
  }

  addShift() {
    if (this.name && this.type && this.date) {
      this.shifts.push({ name: this.name, type: this.type, date: this.date });
      this.loadDashboardSummary();
    }
  }

  loadDashboardSummary() {
    this.dashboardSummary = {
      totalShifts: this.shifts.length
    };
  }

  switchView(view: string) {
    this.viewType = view;
  }
}
