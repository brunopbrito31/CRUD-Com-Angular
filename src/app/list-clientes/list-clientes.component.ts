import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  clientes:Cliente[];
  cliente = {} as Cliente;

  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    this.getClientes();
  }

  // defini se um cliente será criado ou atualizado
  saveCliente(form: NgForm) {
    if (this.cliente.Id !== undefined) {
      this.clienteService.updateCar(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCar(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os clientes
  getClientes() {
    this.clienteService.getCars().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // deleta um cliente
  deleteCliente(car: Cliente) {
    this.clienteService.deleteCar(car).subscribe(() => {
      this.getClientes();
    });
  }

  // copia o cliente para ser editado.
  editCliente(car: Cliente) {
    this.cliente = { ...car };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}
