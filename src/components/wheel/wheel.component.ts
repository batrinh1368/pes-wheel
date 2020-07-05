import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from 'src/app/models';
import { SelectionIndex } from 'src/app/pw-modals/team-selection/team-selection-data';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
})
export class WheelComponent implements OnInit {
  @Input() nations: Team[];
  @Input() clubs: Team[];
  @Output() onStartRun: EventEmitter<boolean> = new EventEmitter();
  @Output() onSelected: EventEmitter<SelectionIndex> = new EventEmitter();

  rotateDeg = 0;
  rotateDegClub = 0;
  power = 0;
  timeleft = 100;
  clubTransitionCSS;
  private svgNS = 'http://www.w3.org/2000/svg';
  private powerInterval;
  private runInterval;
  private rotateInterval;
  private isRunning = false;

  constructor() {}

  ngOnInit(): void {
    this.startDrawPie();
  }

  startDrawPie() {
    this.drawPie(this.nations, 300);
    this.drawPie(this.clubs, 500, 'pie-club');
  }

  onMouseDown() {
    console.log('onMouseDown');
    if (!this.isRunning) {
      this.power = 0;
      this.powerInterval = setInterval(() => {
        this.power++;
        // reverser the wheel
        this.rotateDeg -= this.power / 20;
        this.rotateDegClub -= this.power / 10;

        // go back to increase the power effect
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
    let timeLeftClub = this.timeleft + 10;
    this.power = 0;
    let deg = 0;
    let degClub = 0;
    this.runInterval = setInterval(() => {
      this.timeleft--;
      timeLeftClub--;
      if (timeLeftClub <= 5) {
        this.beginStop(timeLeftClub);
      }
    }, 50);
    this.rotateInterval = setInterval(() => {
      if (this.timeleft >= 0) {
        deg += this.timeleft / 2;
      }
      if (timeLeftClub >= 0) {
        degClub += timeLeftClub / 3;
      }
      this.rotateDeg = Math.round(deg % 360);
      this.rotateDegClub = Math.round(degClub % 360);
    }, 5);
    this.onStartRun.next(true);
  }

  beginStop(timeLeftClub) {
    clearInterval(this.runInterval);
    clearInterval(this.rotateInterval);
    this.rotateInterval = null;
    this.runInterval = null;

    const stopDeg = this.findClubStopRotate();
    this.clubTransitionCSS = `transform ${
      stopDeg - this.rotateDegClub
    }0ms ease-out`;
    console.log('begin stop', this.clubTransitionCSS);

    const keepRunInterval = setInterval(() => {
      timeLeftClub--;

      if (timeLeftClub <= 0) {
        this.rotateDegClub = stopDeg;
        clearInterval(keepRunInterval);
        this.stopRun();
      }
    }, 1);
  }

  findClubStopRotate() {
    const unitDeg = this.unitRotate;
    const checkRotate = (this.rotateDegClub - this.rotateDeg) % unitDeg;
    if (checkRotate <= 0) {
      return this.rotateDegClub - checkRotate;
    } else {
      return this.rotateDegClub + unitDeg - checkRotate;
    }
  }

  stopRun() {
    console.log('stopRun');

    this.isRunning = false;
    setTimeout(() => {
      this.clubTransitionCSS = null;
    }, 300);
    this.findSelection();
  }

  private findSelection() {
    console.log('findSelection', this.nations.length, this.rotateDeg);
    const nationIndex =
      Math.floor(this.rotateDeg / this.unitRotate) % this.nations.length;
    const clubIndex =
      Math.floor(this.rotateDegClub / this.unitRotate) % this.clubs.length;
    this.onSelected.next({
      nationIndex: nationIndex,
      clubIndex: clubIndex,
    });
  }

  private drawPie(teams: Team[], radius: number, svgId = 'pie-nation') {
    // Setup global variables
    const svg = document.getElementById(svgId),
      totalValue = teams.length,
      circleLength = Math.PI * radius; // Circumference = PI * Diameter
    let spaceLeft = circleLength;

    // Loop trough data to create pie
    teams.forEach((team) => {
      this.drawCircle(svg, team.color, radius, spaceLeft, circleLength);
      this.addText(svg, team.index + 1, radius, spaceLeft, circleLength);
      // Subtract current value from spaceLeft
      spaceLeft -= (1 / totalValue) * circleLength;
    });
  }

  private drawCircle(
    svg,
    color: string,
    radius: number,
    spaceLeft: number,
    circleLength: number
  ) {
    // Create circle
    const circle: any = document.createElementNS(this.svgNS, 'circle');
    const centerPosition = (radius / 2).toString();
    // Set attributes (self explanatory)
    circle.setAttribute('class', 'pie-chart-value');
    circle.setAttribute('cx', centerPosition);
    circle.setAttribute('cy', centerPosition);
    circle.setAttribute('r', (radius / 2).toString());

    // Set dash on circle
    circle.style.strokeDasharray = spaceLeft + ' ' + circleLength;

    // Set Stroke color
    circle.style.stroke = color;

    // Append circle to svg.
    svg.appendChild(circle);
  }

  private addText(svg, label: any, radius: any, spaceLeft, circleLength) {
    console.log('addText', label, radius, spaceLeft, circleLength)
    var newText = document.createElementNS(this.svgNS, 'text');
    newText.setAttributeNS(null, 'x', radius);
    newText.setAttributeNS(null, 'y', radius);
    newText.setAttributeNS(null, 'font-size', '20');

    var textNode = document.createTextNode(label);
    newText.appendChild(textNode);
    svg.appendChild(newText);
  }

  private get unitRotate(): number {
    return 360 / this.nations.length;
  }
}
