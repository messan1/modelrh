import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNavComponent } from './template-nav.component';

describe('TemplateNavComponent', () => {
  let component: TemplateNavComponent;
  let fixture: ComponentFixture<TemplateNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
