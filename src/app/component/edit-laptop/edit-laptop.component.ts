import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LaptopService } from '../../service/laptop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-edit-laptop',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './edit-laptop.component.html',
  styleUrl: './edit-laptop.component.css'
})
export class EditLaptopComponent implements OnInit {
  laptopForm: FormGroup;
  id: number | null = null;
  marcas = ['Microsoft', 'Dell', 'Lenovo'];

  constructor(
    private fb: FormBuilder,
    private laptopService: LaptopService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.laptopForm = this.fb.group({
      marca: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.laptopService.getLaptopById(this.id).subscribe(laptop => {
        this.laptopForm.patchValue(laptop);
      });
    }
  }

  onSubmit(): void {
    if (this.laptopForm.valid) {
      if (this.id) {
        this.laptopService.updateLaptop(this.id, this.laptopForm.value).subscribe(() => {
          this.router.navigate(['/list']);
        });
      } else {
        this.laptopService.addLaptop(this.laptopForm.value).subscribe(() => {
          this.router.navigate(['/list']);
        });
      }
    }
  }
}