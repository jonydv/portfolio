import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jdv-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  @Input() fromHome: boolean = false;
  skills = [
    {
      icon: '../../../assets/icons/javascript.svg',
      alt: 'Javascript Icon'
    },
    {
      icon: '../../../assets/icons/typescript.svg',
      alt: 'Typescript Icon'
    },
    {
      icon: '../../../assets/icons/angular.svg',
      alt: 'Angular Icon'
    },
    {
      icon: '../../../assets/icons/rxjs.png',
      alt: 'RxJS Icon'
    },
    {
      icon: '../../../assets/icons/reactjs.svg',
      alt: 'React Icon'
    },
    {
      icon: '../../../assets/icons/nodejs.svg',
      alt: 'NodeJs Icon'
    },
    {
      icon: '../../../assets/icons/expressjs.svg',
      alt: 'ExpressJs Icon'
    },
    {
      icon: '../../../assets/icons/sass.svg',
      alt: 'Sass Icon'
    },
    {
      icon: '../../../assets/icons/css.svg',
      alt: 'Css Icon'
    },
    {
      icon: '../../../assets/icons/html.svg',
      alt: 'Html Icon'
    },
    {
      icon: '../../../assets/icons/mongodb.svg',
      alt: 'MongoDb Icon'
    },
    {
      icon: '../../../assets/icons/mysql.svg',
      alt: 'MySql Icon'
    },
    {
      icon: '../../../assets/icons/git.svg',
      alt: 'Git Icon'
    },
    {
      icon: '../../../assets/icons/jira.svg',
      alt: 'Jira Icon'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
