import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError, timer } from 'rxjs';
import { game } from './model/game.model';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

interface Winner {
  winningNumber: number;
  publicWinnerAddress: string;
}


@Injectable({
  providedIn: 'root'
})
export class GameService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private URL_WEB_GAME = environment.URL_WEB_GAME;

  constructor(
    private http: HttpClient,

  ) { }

  getAllGames(): Observable<game[]> {
    return this.http.get<game[]>(`${this.URL_WEB_GAME}/api/v1/getGames`);
  }

  startPolling(interval: number): Observable<game[]> {
    // Use switchMap para trocar para a próxima chamada quando o temporizador emitir
    return timer(0, interval).pipe(
      switchMap(() => this.getAllGames())
    );
  }

  getGameId(id: any): Observable<game> {
    return this.http.get<game>(`${this.URL_WEB_GAME}/api/v1/getGames/${id}`);
  }

  getNumbersGameId(id: any): Observable<number[]> {
    return this.http.get<number[]>(`${this.URL_WEB_GAME}/api/v1/availableNumbers/${id}`);
  }

  envioAposta(apostaData: any) {
    return this.http.post(`${this.URL_WEB_GAME}/api/v1/aposta`, apostaData).toPromise();
  }

  upEnterGame(_id: any, apostaData: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.URL_WEB_GAME}/api/v1/enterGame/${_id}`, apostaData).pipe(
      catchError(this.handleError),
      map(response => response) // Adicione esta linha se necessário
    );
  }

  upEnterWin(_id: any, winner: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.URL_WEB_GAME}/api/v1/enterWinnerNumber/${_id}`, winner).pipe(
      catchError(this.handleError),
      map(response => response)
    );
  }

  getWinnerGameId(date: any): Observable<game[]> {
    return this.http
      .post<game[]>(`${this.URL_WEB_GAME}/api/v1/getWinnerGameId/`, date)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }


  getLossesPlayerWallet(date: any): Observable<game[]> {
    return this.http
      .post<game[]>(`${this.URL_WEB_GAME}/api/v1/lossesPlayerWallet/`, date)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
      alert(error)
    }
    return throwError(() => {
      errorMessage;
    });
  };

}
