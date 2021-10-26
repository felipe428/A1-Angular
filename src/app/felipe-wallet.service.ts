import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface USDeEUR {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      symbol: string;
      rate_float: number;
    };
    EUR: {
      symbol: string;
      rate_float: number;
    };
  };
}

interface BRL {
  bpi: {
    BRL: {
      rate_float: number;
    };
  };
}

@Injectable()
export class FelipeWalletService {
  USDeEURlist: Array<USDeEUR> = [];
  BRLlist: Array<BRL> = [];

  saldo = 0;

  dif: number = 0;

  constructor(private http: HttpClient) {
    this.updateBitcoinRates();
    setInterval(() => {
      this.updateBitcoinRates();
    }, 60000);
  }

  updateBitcoinRates() {
    this.http
      .get<USDeEUR>('https://api.coindesk.com/v1/bpi/currentprice.json')
      .subscribe((data) => {
        if (this.USDeEURlist.length > 0) {
          let length = this.USDeEURlist.length;
          this.dif =
            data.bpi.USD.rate_float -
            this.USDeEURlist[length - 1].bpi.USD.rate_float;
        }
        this.USDeEURlist.push(data);
      });

    this.http
      .get<BRL>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.BRLlist.push(data);
      });
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

  getBTCinUSD() {
    let length = this.USDeEURlist.length;
    if (length > 0) {
      return this.saldo * this.USDeEURlist[length - 1].bpi.USD.rate_float;
    } else {
      return 0;
    }
  }

  getBTCinEUR() {
    let length = this.USDeEURlist.length;
    if (length > 0) {
      return this.saldo * this.USDeEURlist[length - 1].bpi.EUR.rate_float;
    } else {
      return 0;
    }
  }

  getBTCinBRL() {
    let length = this.BRLlist.length;
    if (length > 0) {
      return this.saldo * this.BRLlist[length - 1].bpi.BRL.rate_float;
    } else {
      return 0;
    }
  }

  getBitcoin() {
    return this.BRLlist[this.BRLlist.length - 1].bpi.BRL.rate_float;
  }
}
