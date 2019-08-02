import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { QuestionsService } from '../questions.service';
import { Question } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  private quiz: Question[];
  private currentQuestionIndex: number;
  private quizCategory: number;
  private quizDifficulty: string;
  private quizLog: object[];
  private userAnswer: string;
  private currentQuestion: any;
  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, private questionsService: QuestionsService) { }

  buildQuestion(quiz: Question[], index: number) {
    const incorrectAnswers: string[] = quiz[index].incorrect_answers;
    const correctAnswer: string = quiz[index].correct_answer;
    const choices = [...incorrectAnswers].concat(correctAnswer);

    // shuffle choices
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    return {
      Question: quiz[index].question,
      Choices: shuffleArray(choices),
      CorrectAnswer: correctAnswer
    };
  }

  nextOrViewResults() {
    const updatedCurrentQuestion: any = {...this.currentQuestion};
    updatedCurrentQuestion.UserAnswer = this.userAnswer;
    this.quizLog = [...this.quizLog].concat(updatedCurrentQuestion);
    this.currentQuestionIndex++;
    this.currentQuestion = this.buildQuestion(this.quiz, this.currentQuestionIndex);
    console.log(this.quizLog);
  }

  ngOnInit() {
    this.quizCategory = this.questionsService.getCategory(this.route.snapshot.params.quizCategory);
    this.quizDifficulty = this.route.snapshot.params.quizDifficulty.toLowerCase();
    this.quizLog = [];

    // Gets questions from API
    this.questionsService.getQuizzes(this.quizCategory, this.quizDifficulty).subscribe((response: any) => {
      this.quiz = response.results;
      console.log(this.quiz);

      this.currentQuestionIndex = 0;
      this.currentQuestion = this.buildQuestion(this.quiz, this.currentQuestionIndex);

      console.log(this.buildQuestion(this.quiz, this.currentQuestionIndex));
    });
  }

  // read from the dynamic route and load the proper quiz data
  //   this.questionsService.getQuestions(this.route.snapshot.params.quizId)
  //     .subscribe(questions => {
  //       // initialize everything
  //       this.questions = questions;
  //       this.answers = new Answers();
  //       this.currentQuestionIndex = 0;
  //     });
  // }

  // updateChoice(choice: Choice) {
  //   this.answers.values[this.currentQuestionIndex] = choice;
  // }


  // nextOrViewResults() {
  //   if (this.currentQuestionIndex === this.questions.length - 1) {
  //     this.showResults = true;
  //     return;
  //   }

  //   this.currentQuestionIndex++;
  // }

  // reset() {
  //   this.quiz = undefined;
  //   this.questions = undefined;
  //   this.answers = undefined;
  //   this.currentQuestionIndex = undefined;
}

