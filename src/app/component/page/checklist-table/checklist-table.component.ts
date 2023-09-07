import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShiftService } from '../../service/shift.service';
import { DashboardService } from '../../service/dashboard.sevice';
import { DataService } from '../../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.css']
})
export class ChecklistTableComponent implements OnInit {
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



  constructor(
    private shiftService: ShiftService,
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private dataService: DataService,
    private fb: FormBuilder,
    
  ) {}

  
  ngOnInit(): void {
    // this.loadDashboardSummary();
    
    this.loadUsers();
    this.loadWorkSites();
    this.loadAssignments();
    this.loadSupportSchedule(); 
    // this.userForm = this.fb.group({
    //   selectedUser: ['', Validators.required]
    // });
  }

  async loadSupportSchedule() {
    try {
        this.shifts = await this.dataService.getSupportSchedule();
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
  




    
  // addShift() {
  //   const shiftData = {
  //     username: this.name, 
  //     assign_typ: this.type,
  //     site_name: this.hospitals,
  //     start_time: `${this.startDate} ${this.startTime}`, 
  //     end_time: `${this.endDate} ${this.endTime}`
  //   };

  //   this.dataService.addShift(shiftData).then(response => {
  //     if(response.success) {
  //         alert('Data inserted successfully!');
  //     } else {
  //         alert(`Error: ${response.message}`);
  //     }
  //   }).catch(err => {
  //       alert('An error occurred while saving data.');
  //   });
  // }
  
  
  // async loadShifts() {
  //   try {
  //     const res = await this.shiftService.loadShifts();
  //     this.shifts = res.data;
  //     this.cdr.detectChanges();
  //   } catch (error) {
  //     console.error('Error loading shifts:', error);
  //   }
  // }

  // async loadDashboardSummary() {
  //   try {
  //     const res = await this.dashboardService.getDashboardSummary();
  //     this.dashboardSummary = res.data;
  //     this.cdr.detectChanges();
  //   } catch (error) {
  //     console.error('Error loading dashboard summary:', error);
  //   }
  // }

  // filterShifts() {
  //   return this.shifts.filter(shift => 
  //     shift.person_name.toLowerCase().includes(this.filterText.toLowerCase()) || 
  //     new Date(shift.date).toLocaleDateString().includes(this.filterText) || 
  //     shift.hospital.toLowerCase().includes(this.filterText.toLowerCase())
  //   );
  // }
  // switchView(view: string) {
  //   this.viewType = view;
  // }
  // sortTable(field: string) {
  //   if (this.sortField === field) {
  //     this.sortAscending = !this.sortAscending;
  //   } else {
  //     this.sortField = field;
  //     this.sortAscending = true;
  //   }
  
  //   this.shifts.sort((a, b) => {
  //     if (a[this.sortField] > b[this.sortField]) {
  //       return this.sortAscending ? 1 : -1;
  //     }
  //     if (a[this.sortField] < b[this.sortField]) {
  //       return this.sortAscending ? -1 : 1;
  //     }
  //     return 0;
  //   });
    
  // }
  
  
  
}
