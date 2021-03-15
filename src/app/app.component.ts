import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { RandomTraversal } from './random-traversal';
import { Directions } from "./directions";

const N = Directions.N;
const S = Directions.S;
const W = Directions.W;
const E = Directions.E;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  title = 'bfs-vis-ng';
  canvasWidth: number;
  canvasHeight: number;

  constructor() {
    this.canvasWidth = 800;
    this.canvasHeight = 600;
  }

  ngOnInit() {
    this.initCanvasContext();
  }

  initCanvasContext(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  onClickCanvas(event: { clientX: number; clientY: number }) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.draw();
  }

  draw(): void {

  }


}
