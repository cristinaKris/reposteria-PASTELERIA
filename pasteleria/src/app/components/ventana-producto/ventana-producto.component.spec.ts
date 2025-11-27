import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaProductoComponent } from './ventana-producto.component';

describe('VentanaProductoComponent', () => {
  let component: VentanaProductoComponent;
  let fixture: ComponentFixture<VentanaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
