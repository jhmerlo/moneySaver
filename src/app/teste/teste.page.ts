import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/providers/api-provider';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {

  public usuario = {
    'email': '',
    'senha': '',
    'nome': '',
    'cpf': '',
    'tel': ''
  };

  public user: any;

  constructor(public dbService: ApiProvider, public firebaseauth: AngularFireAuth, public toastCtrl: ToastController) {
    firebaseauth.user.subscribe((data => {
      this.user = data;
    }))
  }

  ngOnInit() {
  }
  save(usuario) {
    this.dbService.save(usuario);
  }
  public cadastrarUsuario(): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
      .then(() => {
        this.exibirToast('Usuário criado com sucesso');
        this.save(this.usuario);
        window.location.href = '/login';

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
}
