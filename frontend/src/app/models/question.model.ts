export enum QuestionType {
    FreeString = "FreeString",
    FreeNumber = "FreeNumber",
    Choice = "Choice"
  }

export class Question {
    questionId !: number
    title !: string
    questionType !: QuestionType
    choices !: [{id:string, choice:string, isAnswer:boolean }]
}

export class QuestionUserAnswer {
  questionId !: number;
  answer!: string;
  isGoodAnswer!: boolean;

}