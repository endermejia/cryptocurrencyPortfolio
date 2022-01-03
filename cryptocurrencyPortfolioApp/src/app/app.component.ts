import { Component } from '@angular/core';
import { Coin } from './coin'
import { Line } from "./line";
import { Portfolio } from "./portfolio";
import {CryptocurrencyService} from "./cryptocurrency.service";

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
        }
      });
  }

  realCoin(coinName: string): boolean {
    return this.realCoinsList.some(realCoin => realCoin === coinName);
  }

}
