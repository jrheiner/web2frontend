import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

/**
 * Help component display information about the application, and providing answers to common questions
 */

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  /**
   * Variable for the search bar input
   */
  searchTerm = '';

  /**
   * Information to display
   */
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
          question: 'What does \'Error contacting server\' mean?',
          answer: 'This means that the web application is unable to connect to the back-end server. ' +
            'This error is usually caused on the server-side and can be fixed by starting or restarting the server.'
        },
        {
          question: 'Do I need an account?',
          answer: 'You do not need an account to view posts, comments, or user profiles.\n' +
            'To create posts yourself, comment, and vote on other posts you have to register and log in.',
          show: true
        },
        {
          question: 'Where is the data and images stored?',
          answer: 'This project relies on two cloud providers, MongoDB Atlas and Cloudinary. ' +
            'Data is stored in a MongoDB cluster hosted on AWS, ' +
            'image assets like post images or profile pictures are stored within the Cloudinary media library.\n' +
            'If you delete your post, comment, or account we also delete it from the database or media library.'
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
          answer: 'To delete your account, first, make sure you are logged in. ' +
            'Then click \'Account\' in the navigation bar and select delete. There you can delete your account after confirming.\n\n' +
            'Note: A deleted account can not be recovered, all posts, comments, and other account activity will be permanently deleted.',
          show: true
        },
        {
          question: 'Can I change my profile picture?',
          answer: 'Yes! You can upload a custom profile picture for all other users to see.'
        }
      ]
    },
    {
      category: 'Posts',
      show: true,
      collection: [
        {
          question: 'How can I post images?',
          answer: 'To post an image or multiple images you need to be logged into your account. ' +
            'Then click \'Create new post\' in the navigation bar. ' +
            'A form will open where you can select the three different post types.' +
            ' To include up to three images in your post, select post type \'Image\'.',
          show: true
        },
        {
          question: 'Can I edit my post afterwards?',
          answer: 'Yes, editing a post after creating it is possible. ' +
            'To do so select the post and click the \'Edit post\' button in the \'Manage your post\' card.\n' +
            'To quickly find your post you can use the search bar or visit your profile, where all posts made by you are listed.',
          show: true
        }
      ]
    }
  ];

  /**
   * Copy of information to display we can change
   * according to the search input without losing original copy. Linked to the HTML template.
   */
  helpDB = Array.from(this.baseDB);

  /**
   * Constructor
   * @param route - ActivatedRoute to get URL search parameter
   * @param title - Title to set browser title
   */
  constructor(private route: ActivatedRoute, private title: Title) {
    this.title.setTitle('Help and FAQ');
  }

  /**
   * On initialization get the URL parameter if it was provided
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.searchTerm = params.s;
        this.search(params.s);
      }
    });
  }

  /**
   * Search function
   * @description Manipulates the display copy of the data to only contain matching results.
   * Looking for matches in title, question, and answer
   * @param event - Searchbar input
   */
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
