
//Imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { AppointmentService } from '../shared/appointment.service';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { Appointment } from '../shared/Appointment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  public slider: boolean = false;
  public logged;
  public form: Appointment;
  epa: any;

  
  @ViewChild('usuario', { static: false }) email;
  @ViewChild('senha', { static: false }) password;
  @ViewChild('nome', { static: false }) submit_name;
  @ViewChild('celular', { static: false }) submit_celular;

  constructor(
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public authService: AuthenticationService,
    public app: AppointmentService
    ) {
     }
  

  public LoginComEmail(): void {
    this.authService.SignIn(this.email.value, this.password.value)
      .then(() => {
        this.logged = this.authService.getUser();
        this.exibirToast('Login efetuado com sucesso');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  public showSlider(option: boolean) {
    this.slider = option;
  }

  public cadastrarUsuario(): void {
    this.authService.RegisterUser(this.email.value, this.password.value)
      .then(() => {
        this.exibirToast('Usuário criado com sucesso');
        this.showSlider(true);
        this.logged = this.authService.getUser();

      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  public Sair(): void {
    this.authService.SignOut()
      .then(() => {
        this.exibirToast('Você saiu');
        this.logged = this.authService.getUser();
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  async exibirToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public send(){
    this.form.name = this.submit_name.value;
    this.form.mobile = this.submit_celular.value;
    this.app.createBooking(this.form).then(res =>{
      console.log(res);
      this.showSlider(false);
    })
    .catch(error => console.log(error))
  }

    public get(){
    
    
    }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.logged = this.authService.getUser();
  }
}