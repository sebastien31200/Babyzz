import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { Question, QuestionType } from '../models/question.model';
import { getQuestionColor } from '../ColorUtils';
import { QuestionService } from '../services/questions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';
import confetti from 'canvas-confetti';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question!: Question;
  questionTitle!: string;
  questionType!: string;
  questionColor!: string;
  mainForm!: FormGroup;
  showInput!: boolean;
  showSuccess!: boolean;
  showError!: boolean;
  choices!: string[];
  @Output() hideQuestion = new EventEmitter();
  loading!: boolean;
  choiceCtrl!: FormControl;
  inputCtrl!: FormControl;
  isPhonePortrait!: boolean;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private snackBar: MatSnackBar, private responsive: BreakpointObserver) { }
  ngOnInit(): void {

    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhonePortrait = false;
        if (result.matches) {
          this.isPhonePortrait = true;
        }
      });

    this.initControls();
    this.loading = false;
  }

  initControls() {
    this.inputCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.choiceCtrl = this.formBuilder.control('', Validators.required);
    this.questionTitle = this.question.title;
    this.questionColor = getQuestionColor(this.question.questionId);
    if (this.question.questionType === QuestionType.FreeString) {
      this.showInput = true;
      this.questionType = "Réponse libre"
      this.mainForm = this.formBuilder.group({
        questionId: this.question.questionId,
        answer: this.inputCtrl
      });
  
    }
    else if (this.question.questionType === QuestionType.Choice) {
      this.choices = [];
      this.questionType = "Quizz";
      this.question.choices.forEach((choice) => { this.choices.push(choice.choice) });
      this.mainForm = this.formBuilder.group({
        questionId: this.question.questionId,
        answer: this.choiceCtrl
      });
    }
  }

  onFormSubmit() {
    this.loading = true;
    this.questionService.postAnswer(this.mainForm.value).pipe(tap(goodAnswer => {
      this.loading = false
      if (this.question.questionType == QuestionType.Choice) {
        if (goodAnswer) {
          this.showSuccess = true;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 150
          });
        }
        else {
          this.showError = true;
        }
        setTimeout(() => {
          this.showSuccess = false;
          this.showError = false;
          if (goodAnswer) {
            confetti.reset()
            this.close(true);
          }
        }, 3000);
      }
      else {
        this.close(true);
      }
    }),
      catchError((error: any) => {
        return throwError(() => {
          this.snackBar.open(error, undefined, { duration: 3000 });
          this.loading = false;
        })
      })).subscribe();
  }

  close(revealTile: boolean) {
    if (revealTile) {
      this.hideQuestion.emit(this.question.questionId);
    }
    else {
      this.hideQuestion.emit();
    }
  }

}


