import { Component } from '@angular/core';
import { Coin } from './coin'
import { Line } from "./line";
import { Portfolio } from "./portfolio";
import {CryptocurrencyService} from "./cryptocurrency.service";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Cryptocurrency Portfolio';
  coins: Coin[] = [];
  portfolios: Portfolio[] = [];
  lines: Line[] = [];
  realCoinsList: string[] = [];

  constructor(private cryptocurrencyService: CryptocurrencyService) { }

  ngOnInit(): void {
    this.getCoins();
    this.getLines();
    this.getPortfolios();
    this.getRealCoins();
  }

  getCoins(): void {
    this.cryptocurrencyService.getCoins()
      .subscribe((coins) => this.coins = coins);
  }

  getLines(): void {
    this.cryptocurrencyService.getLines()
      .subscribe((lines) => this.lines = lines);
  }

  getPortfolios(): void {
    this.cryptocurrencyService.getPortfolios()
      .subscribe((portfolios) => this.portfolios = portfolios);
  }

  getRealCoins(): void {
    this.cryptocurrencyService.getCryptoCompareData()
      .subscribe(response => {
        if (response && response.Data) {
          this.realCoinsList = Object.keys(response.Data);
          this.coins.filter(coin => this.realCoinsList.includes(coin.acronym));
          this.getCoinValues();
        }
      });
  }

  getLinesByPortfolioId(id: number): Line[] {
    return this.lines.filter(line => line.portfolioId === id);
  }

  getCoinByCoinId(id: number): Coin {
    return <Coin>this.coins.find(coin => coin.id === id);
  }

  getCoinValues(): void {
    this.coins.forEach(coin => {
      this.cryptocurrencyService.getValueByAcronym(coin.acronym)
        .subscribe(response => {
          if(response && response.EUR){
            coin.value = Number(response.EUR);
          }
        })
    })
  }

  getValueByAmountAndCoin(amount: number, coin: Coin): number {
    return coin.value ? Number(amount * coin.value) : 0
  }

}
