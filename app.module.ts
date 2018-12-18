import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './Services/Registration.Service';
import { AuthGuardGuard } from './gaurd/auth-guard.guard';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule, NgbModule
  ],
  providers: [AuthGuardGuard, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
