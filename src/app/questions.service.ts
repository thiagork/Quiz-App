import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question } from './quiz.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  public getQuizzes(categoryName: number, difficulty: string):Observable<any> {
    return this.http.get(`https://opentdb.com/api.php?amount=5&category=${categoryName}&difficulty=${difficulty}&type=multiple`);
  }

  public getCategory(categoryName: string) {
    switch (categoryName) {
      case 'General Knowledge':
        return 9;
      case 'Science & Nature':
        return 17;
      case 'Mythology':
        return 20;
      case 'History':
        return 23;
    }
  }


  // public getQuizzes() {
  //   return this.http.get(`./assets/quiz-list.json`).pipe(
  //     map((result: any[]) => {
  //       return result.map(r => new Quiz(r.label, r.name, r.description, r.fileName));
  //     })
  //   );
  // }

  public getQuestions(fileName: string) {
    return this.http.get(`./assets/${fileName}.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question(r.label, r.choices));
      })
    );
  }
}