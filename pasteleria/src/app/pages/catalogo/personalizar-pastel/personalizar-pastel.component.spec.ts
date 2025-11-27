import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizarPastelComponent } from './personalizar-pastel.component';

describe('PersonalizarPastelComponent', () => {
  let component: PersonalizarPastelComponent;
  let fixture: ComponentFixture<PersonalizarPastelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizarPastelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizarPastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
