import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Quiz, Question } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  public quiz: Quiz[];
  public currentQuestionIndex: number;
  public quizLog: Question[];
  public userAnswer: string; // value comes from questions.component.html
  public currentQuestion: Question;
  public renderResults: boolean;

  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, private questionsService: QuestionsService) {
   }

  buildQuestion(quiz: Quiz[], index: number): Question {
    const incorrectAnswers: string[] = quiz[index].incorrect_answers;
    const correctAnswer: string = quiz[index].correct_answer;
    const choices: string[] = [...incorrectAnswers].concat(correctAnswer);

    return {
      Question: quiz[index].question,
      Choices: this.questionsService.shuffleArray(choices),
      CorrectAnswer: correctAnswer
    };
  }

  nextOrViewResults() {
    const updatedCurrentQuestion: Question = {...this.currentQuestion};
    updatedCurrentQuestion.UserAnswer = this.userAnswer;
    this.userAnswer = undefined;
    this.quizLog = [...this.quizLog].concat(updatedCurrentQuestion);

    if (this.currentQuestionIndex < this.quiz.length - 1) {
      this.nextPage();
    } else {
      this.showResults();
    }
  }

  nextPage() {
    this.currentQuestionIndex++;
    this.currentQuestion = this.buildQuestion(this.quiz, this.currentQuestionIndex);
  }

  showResults() {
    this.renderResults = true;
    this.reset();
  }

  ngOnInit() {
    this.quizLog = [];
    this.renderResults = false;

    // Gets questions from API
    const quizCategory: number = this.questionsService.getCategory(this.route.snapshot.params.quizCategory);
    const quizDifficulty: string = this.route.snapshot.params.quizDifficulty.toLowerCase();

    this.questionsService.getQuizzes(quizCategory, quizDifficulty).subscribe((response: any) => {
      this.quiz = response.results;

      this.currentQuestionIndex = 0;
      this.currentQuestion = this.buildQuestion(this.quiz, this.currentQuestionIndex);
    });
  }

  reset() {
    this.quiz = undefined;
    this.currentQuestionIndex = undefined;
    this.userAnswer = undefined;
    this.currentQuestion = undefined;
  }
}

