import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShiftService } from '../../service/shift.service';

@Component({
  selector: 'app-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.css']
})
export class ChecklistTableComponent implements OnInit {
  selectedType: string = '';
  sortField: string = '';
  sortAscending: boolean = true;
  filterText: string = '';
  shifts: any[] = [];
  viewType: string = 'grid';
  dashboardSummary: any;
  name: string = '';
  type: string = '';
  hospitals: string = '';
  startDate: string = '';  
  endDate: string = ''; 
  startTime: string = '';  
  endTime: string = '';  
  constructor(private shiftService: ShiftService, private cdr: ChangeDetectorRef) {}

  
  ngOnInit(): void {
    this.loadShifts();
  }

  async addShift() {
    const newShift = { 
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.startTime,
      endTime: this.endTime,
      hospitals: this.hospitals,
      type: this.type,
    };
    try {
      const res = await this.shiftService.addShift(newShift);
      if (res.data.success) {
        await this.loadShifts();
      }
    } catch (error) {
      console.error('Error adding shift:', error);
    }
  }
  
  async loadShifts() {
    try {
      const res = await this.shiftService.loadShifts();
      this.shifts = res.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading shifts:', error);
    }
  }

  filterShifts() {
    return this.shifts.filter(shift => 
      shift.person_name.toLowerCase().includes(this.filterText.toLowerCase()) || 
      new Date(shift.date).toLocaleDateString().includes(this.filterText) || 
      shift.hospital.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  switchView(view: string) {
    this.viewType = view;
  }
  sortTable(field: string) {
    if (this.sortField === field) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortField = field;
      this.sortAscending = true;
    }
  
    this.shifts.sort((a, b) => {
      if (a[this.sortField] > b[this.sortField]) {
        return this.sortAscending ? 1 : -1;
      }
      if (a[this.sortField] < b[this.sortField]) {
        return this.sortAscending ? -1 : 1;
      }
      return 0;
    });
    
  }
  
  
  
}
