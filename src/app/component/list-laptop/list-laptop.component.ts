import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LaptopService } from '../../service/laptop.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Laptop } from '../../model/laptop';

@Component({
  selector: 'app-list-laptop',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './list-laptop.component.html',
  styleUrl: './list-laptop.component.css'
})
export class ListLaptopComponent {
  laptops: Laptop[] = [];

  constructor(private laptopService: LaptopService, private router: Router) { }

  ngOnInit(): void {
    this.laptopService.getLaptops().subscribe(data => {
      this.laptops = data;
    });
  }

  deleteLaptop(id: number): void {
    this.laptopService.deleteLaptop(id).subscribe(() => {
      this.laptops = this.laptops.filter(laptop => laptop.id !== id);
    });
  }

  editLaptop(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}