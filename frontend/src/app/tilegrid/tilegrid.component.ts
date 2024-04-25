import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { getQuestionColor } from '../ColorUtils';
import { QuestionComponent } from "../question/question.component";
import { QuestionService } from '../services/questions.service';
import { Question } from '../models/question.model';
import { HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tilegrid',
  standalone: true,
  templateUrl: './tilegrid.component.html',
  styleUrl: './tilegrid.component.scss',
  animations: [
    trigger('grid-tile', [
      state('default', style({ transform: 'translateX(0)', boxShadow: 'none' })),
      state('hover', style({ transform: 'scale(1.01)', boxShadow: '5px 5px 2px #222222' })),
      state('hide', style({ transform: 'translateX({{translateValue}}px) scale(1.01)', boxShadow: '5px 5px 2px #222222' }), { params: { translateValue: 10 } }),
      transition('default => hide', [
        sequence([
          style({ boxShadow: 'none' }),
          animate('500ms ease-in-out', style({ transform: 'scale(1.01)', boxShadow: '5px 5px 2px #222222' })),
          animate('1000ms ease-in-out'),
        ])
      ]),
      transition('default => hover', [
        animate('200ms ease-in',),
      ]),
      transition('hover => default', [
        animate('200ms ease-in-out')
      ]),
    ])
  ],
  imports: [RouterOutlet, MatGridListModule, CommonModule, QuestionComponent, HttpClientModule],
  providers: [QuestionService]
})

export class TilegridComponent implements OnInit {
  title = 'babyzz';
  tilesParam: { [key: number]: { background: string, state: string, translateValue: number, zindex: number } } = {};
  questionsMap !: Map<number, Question>;
  showImage !: boolean;
  showQuestion !: boolean;
  selectedQuestion !: Question;
  isPhonePortrait!: boolean;

  constructor(private questionService: QuestionService, private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.showImage = false;
    this.questionsMap = new Map<number,Question>();
    this.questionService.getQuestions().pipe(tap((questions)=>{
      questions.forEach(q => {
        let id = q.questionId;
        this.questionsMap.set(id,q);
        this.tilesParam[id] = { background: getQuestionColor(id), state: 'default', translateValue: 10, zindex: 1 };
      })
      this.showImage = true;
    })).subscribe();

    this.responsive.observe(Breakpoints.HandsetPortrait)
    .subscribe(result => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });

  }

  onTileHover(id: number) {
    this.tilesParam[id].zindex = 100; //Translate tile to right by default
    this.tilesParam[id].state = "hover";
  }

  onTileLeave(id: number) {
    this.tilesParam[id].zindex = 1; //Translate tile to right by default
    this.tilesParam[id].state = "default";
  }

  onTileClick(id: number) {
    this.showQuestion = true;
    this.selectedQuestion = this.questionsMap.get(id)!;
  }

  onHideQuestion(tileId: number) {
    this.showQuestion = false;
    if(tileId != undefined){
      this.revealTile(tileId)
    }
  }

  revealTile(tileId: number) {
    let elt = document.getElementById(`tile-${tileId}`)
    if (elt instanceof HTMLElement) {
      let rect = (<HTMLElement>elt).getBoundingClientRect();
      this.tilesParam[tileId].zindex = 100; //Translate tile to right by default
      if (rect.x === 0) {
        this.tilesParam[tileId].translateValue = -rect.width; //Translate tile to left
      }
      else if (window.innerWidth - rect.x < rect.width) {
        this.tilesParam[tileId].translateValue = rect.width; //Translate tile to right
      }
      else {
        this.tilesParam[tileId].translateValue = (window.innerWidth - rect.x + rect.width); //Translate tile to right by default

      }
      this.tilesParam[tileId].state = "hide";
    }
  }
}

