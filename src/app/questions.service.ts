import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './quiz.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) { }

  public getQuizzes(categoryName: number, difficulty: string): Observable<Question[]> {
    const apiUrl = `https://opentdb.com/api.php?amount=2&category=${categoryName}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<Question[]>(apiUrl);
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

  public shuffleArray(array: string[]) {
    for (let i: number = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
