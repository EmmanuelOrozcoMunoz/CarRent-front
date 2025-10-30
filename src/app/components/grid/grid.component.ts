
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  contratos: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getContratos().subscribe({
      next: (res) => this.contratos = res,
      error: (err) => console.error('Error al obtener contratos:', err)
    });
  }
}
