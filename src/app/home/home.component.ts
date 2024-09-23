import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpDetails } from './model/emp-details';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  empolyeeForm!: FormGroup;
  empObject: EmpDetails = new EmpDetails();
  EmpDetailsList: EmpDetails[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.EmpDetailsList = parseData;
    }
  }

  createForm() {
    this.empolyeeForm = new FormGroup({
      empId: new FormControl(this.empObject.empId),
      empName: new FormControl(this.empObject.empName, [Validators.required]),
      empEmail: new FormControl(this.empObject.empEmail),
      empAddress: new FormControl(this.empObject.empAddress),
      empCity: new FormControl(this.empObject.empCity),
      empPin: new FormControl(this.empObject.empPin, [Validators.minLength(6), Validators.required])
    });
  }

  SaveData() {

    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.empolyeeForm.controls['empId'].setValue(parseData.length + 1);
      this.EmpDetailsList.unshift(this.empolyeeForm.value);
    } else {
      this.EmpDetailsList.unshift(this.empolyeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.EmpDetailsList))
    this.reset()
  }

  reset() {
    this.empObject = new EmpDetails();
    this.createForm();
  }

  OnEdit(item: EmpDetails) {
    this.empObject = item;
    this.createForm();
  }

  UpdateData() {
    const record = this.EmpDetailsList.find(m => m.empId == this.empolyeeForm.controls['empId'].value);
    if (record != undefined) {
      record.empName = this.empolyeeForm.controls['empName'].value;
      record.empAddress = this.empolyeeForm.controls['empAddress'].value;
      record.empEmail = this.empolyeeForm.controls['empEmail'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.EmpDetailsList));
    this.reset();

  }

  OnDelete(id: number) {

    const isDelete = confirm("Are you sure to Deleted");

    if (isDelete) {
      const index = this.EmpDetailsList.findIndex(m => m.empId == id);
      this.EmpDetailsList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.EmpDetailsList));
    }

  }

}
