import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'jdv-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent implements OnInit {
  showScrollButton: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const position =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.showScrollButton = position >= window.innerHeight / 2;
  }
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
