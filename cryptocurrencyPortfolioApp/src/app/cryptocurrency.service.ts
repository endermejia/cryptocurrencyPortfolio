import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from "rxjs";
import { Coin } from "./coin";
import { Line } from "./line";
import { Portfolio } from "./portfolio";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {

  private dataBaseUrl = 'http://localhost:3000/';
  private coinsUrl = this.dataBaseUrl + 'coins';
  private linesUrl = this.dataBaseUrl + 'lines';
  private portfolioUrl = this.dataBaseUrl + 'portfolios';
  private cryptoCompareUrl = 'https://min-api.cryptocompare.com/data/all/coinlist';

  constructor(
    private http: HttpClient
  ) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.coinsUrl)
      .pipe(
        tap(_ => console.log('fetched coins')),
        catchError(this.handleError<Coin[]>('getCoins', []))
      );
  }

  getLines(): Observable<Line[]> {
    return this.http.get<Line[]>(this.linesUrl)
      .pipe(
        tap(_ => console.log('fetched lines')),
        catchError(this.handleError<Line[]>('getLines', []))
      );
  }

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.portfolioUrl)
      .pipe(
        tap(_ => console.log('fetched portfolios')),
        catchError(this.handleError<Portfolio[]>('getPortfolios', []))
      );
  }

  getCryptoCompareData(): Observable<any> {
    return this.http.get(this.cryptoCompareUrl)
      .pipe(
        tap(_ => console.log('fetched cryptoCompare data')),
        catchError(this.handleError('getCryptoCompareData', []))
      );
  }

  getValueByAcronym(acronym: string): Observable<any> {
    const cryptoValueUrl = `https://min-api.cryptocompare.com/data/price?fsym=${acronym}&tsyms=EUR`;
    return this.http.get(cryptoValueUrl)
      .pipe(
        tap(_ => console.log('fetched cryptoCompare data')),
        catchError(this.handleError('getCryptoCompareData', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
