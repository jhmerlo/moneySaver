import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public user: any;

  @ViewChild('usuario', { static: false }) email;
  @ViewChild('senha', { static: false }) password;


  constructor(public menuCtrl: MenuController, 
    public toastCtrl: ToastController, 
    public firebaseauth: AngularFireAuth) {
    firebaseauth.user.subscribe((data => {
      this.user = data;
    }))
  }

  public LoginComEmail(): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }
  
  public redirectTo(url: string): void {
    window.location.href = url;
  }


  public cadastrarUsuario(): void {
  this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(() => {
      this.exibirToast('Usuário criado com sucesso');
      
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
}
public Sair(): void {
  this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
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

ngOnInit() {
  this.menuCtrl.enable(false);
}
}

