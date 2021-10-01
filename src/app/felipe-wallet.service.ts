import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface USDeBRL {
  bpi: {
    USD: {
      rate_float: number;
    };
    BRL: {
      rate_float: number;
    };
  };
}

interface EUR {
  bpi: {
    EUR: {
      rate_float: number;
    };
  };
}

@Injectable()
export class FelipeWalletService {
  USDeBRLlist: Array<USDeBRL> = [];
  EURlist: Array<EUR> = [];

  constructor(private http: HttpClient) {}

  updateUSDeBRL() {
    this.http
      .get<USDeBRL>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.USDeBRLlist.push(data);
      });
  }

  updateEUR() {
    this.http
      .get<EUR>('https://api.coindesk.com/v1/bpi/currentprice/EUR.json')
      .subscribe((data) => {
        this.EURlist.push(data);
      });
  }

  interval() {
    setInterval(() => {
      this.updateUSDeBRL();
      this.updateEUR();
    }, 60000);
  }
}
