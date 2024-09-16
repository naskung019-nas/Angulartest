import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ShiftService } from '../../service/shift.service';
import { DashboardService } from '../../service/dashboard.service';
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
  hospitals: any = '';
  startTime: string = '';  
  endTime: string = '';
  users: any[] = [];
  filteredUsers: any[] = [];
  workSites: any[] = [];
  filteredWorkSites: any[] = [];
  assignments: any[] = [];
  type: any = '';
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
  selectedHospitalName: any = '';
  


  constructor(
    private shiftService: ShiftService,
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private dataService: DataService,
    private fb: FormBuilder,
    
  ) {}

  
  ngOnInit(): void {
    this.loadShifts();
    this.loadUsers();
    this.loadWorkSites();
    this.loadAssignments();


  }

  loadShifts(): void {
    this.dataService.getSchedule()
      .then(data => {
        this.shifts = data;
        this.filteredShifts = [...this.shifts];
      })
      .catch(error => {
        console.error('Error loading shifts:', error);
      });
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
        user && 
        user.firstname && 
        user.lastname &&
        (user.firstname + ' ' + user.lastname).toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;  
    }
  }
  
  displayUser(user: any): string {
    return user ? user.firstname + ' ' + user.lastname : '';
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
    if(!this.selectedUser || !this.type || !this.hospitals || !this.startDate || !this.startTime || !this.endDate || !this.endTime) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    const shiftData = {
      user_id: this.selectedUser.id, 
      assign_id: this.type.id,
      site_id: this.hospitals.id,
      start_time: `${this.startDate}T${this.startTime}:00`, 
      end_time: `${this.endDate}T${this.endTime}:00`
    };
  
    this.dataService.addShift(shiftData).then(response => {
      if (response.success) {
        alert('Data inserted successfully!');
        window.location.reload();
      } else {
        alert(`Error: ${response.message}`);
      }
    }).catch(err => {
      console.error(err);
      alert('An error occurred while saving data.');
    });
  }
  

  // sortTable(field: string): void {
  //   if (this.sortField === field) {
  //     this.sortAscending = !this.sortAscending;
  //   } else {
  //     this.sortField = field;
  //     this.sortAscending = true;
  //   }
  
  //   this.shifts.sort((a, b) => {
  //     if (a[field] > b[field]) {
  //       return this.sortAscending ? 1 : -1;
  //     }
  //     if (a[field] < b[field]) {
  //       return this.sortAscending ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // }
  filterShifts() {
    let results = this.shifts.filter(shift => {
      const userString = shift.users && shift.users[0]
        ? (shift.users[0].firstname + ' ' + shift.users[0].lastname).toLowerCase()
        : '';
      const startDateString = shift.start_time 
        ? new Date(shift.start_time).toLocaleDateString() 
        : '';
      const endDateString = shift.end_time 
        ? new Date(shift.end_time).toLocaleDateString() 
        : '';
      const assignmentName = shift.Assignments && shift.Assignments[0]
        ? shift.Assignments[0].name.toLowerCase()
        : '';
      const workSiteName = shift.Worksites && shift.Worksites[0]
        ? shift.Worksites[0].site_name.toLowerCase()
        : '';
      return userString.includes(this.filterText.toLowerCase()) ||
        startDateString.includes(this.filterText) ||
        endDateString.includes(this.filterText) ||
        assignmentName.includes(this.filterText.toLowerCase()) ||
        workSiteName.includes(this.filterText.toLowerCase());
    });
  
    if (this.selectedType) {
      results = results.filter(shift => 
        shift.Assignments && shift.Assignments[0] && shift.Assignments[0].name === this.selectedType
      );
    }
  
    if (this.selectedWorkSite) {
      results = results.filter(shift => 
        shift.Worksites && shift.Worksites[0] && shift.Worksites[0].site_name === this.selectedWorkSite
      );
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
    this.selectedUser = shift.users[0];
    this.matTabGroup.selectedIndex = 1;
  }

  reload(){
    return window.location.reload();
  }

  onHospitalSelected(event: any): void {
    this.hospitals = event.option.value; 
}



  
}
