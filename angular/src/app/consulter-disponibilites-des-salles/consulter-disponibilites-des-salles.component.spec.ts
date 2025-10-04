import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDisponibilitesDesSallesComponent } from './consulter-disponibilites-des-salles.component';

describe('ConsulterDisponibilitesDesSallesComponent', () => {
  let component: ConsulterDisponibilitesDesSallesComponent;
  let fixture: ComponentFixture<ConsulterDisponibilitesDesSallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterDisponibilitesDesSallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterDisponibilitesDesSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
