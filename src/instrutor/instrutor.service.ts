import { Instrutor } from "../shared/model/instrutor";
import { InstrutorRepository } from "./instrutor.repository";

export class InstrutorService {
  private repository: InstrutorRepository;

  constructor(repository: InstrutorRepository) {
    this.repository = repository;
  }

  async createInstrutor(aluno: Instrutor): Promise<Instrutor> {
    return await this.repository.create(aluno);
  }

  async getAll(): Promise<Instrutor[]> {
    return await this.repository.getAll();
  }

  async getById(id: number): Promise<Instrutor | undefined> {
    return await this.repository.getById(id);
  }

  async updatePartOfInstrutor(id: number, instrutor: Instrutor): Promise<void> {

    await this.repository.updatePartOfInstrutor(id, instrutor);
  }

  async updateInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    await this.repository.updateInstrutor(id, instrutor);
  }

  async deleteInstrutor(id: number):Promise<void> {
    await this.repository.delete(id);
  }
}
