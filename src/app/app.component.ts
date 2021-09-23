import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from './models/Cliente';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clientes:Cliente[];
  cliente = {} as Cliente;

  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    this.getClientes();
  }

  // defini se um carro será criado ou atualizado
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

  // Chama o serviço para obtém todos os carros
  getClientes() {
    this.clienteService.getCars().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // deleta um carro
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
