import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  searchTerm = '';

  baseDB = [
    {
      category: 'General',
      show: true,
      collection: [
        {
          question: 'What are the username and password requirements?',
          answer: 'A username is 2-16 characters long, contains only alphanumeric characters, ' +
            'underscore, and minus. It cannot start or end with an underscore or minus.\nA username has to be unique, ' +
            'meaning only one user can have it.\n\n' +
            'A password is 5-32 characters long, has to contain at least one uppercase, ' +
            'one lowercase, one number, and one special character (@$!%*?&).',
          show: true
        },
        {
          question: 'Do I need an account?',
          answer: 'You do not need an account to view posts, comments, or user profiles.\n' +
            'To create posts yourself, comment and vote on other posts you have to register and login.',
          show: true
        }
      ]
    },
    {
      category: 'Account',
      show: true,
      collection: [
        {
          question: 'How I change my username?',
          answer: 'You can change your username to another username that is not currently in use.\n' +
            'To do so click on \'Account\' and select \'edit\' in the dropdown menu.' +
            '\n\nNote: After changing your username, your old username becomes available for anyone else to claim.',
          show: true
        },
        {
          question: 'How can I delete my account?',
          answer: 'test1',
          show: true
        }
      ]
    },
    {
      category: 'Posts',
      show: true,
      collection: [
        {
          question: 'How can I post images?',
          answer: 'test1',
          show: true
        },
        {
          question: 'How can I edit my posts?',
          answer: 'test1',
          show: true
        }
      ]
    }
  ];

  helpDB = Array.from(this.baseDB);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.searchTerm = params.s;
        this.search(params.s);
      }
    });
  }

  search(event: string): void {
    const term = event ? event.toLowerCase() : '';
    this.helpDB.forEach((entry, outerIndex) => {
      this.helpDB[outerIndex].collection.forEach((item, innerIndex) => {
        this.helpDB[outerIndex].collection[innerIndex].show = item.question.toLowerCase().includes(term)
          || item.answer.toLowerCase().includes(term);
      });
      this.helpDB[outerIndex].show = this.helpDB[outerIndex].collection.some(item => item.show);
    });
  }
}
