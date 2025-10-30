import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente, ClienteFilters } from '../../../shared/models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  filters: ClienteFilters = {};

  // Modal properties
  showModal = false;
  editingCliente: Cliente | null = null;
  clienteForm = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    activo: true
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // Datos dummy de prueba
    this.clientes = [
      {
        id: 1,
        nombre: 'Andrés',
        apellido: 'Méndez',
        correo: 'andres@example.com',
        telefono: '123456789',
        activo: true,
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      }
    ];
    this.totalPages = 1;
    // this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    this.clienteService.getClientes(pagination, this.filters).subscribe({
      next: (response) => {
        this.clientes = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadClientes();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadClientes();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadClientes();
    }
  }

  openCreateModal(): void {
    this.editingCliente = null;
    this.clienteForm = {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      activo: true
    };
    this.showModal = true;
  }

  editCliente(cliente: Cliente): void {
    this.editingCliente = cliente;
    this.clienteForm = {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo,
      telefono: cliente.telefono,
      activo: cliente.activo
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingCliente = null;
    this.clienteForm = {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      activo: true
    };
  }

  saveCliente(): void {
    if (!this.clienteForm.nombre.trim() || !this.clienteForm.apellido.trim()) {
      alert('El nombre y apellido son requeridos');
      return;
    }

    if (this.editingCliente) {
      // Actualizar cliente existente
      const updateData = { ...this.clienteForm };
      this.clienteService.updateCliente(this.editingCliente.id, updateData).subscribe({
        next: () => {
          this.loadClientes();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar el cliente');
        }
      });
    } else {
      // Crear nuevo cliente
      const newCliente = { ...this.clienteForm };
      this.clienteService.createCliente(newCliente).subscribe({
        next: () => {
          this.loadClientes();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
          alert('Error al crear el cliente');
        }
      });
    }
  }

  deleteCliente(cliente: Cliente): void {
    if (confirm(`¿Está seguro de eliminar al cliente "${cliente.nombre} ${cliente.apellido}"?`)) {
      this.clienteService.deleteCliente(cliente.id).subscribe({
        next: () => {
          this.loadClientes();
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        }
      });
    }
  }
}
