import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmpleado();
  }

  getEmpleado() {
    this.employeeService.getEmployes().subscribe(resp => {
      console.log(resp);
      
    });
  }

}
