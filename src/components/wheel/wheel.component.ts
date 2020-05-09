import { Color } from './../../app/models/color';
import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
})
export class WheelComponent implements OnInit {
  @Input() nations: Team[];
  @Input() clubs: Team[];

  rotateDeg = 0;
  power = 0;
  timeleft = 100;
  private powerInterval;
  private runInterval;
  private rotateInterval;
  private isRunning = false;

  constructor() {}

  ngOnInit(): void {
    this.drawPie(this.nations, 300);
    this.drawPie(this.clubs, 500, 'pie-club');
  }
  onMouseDown() {
    console.log('onMouseDown');
    if (!this.isRunning) {
      this.power = 0;
      this.powerInterval = setInterval(() => {
        this.power++;
        this.rotateDeg -= this.power / 5;
        if (this.power >= 100) {
          this.power = 40;
        }
      }, 20);
    }
  }

  onMouseUp() {
    console.log('onMouseUp');
    if (!this.isRunning) {
      clearInterval(this.powerInterval);
      this.powerInterval = null;

      this.startRun();
    }
  }

  startRun() {
    console.log('startRun');
    this.isRunning = true;
    this.timeleft = this.power;
    this.power = 0;
    let deg = 0;
    this.runInterval = setInterval(() => {
      this.timeleft--;
      if (this.timeleft <= 0) {
        this.stopRun();
      }
    }, 50);
    this.rotateInterval = setInterval(() => {
      deg += this.timeleft / 2;
      this.rotateDeg = deg % 360;
    }, 1);
  }

  stopRun() {
    console.log('stopRun');

    clearInterval(this.runInterval);
    clearInterval(this.rotateInterval);
    this.runInterval = null;
    this.rotateInterval = null;
    this.isRunning = false;
  }

  private drawPie(teams: Team[], radius: number, svgId = 'pie-nation') {
    // Setup global variables
    const svg = document.getElementById(svgId),
      totalValue = teams.length,
      circleLength = Math.PI * radius; // Circumference = PI * Diameter
    let spaceLeft = circleLength;

    // Loop trough data to create pie
    teams.forEach((team) => {
      // Create circle
      var circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      const centerPosition = (radius / 2).toString();
      // Set attributes (self explanatory)
      circle.setAttribute('class', 'pie-chart-value');
      circle.setAttribute('cx', centerPosition);
      circle.setAttribute('cy', centerPosition);
      circle.setAttribute('r', (radius / 2).toString());

      // Set dash on circle
      circle.style.strokeDasharray = spaceLeft + ' ' + circleLength;

      // Set Stroke color
      circle.style.stroke = team.color;
      console.log(team, circle);

      // Append circle to svg.
      svg.appendChild(circle);

      // Subtract current value from spaceLeft
      spaceLeft -= (1 / totalValue) * circleLength;
    });
  }
}
