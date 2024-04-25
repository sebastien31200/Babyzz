import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  inputEmailCtrl!: FormControl;
  inputNameCtrl!: FormControl;
  mainForm!: FormGroup;
  loading!: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router){
    this.loading = false;
    this.inputEmailCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.email]);
    this.inputNameCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.mainForm = this.formBuilder.group({
      email : this.inputEmailCtrl,
      name : this.inputNameCtrl
    })
  }

onFormSubmit() {
  this.router.navigateByUrl('/grid');
}


}
