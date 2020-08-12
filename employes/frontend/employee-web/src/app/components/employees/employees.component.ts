import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from 'src/app/services/employee.service';
declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [ EmployeeService ]

})
export class EmployeesComponent implements OnInit {
  employess: any = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmpleado();
  }

  getEmpleado() {
    this.employeeService.getEmployes().subscribe(resp => {
      console.log(resp);
      this.employess = resp || [];

    });
  }

  addEmployee(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEmpleado();
          M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.employeeService.postEmployes(form.value)
      .subscribe(res => {
        this.getEmpleado();
        this.resetForm(form);
        M.toast({html: 'Save successfully'});
      });
    }
    
  }

  deleteEmployee(_id: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmpleado();
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
