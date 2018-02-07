import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  chart = [];
  requests: number[]  = [];
  requestsCopy: number[]  = [];
  requestsCopy2: number[]  = [];
  bigger: number[] = [];
  smaller: number[] = [];
  labels = [];
  index;
  data;
  FC;
  LC;
  Head;
  algh;
  h;
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
  onKey(value: string, type: string) {
    switch (type) {
      case 'FC':
        this.FC = value;
        break;
      case 'LC':
        this.LC = value;
        break;
      case 'Head':
        this.Head = value;
        break;
      case 'data':
        this.data = value;
        break;
      case 'algh':
        this.algh = value;
        break;
    }
    this.data = value;
  }
  addData(algh: string, box: string, FC: string, LC: string, Head: string) {
    this.firstTime = true;
    this.algh = algh;
    this.data = box;
    this.FC = FC;
    this.LC = LC;
    const head = Number(Head);
    if (this.Head !== head) {
      this.Head = head;
      // this.requests[0] = this.Head;
    }
    if (this.data !== undefined) {
      this.requests.push(this.data);
      this.out = 0;
      this.h = head;
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
      console.log(this.results);
      this.results.unshift(head);
      this.setLabels();
      this.createChart();
      console.log('up:' + this.toUp);
    }

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
    console.log('head type: ' + this.Head.type);
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
}
