import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ShiftService } from '../../service/shift.service';
import { DashboardService } from '../../service/dashboard.sevice';
import { DataService } from '../../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.css']
})
export class ChecklistTableComponent implements OnInit {
  @ViewChild('matTabGroupReference', { static: false }) matTabGroup!: MatTabGroup;
  sortField: string = '';
  sortAscending: boolean = true;
  filterText: string = '';
  viewType: string = 'grid';
  dashboardSummary: any;
  hospitals: string = '';
  startTime: string = '';  
  endTime: string = '';
  users: any[] = [];
  filteredUsers: any[] = [];
  workSites: any[] = [];
  filteredWorkSites: any[] = [];
  assignments: any[] = [];
  type: string = '';
  name: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedUser: any;
  shifts: any[] = [];
  filteredShifts: any[] = [];
  selectedType: string = '';
  selectedWorkSite: string = '';
  searchMonth: number | null = null;
  searchYear: number | null = null;

  constructor(
    private shiftService: ShiftService,
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private dataService: DataService,
    private fb: FormBuilder,
    
  ) {}

  
  ngOnInit(): void {
    this.loadUsers();
    this.loadWorkSites();
    this.loadAssignments();
    this.loadSupportSchedule(); 

  }

  async loadSupportSchedule() {
    try {
        this.shifts = await this.dataService.getSupportSchedule();
        this.shifts.forEach(shift => {
          const user = this.users.find(u => u.username === shift.username);
          if(user) {
            shift.firstname = user.firstname;
            shift.lastname = user.lastname;
            shift.email = user.email;
            if (user.prefix === 'Mr') {
              shift.prefix = 'นาย';
          } else if (user.prefix === 'Miss') {
              shift.prefix = 'นางสาว';
          } else {
              shift.prefix = user.prefix; 
          }
            shift.nickname = user.nickname;
          }
        });
        this.filteredShifts = [...this.shifts];
        this.cdr.detectChanges();
    } catch (error) {
        console.error('Error loading support schedule:', error);
    }
  }


  async loadUsers() {
    try {
      this.users = await this.dataService.getUsers();
      this.filteredUsers = [...this.users]; 
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  
  filterUsers(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue) {
      this.filteredUsers = this.users.filter(user => 
        (user.firstname + ' ' + user.lastname).toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;  
    }
  }
  displayUser(user: any): string {
    return user && user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : '';
  }

  async loadWorkSites() {
    try {
        this.workSites = await this.dataService.getWorkSite();
        this.filteredWorkSites = [...this.workSites];
        this.cdr.detectChanges();
    } catch (error) {
        console.error('Error loading work sites:', error);
    }
  }
  filterWorkSites(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredWorkSites = this.workSites.filter(workSite => workSite.name.toLowerCase().includes(filterValue));
  }
  async loadAssignments() {
    try {
      this.assignments = await this.dataService.getAssignment();
      this.cdr.detectChanges();
      console.log(this.assignments);  
    } catch (error) {
      console.error('Error loading assignments:', error);
    }
  }
  addShift() {
    const shiftData = {
      username: this.selectedUser ? this.selectedUser.username : null, 
      assign_typ: this.type,
      site_name: this.hospitals,
      start_time: `${this.startDate} ${this.startTime}`, 
      end_time: `${this.endDate} ${this.endTime}`
    };

    this.dataService.addShift(shiftData).then(response => {
        if(response.success) {
            alert('Data inserted successfully!');
            window.location.reload();
        } else {
            alert(`Error: ${response.message}`);
        }
    }).catch(err => {
        alert('An error occurred while saving data.');
    });
  }

  sortTable(field: string): void {
    if (this.sortField === field) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortField = field;
      this.sortAscending = true;
    }
  
    this.shifts.sort((a, b) => {
      if (a[field] > b[field]) {
        return this.sortAscending ? 1 : -1;
      }
      if (a[field] < b[field]) {
        return this.sortAscending ? -1 : 1;
      }
      return 0;
    });
  }

  filterShifts() {
    console.log(this.selectedWorkSite)
    let results = this.shifts.filter(shift =>
      (shift.firstname + ' ' + shift.lastname).toLowerCase().includes(this.filterText.toLowerCase()) ||
      (shift.start_time ? new Date(shift.start_time).toLocaleDateString() : '').includes(this.filterText) ||
      (shift.end_time ? new Date(shift.end_time).toLocaleDateString() : '').includes(this.filterText) ||
      (shift.assign_typ || '').toLowerCase().includes(this.filterText.toLowerCase()) ||
      (shift.site_name || '').toLowerCase().includes(this.filterText.toLowerCase())
    );

    if (this.selectedType) {
      results = results.filter(shift => shift.assign_typ === this.selectedType);
    }

    if (this.selectedWorkSite) {
      results = results.filter(shift => shift.site_name === this.selectedWorkSite);
    }
    this.filteredShifts = results;
     this.filterByMonthAndYear();
  }

  filterByMonthAndYear() {
    if (this.searchMonth !== null && this.searchYear !== null) {
      this.filteredShifts = this.filteredShifts.filter(shift => {
        const shiftDate = new Date(shift.start_time); 
        return (
          shiftDate.getMonth() === this.searchMonth &&
          shiftDate.getFullYear() === this.searchYear
        );
      });
    }
  }
  loadUserProfile(shift: any) {
    this.selectedUser = shift;
    this.matTabGroup.selectedIndex = 1;
  }

  reload(){
    return window.location.reload();
  }

  



  
}
