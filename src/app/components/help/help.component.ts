import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  helpDB = [
    {
      question: 'How can I create a post?',
      answer: 'test'
    },
    {
      question: 'How can I delete my account?',
      answer: 'test1'
    },
    {
      question: 'What are the username and password requirements?',
      answer: 'test2'
    }
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
