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

  saldo = 0;

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

  somar(valor: number) {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  subtrair(valor: number) {
    if (valor <= this.saldo) {
      this.saldo -= valor;
    }
  }

  getSaldo() {
    return this.saldo;
  }

  getDolar() {
    if (this.USDeBRLlist.length > 0) {
      return (
        this.getSaldo() *
        this.USDeBRLlist[this.USDeBRLlist.length - 1].bpi.USD.rate_float
      ).toFixed(2);
    }
  }

  getReal() {
    if (this.USDeBRLlist.length > 0) {
      return (
        this.getSaldo() *
        this.USDeBRLlist[this.USDeBRLlist.length - 1].bpi.BRL.rate_float
      ).toFixed(2);
    }
  }

  getEuro() {
    if (this.EURlist.length > 0) {
      return (
        this.getSaldo() *
        this.EURlist[this.EURlist.length - 1].bpi.EUR.rate_float
      ).toFixed(2);
    }
  }

  getBitcoin() {
    return this.USDeBRLlist[this.USDeBRLlist.length - 1].bpi.BRL.rate_float;
  }
}
