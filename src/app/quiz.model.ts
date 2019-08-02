export class Question {
    constructor(
      public category: string,
      // tslint:disable-next-line: variable-name
      public correct_answer: string,
      public difficulty: string,
      // tslint:disable-next-line: variable-name
      public incorrect_answers: string[],
      public question: string,
      public type: string
    ) { }

}
