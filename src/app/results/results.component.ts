import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../quiz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() quizLog: Question[];

  public numberOfCorrectAnswers: number;

  countCorrectAnswers(quizLog: Question[]): number {
    let count = 0;
    quizLog.map(item => {
      if (item.CorrectAnswer === item.UserAnswer) {
        count++;
      }
    });
    return count;
  }

  ngOnInit(): void {
    this.numberOfCorrectAnswers = this.countCorrectAnswers(this.quizLog);
  }
}
