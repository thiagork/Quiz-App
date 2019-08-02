export class Quiz {
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

export class Question {
  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    public Question: string,
    public Choices: string[],
    public CorrectAnswer: string,
    public UserAnswer?: string
  ) { }

}

