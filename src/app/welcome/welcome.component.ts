import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  quiz: object[];
  selectedCategory: string;
  selectedDifficulty: string;
  categories: string[] = ['General Knowledge', 'Science & Nature', 'Mythology', 'History'];
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];

  constructor(public questionsService: QuestionsService) { }

  ngOnInit() {
  }

}
