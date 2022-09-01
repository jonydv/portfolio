import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jdv-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

  profile = {
    imageUrl: '../../../../assets/images/profile.png',
    imageAlt: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
