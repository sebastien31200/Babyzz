import { Injectable } from "@angular/core";
import { Question, QuestionType, QuestionUserAnswer } from "../models/question.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
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
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error("Oops, une erreur technique a eu lieu côté serveur"));
  }
}