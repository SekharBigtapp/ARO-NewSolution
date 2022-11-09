import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginService } from './login/services/login.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
//import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [

  LoginComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,    
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    

  ],
  providers: [LoginService]
})
export class AuthModule { }
