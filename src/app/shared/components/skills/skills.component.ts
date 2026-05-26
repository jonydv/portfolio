import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'jdv-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  @Input() fromHome: boolean = false;
  skills = [
    // Angular ecosystem (primary identity)
    { icon: '../../../assets/icons/typescript.svg',    alt: 'Typescript Icon',    label: 'TypeScript'      },
    { icon: '../../../assets/icons/angular.svg',       alt: 'Angular Icon',       label: 'Angular'         },
    { icon: '../../../assets/icons/rxjs.png',          alt: 'RxJS Icon',          label: 'RxJS'            },
    { icon: '../../../assets/icons/ngrx.svg',          alt: 'Ngrx Icon',          label: 'NgRx'            },
    { icon: '../../../assets/icons/spartacus.png',     alt: 'Sap Spartacus Icon', label: 'SAP Spartacus'   },
    // React / Node ecosystem
    { icon: '../../../assets/icons/nextjs.svg',        alt: 'Next.js Icon',       label: 'Next.js'         },
    { icon: '../../../assets/icons/reactjs.svg',       alt: 'React Icon',         label: 'React'           },
    { icon: '../../../assets/icons/nodejs.svg',        alt: 'NodeJs Icon',        label: 'Node.js'         },
    { icon: '../../../assets/icons/expressjs.svg',     alt: 'ExpressJs Icon',     label: 'Express'         },
    { icon: '../../../assets/icons/tanstack.png',      alt: 'TanStack Icon',      label: 'TanStack Query'  },
    { icon: '../../../assets/icons/nextauth.svg',      alt: 'Next-Auth Icon',     label: 'NextAuth'        },
    // Styling
    { icon: '../../../assets/icons/sass.svg',          alt: 'Sass Icon',          label: 'SCSS / Sass'     },
    { icon: '../../../assets/icons/tailwindcss.svg',   alt: 'Tailwind CSS Icon',  label: 'Tailwind CSS'    },
    { icon: '../../../assets/icons/javascript.svg',    alt: 'Javascript Icon',    label: 'JavaScript'      },
    // Databases
    { icon: '../../../assets/icons/mongodb.svg',       alt: 'MongoDb Icon',       label: 'MongoDB'         },
    { icon: '../../../assets/icons/mysql.svg',         alt: 'MySql Icon',         label: 'MySQL'           },
    // AI Tools (differentiators)
    { icon: '../../../assets/icons/claude.svg',        alt: 'Claude AI Icon',     label: 'Claude AI'       },
    { icon: '../../../assets/icons/github-copilot.svg',alt: 'GitHub Copilot Icon',label: 'GitHub Copilot'  },
    { icon: '../../../assets/icons/cursor-ai.svg',     alt: 'Cursor AI Icon',     label: 'Cursor AI'       },
    // Infra / tooling
    { icon: '../../../assets/icons/aws.svg',           alt: 'AWS Icon',           label: 'AWS'             },
    { icon: '../../../assets/icons/git.svg',           alt: 'Git Icon',           label: 'Git'             },
    { icon: '../../../assets/icons/jira.svg',          alt: 'Jira Icon',          label: 'Jira'            },
    // Testing
    { icon: '../../../assets/icons/karma.webp',        alt: 'Karma Icon',         label: 'Karma'           },
    { icon: '../../../assets/icons/jasmine.svg',       alt: 'Jasmine Icon',       label: 'Jasmine'         },
  ];
}
