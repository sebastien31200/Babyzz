import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilegridComponent } from './tilegrid.component';

describe('TilegridComponent', () => {
  let component: TilegridComponent;
  let fixture: ComponentFixture<TilegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilegridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TilegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
