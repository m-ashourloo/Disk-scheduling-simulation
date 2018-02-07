import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { gaussian } from 'free-gaussian';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  chart = [];
  requests: number[]  = [];
  requestsCopy: number[]  = [];
  requestsCopy2: number[]  = [];
  bigger: number[] = [];
  smaller: number[] = [];
  labels = [];
  index;
  SD;
  FC;
  LC;
  avg;
  Head;
  num;
  algh;
  h;
  EI;
  BI;
  hasToUp = false;
  out = 0;
  results = [];
  toUp = true;
  firstTime: boolean;
  constructor() {
    this.index = 0;
  }
  ngOnInit() {
  }
  addData2(algh2: string, FC2: string, LC2: string, BI2: string, EI2: string, num2: string) {
    this.firstTime = true;
    this.algh = algh2;
    this.FC = Number(FC2);
    this.LC = Number(LC2);
    this.BI = Number(BI2);
    this.EI = Number(EI2);
    this.num = Number(num2);
    this.h = Math.random() * ( this.LC - this.FC ) + this.FC;
    this.h = Math.floor(this.h);
    this.Head = this.h;
    this.generateRequests2();
    this.out = 0;
    const head = this.h;
    switch (this.algh) {
      case '1':
        this.FCFS();
        break;
      case '2':
        this.SSTF();
        break;
      case '3':
        this.SCAN();
        break;
      case '4':
        this.CSCAN();
        break;
      case '5':
        this.LOOK();
        break;
      case '6':
        this.CLOOK();
        break;
    }
    this.results.unshift(head);
    this.setLabels();
    console.log('chart to create');
    this.createChart();
    console.log('chart created');
  }
  addData1(algh: string, SD: string, FC: string, LC: string, BI: string, EI: string, num: string, avg: string) {
    this.firstTime = true;
    this.algh = algh;
    this.SD = SD;
    this.FC = Number(FC);
    this.LC = Number(LC);
    this.BI = Number(BI);
    this.EI = Number(EI);
    this.avg = Number(avg);
    this.num = Number(num);
    this.h = Math.random() * ( this.LC - this.FC ) + this.FC;
    this.h = Math.floor(this.h);
    this.Head = this.h;
    this.generateRequests();
      this.out = 0;
      const head = this.h;
      switch (algh) {
        case '1':
          this.FCFS();
          break;
        case '2':
          this.SSTF();
          break;
        case '3':
          this.SCAN();
          break;
        case '4':
          this.CSCAN();
          break;
        case '5':
          this.LOOK();
          break;
        case '6':
          this.CLOOK();
          break;
      }
      this.results.unshift(head);
      this.setLabels();
      console.log('chart to create');
      this.createChart();
      console.log('chart created');
  }
  createChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.results,
            borderColor: '#17a2b8',
            fill: false,
            lineTension: 0
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  FCFS() {
    this.copy(this.requests, this.requestsCopy);
    this.copy(this.requests, this.results);
    let i: number;
    for (i = 0; i < this.requestsCopy.length; i++ ) {
      if (i < 1 ) {
        this.out += Math.abs(this.results[i] - this.Head);
        console.log('out1:' + Math.abs(this.results[i] - this.Head ) );
      } else {
        console.log('out2:' + Math.abs(this.results[i] - this.results[i - 1] ) );
        this.out += Math.abs(this.results[i] - this.results[i - 1] );
      }
    }
    console.log(this.results);
    return this.out;
  }
  SSTF() {
    this.results = [];
    this.copy(this.requests, this.requestsCopy);
    this.copy(this.requests, this.requestsCopy2);
    let min = 32000;
    let index2 = 0;
    for (let j = 0; j < this.requestsCopy2.length; j++) {
      for (let i = 0; i < this.requestsCopy2.length; i++) {
        if ( (this.requestsCopy2[i] !== null ) && (Math.abs(this.requestsCopy2[i] - this.h) < min) ) {
          min = Math.abs(this.requestsCopy2[i] - this.h);
          index2 = i;
        }
      }
      this.h = this.requestsCopy2[index2];
      this.results.push(this.requestsCopy2[index2]);
      this.requestsCopy2[index2] = null;
      min = 32000;
    }
    this.out = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (i === 0) {
        this.out += Math.abs(this.results[i] - this.Head);
      } else {
        this.out += Math.abs(this.results[i] - this.results[i - 1]);
      }
    }
    console.log('copy1:' + this.requestsCopy);
    console.log('copy2:' + this.requestsCopy2);
    console.log('org:' + this.requests);
    console.log('results:' + this.results);
    console.log('Head:' + this.requestsCopy[0]);
    return this.out;
  }
  SCAN() {
    this.results = [];
    this.smaller = [];
    this.bigger = [];
    this.out = 0;
    this.copy(this.requests, this.requests);
    console.log('RCL:' + this.requests.length);
    for (let i = 0; i < this.requests.length ; i++) {
      if (this.requests[i] > this.Head) {
        this.bigger.push(this.requests[i]);
        console.log('bigger added');
      } else {
        this.smaller.push(this.requests[i]);
        console.log('smaller added');
      }
    }
    if (this.toUp) {
      this.bigger.push(this.LC);
      this.bigger.sort(this.compareAscending);
      this.smaller.sort(this.compareDecending);
      for (let i = 0; i < this.bigger.length; i++) {
        this.results.push(this.bigger[i]);
      }
      for ( let i = 0; i < this.smaller.length; i++) {
        this.results.push(this.smaller[i]);
      }
    } else {
      this.smaller.push(this.FC);
      this.bigger.sort(this.compareAscending);
      this.smaller.sort(this.compareDecending);
      for ( let i = 0; i < this.smaller.length; i++) {
        this.results.push(this.smaller[i]);
      }
      for (let i = 0; i < this.bigger.length; i++) {
        this.results.push(this.bigger[i]);
      }
    }
    this.out = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (i === 0) {
        this.out += Math.abs(this.results[i] - this.Head);
      } else {
        this.out += Math.abs(this.results[i] - this.results[i - 1]);
      }
    }
    console.log('bigger:' + this.bigger);
    console.log('smaller:' + this.smaller);
    console.log('results:' + this.results);
    return this.results;

  }
  CSCAN() {
    this.requestsCopy = [];
    this.results = [];
    this.smaller = [];
    this.bigger = [];
    this.out = 0;
    this.copy(this.requests, this.requestsCopy);
    for (let i = 0; i < this.requestsCopy.length; i++) {
      if (this.requestsCopy[i] > this.Head) {
        this.bigger.push(this.requestsCopy[i]);
      } else {
        this.smaller.push(this.requestsCopy[i]);
      }
    }
    this.bigger.push(this.LC);
    this.smaller.push(this.FC);
    if (this.toUp) {
      this.bigger.sort(this.compareAscending);
      this.smaller.sort(this.compareAscending);
      for (let i = 0; i < this.bigger.length; i++) {
        this.results.push(this.bigger[i]);
      }
      for (let i = 0; i < this.smaller.length; i++) {
        this.results.push(this.smaller[i]);
      }
    } else {
      this.bigger.sort(this.compareDecending);
      this.smaller.sort(this.compareDecending);
      for (let i = 0; i < this.smaller.length; i++) {
        this.results.push(this.smaller[i]);
      }
      for ( let i = 0; i < this.bigger.length; i++) {
        this.results.push(this.bigger[i]);
      }
    }
    this.out = 0;
    for ( let i = 0; i < this.results.length; i++) {
      if ( i === 0) {
        this.out += Math.abs(this.results[i] - this.Head);
      } else {
        this.out += Math.abs(this.results[i] - this.results[i - 1]);
      }
    }
    // this.out -= this.LC - this.FC;
    console.log('head:' + this.Head);
    console.log('bigger: ' + this.bigger);
    console.log('smaller: ' + this.smaller);
    console.log('results: ' + this.results);
    return this.results;
  }
  LOOK() {
    this.results = [];
    this.smaller = [];
    this.bigger = [];
    this.out = 0;
    this.copy(this.requests, this.requestsCopy);
    console.log('RCL:' + this.requestsCopy.length);
    for (let i = 0; i < this.requestsCopy.length ; i++) {
      if (this.requestsCopy[i] > this.Head) {
        this.bigger.push(this.requestsCopy[i]);
        console.log('bigger added');
      } else {
        this.smaller.push(this.requestsCopy[i]);
        console.log('smaller added');
      }
    }
    // this.bigger.push(this.LC);
    this.bigger.sort(this.compareAscending);
    this.smaller.sort(this.compareDecending);
    for (let i = 0; i < this.bigger.length; i++) {
      this.results.push(this.bigger[i]);
    }
    for ( let i = 0; i < this.smaller.length; i++) {
      this.results.push(this.smaller[i]);
    }
    this.out = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (i === 0) {
        this.out += Math.abs(this.results[i] - this.Head);
      } else {
        this.out += Math.abs(this.results[i] - this.results[i - 1]);
      }
    }
    console.log('bigger:' + this.bigger);
    console.log('smaller:' + this.smaller);
    console.log('results:' + this.results);
    return this.results;

  }
  CLOOK() {
    this.requestsCopy = [];
    this.results = [];
    this.smaller = [];
    this.bigger = [];
    this.out = 0;
    console.log('head type: ' + this.Head.type);
    this.copy(this.requests, this.requestsCopy);
    for (let i = 0; i < this.requestsCopy.length; i++) {
      if (this.requestsCopy[i] > this.Head) {
        this.bigger.push(this.requestsCopy[i]);
      } else {
        this.smaller.push(this.requestsCopy[i]);
      }
    }
    this.bigger.sort(this.compareAscending);
    this.smaller.sort(this.compareAscending);
    for (let i = 0; i < this.bigger.length; i++) {
      this.results.push(this.bigger[i]);
    }
    for (let i = 0; i < this.smaller.length; i++) {
      this.results.push(this.smaller[i]);
    }
    this.out = 0;
    for ( let i = 0; i < this.results.length; i++) {
      if ( i === 0) {
        this.out += Math.abs(this.results[i] - this.Head);
      } else {
        this.out += Math.abs(this.results[i] - this.results[i - 1]);
      }
    }
    console.log('head:' + this.Head);
    console.log('bigger: ' + this.bigger);
    console.log('smaller: ' + this.smaller);
    console.log('results: ' + this.results);
    return this.results;
  }
  copy(arr1: any[] , arr2: any[]) {
    for (let i = 0, len = arr1.length; i < len; i++) {
      arr2[i] = arr1[i];
    }
  }
  setNewInput(alghCheck: string) {
    if ( alghCheck === '3' || alghCheck === '4') {
      this.hasToUp = true;
    } else {
      this.hasToUp = false;
    }
  }
  setDir(dir: string) {
    switch (dir) {
      case '1':
        this.toUp = true;
        break;
      case '2' :
        this.toUp = true;
        break;
      case '3':
        this.toUp = false;
        break;
    }
  }
  compareAscending( a: number, b: number) {
    return a - b;
  }
  compareDecending( a: number, b: number) {
    return b - a;
  }
  setLabels() {
    this.index = this.results.length;
    this.labels = [];
    console.log('index: ' + this.index);
    for (let i = 0; i < this.index; i++) {
      this.labels.push(i);
    }
  }
  generateRequests() {
    this.requests = [];
    let variance = this.SD;
    variance *= variance;
    let temp = 0;
    const var1 = Math.sqrt(2 * Math.PI * variance);
    for (let i = 0; i < this.num; i++) {
      temp = (1 / (var1)) * Math.pow(Math.E, (Math.pow((Math.random() * this.EI + this.BI) - this.avg, 2) / (2 * variance)));
      console.log('temp:' + temp);
      if (Number(temp) > Number(this.BI) && Number(temp) < Number(this.EI)) {
        temp = Number(Math.floor(temp));
        this.requests.push(temp);
      } else {
        i--;
      }
    }
  }
  generateRequests2() {
    this.requests = [];
    let length = (this.EI - this.BI) / ( this.num + 1 );
    length = Math.floor(length);
    let dataTemp = this.BI;
    for ( let i = 0; i < this.num; i++ ) {
      dataTemp += length;
      this.requests.push(dataTemp);
    }
  }
  resetData(algh: string) {
    this.setNewInput(algh);
    this.requests = [];
    this.requestsCopy = [];
    this.results = [];
    this.firstTime = false;
    this.labels = [];
    this.out = 0;
    this.createChart();
  }

}
