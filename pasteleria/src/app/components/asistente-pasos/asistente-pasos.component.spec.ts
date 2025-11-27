import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistentePasosComponent } from './asistente-pasos.component';

describe('AsistentePasosComponent', () => {
  let component: AsistentePasosComponent;
  let fixture: ComponentFixture<AsistentePasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistentePasosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistentePasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
