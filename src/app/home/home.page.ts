import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  films: Observable<any> | undefined;

  constructor(private router: Router, private http: HttpClient, public toastController: ToastController) {}

  ngOnInit() {
    this.films = this.http.get('https://swapi.dev/api/films').pipe(
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro:any) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API: ' + erro.status + ': ' + erro.message,
      duration: 4000,
      color: 'danger',
      position: 'middle'
    });
    console.log(erro);
    toast.present();
    return null;
  }

  openDetails(film:any) {
    const split = film.url.split('/');
    const filmId = split[5];
    this.router.navigateByUrl(`/filme-detalhe/${filmId}`);
  }
}
