import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmployeeService } from 'src/app/services/employee.service';
import { Empleyee } from 'src/app/models/empleyee';
declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [ EmployeeService ]

})
export class EmployeesComponent implements OnInit {
  employess: any = [];
  _id: any;
  upd: boolean;
  public formEmployee: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.builderformServicio();
    this.upd = false;
    this.getEmpleado();
  }

  private builderformServicio() {
    this.formEmployee = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      office: ['', Validators.required],
      salario: ['0', Validators.required],
    });
  }

  getEmpleado() {
    this.employeeService.getEmployes().subscribe(resp => {
      this.employess = resp || [];
    });
  }

  addEmployee() {
    const value = this.formEmployee.value;
      if(this.formEmployee.valid) {
        console.log(this.formEmployee.value, value.id != '');
        this.employeeService.postEmployes(value)
        .subscribe(res => {
          this.getEmpleado();
          M.toast({html: 'Save successfully'});
          this.resetForm();
        });
      } else {
        M.toast({html: 'Procura llenar los campos correctamente'});
      }
  }

  editEmployee(employee: Empleyee) {
    this._id =  employee._id || false,
    this.formEmployee.patchValue({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salario: employee.salario,
    });
    const value = this.formEmployee.value;
    this.upd = true;
  }

  update() {
    const value = this.formEmployee.value;
    console.log(this._id, value);
    this.employeeService.putEmployee(this._id, value)
    .subscribe(res => {
      this.resetForm();
      this.getEmpleado();
      M.toast({html: 'Updated Successfully'});
    });
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

  public resetForm () {
    this.formEmployee.reset();
    this.builderformServicio();
  }

  cancel() {
    this.upd = false;
    this.resetForm();
  }
}
