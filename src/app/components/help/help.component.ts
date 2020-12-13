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
          answer: 'test2',
          show: true
        },
        {
          question: 'Do I need an account?',
          answer: 'test2',
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
