import { Injectable } from "@angular/core";
import { Question, QuestionType, QuestionUserAnswer } from "../models/question.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()

export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions`);
  }

  postAnswer(answer: {questionId: number, answer: string}) : Observable<boolean> {
    return this.http.post<QuestionUserAnswer>(`${environment.apiUrl}/questions/answer`, answer).pipe(map(res => {
      return res.isGoodAnswer;
    }));
  }
}