import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarruselComponent } from './admin-carrusel.component';

describe('AdminCarruselComponent', () => {
  let component: AdminCarruselComponent;
  let fixture: ComponentFixture<AdminCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
