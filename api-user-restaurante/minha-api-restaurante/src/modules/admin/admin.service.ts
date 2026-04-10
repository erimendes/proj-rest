import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  create() { return 'Ação: Adicionar novo administrador'; }
  findAll() { return 'Ação: Listar todos os administradores'; }
  findOne(id: number) { return `Ação: Ver detalhes do admin #${id}`; }
  update(id: number) { return `Ação: Atualizar admin #${id}`; }
  remove(id: number) { return `Ação: Remover admin #${id}`; }
}
