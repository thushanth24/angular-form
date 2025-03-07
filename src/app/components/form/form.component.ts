import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from "primeng/floatlabel"
import { RadioButton } from 'primeng/radiobutton';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';




interface FormData {
  [key: string]: string | File | boolean | null;
  fullName: string;     
  nic: string;
  selectedIDType: string; 
  idNumber: string; 
  nationality: string;
  dob: string;
  country: string;
  cdcNo: string;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  email: string;
  course: string;
  drivingLicense: string;
  drivingClass: string;
  issueDate: string;
  employed: string;
  department: string;
  seaService: string;
  company: string;
  swimmingAbility: boolean;
  designation:string;
  division:string;
  serviceno:string;
  sectionunit:string;
  nicFile: File | null;
  passportFile: File | null;
  photoFile: File | null;
}

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, FloatLabelModule, RadioButton,Toast,ConfirmDialog],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class StudentRegistrationComponent {
  value: string | undefined;
  step = 0;
  checked: boolean = false;
  

  formData: FormData = {
    fullName: '',
    nic: '',
    selectedIDType: '',  
    idNumber: ''   , 
    nationality: '',
    dob: '',
    country: '',
    cdcNo: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    email: '',
    course: '',
    drivingLicense: '',
    drivingClass: '',
    issueDate: '',
    employed: '',
    department: '',
    seaService: '',
    company: '',
    swimmingAbility: false,
    designation:'',
    division:'',
    serviceno:'',
    sectionunit:'',
    nicFile: null,
    passportFile: null,
    photoFile: null
  };

  validationErrors: any = {
    fullName: '',
    idNumber: '',
    email: ''
  };

  constructor(private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) {}

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 0) {
      this.step--;
    }
  }

  onFileSelect(event: any, field: keyof FormData) {
    const file = event.target.files[0];
    this.formData[field] = file;
  }

  submitForm() {
    console.log("Form Submitted:", this.formData);
    alert("Registration Completed Successfully!");
    this.router.navigate(['/']);
  }

  clearField() {
    this.formData.idNumber = ''; // Clear input when switching ID type
  }


confirm() {
  this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Student Registration Successful' });
      },
      reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      },
  });
}

validateField(field: string) {
  switch (field) {
    case 'fullName':
      this.validationErrors.fullName = this.formData.fullName.length < 3
        ? 'Full name must be at least 3 characters long'
        : '';
      break;

    case 'idNumber':
      if (!this.formData.selectedIDType) {
        this.validationErrors.idNumber = 'Please select NIC or PP first';
      } else if (this.formData.idNumber.length < 6) {
        this.validationErrors.idNumber = `${this.formData.selectedIDType} number must be at least 6 characters`;
      } else {
        this.validationErrors.idNumber = '';
      }
      break;

    case 'email':
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.validationErrors.email = !emailPattern.test(this.formData.email)
        ? 'Enter a valid email address'
        : '';
      break;

    default:
      break;
  }
}

  
}

