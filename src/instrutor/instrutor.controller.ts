import { Instrutor } from "../shared/model/instrutor";
import { instrutorService } from "./instrutor.service";
import { Request, Response } from "express";

export class InstrutorController {
  private service: InstrutorService;

  constructor(service: InstrutorService) {
    this.service = service;
  }

  // CRUD - (C)reate
  async createInstrutor(req: Request<{}, {}, Instrutor>, res: Response) {
    try {
      // ENTRADA
      const instrutor = req.body;
      // PROCESSAMENTO
      const novoInstrutor = await this.service.createInstrutor(instrutor);
      // SAÍDA
      res.status(201).send(novoInstrutor);
    } catch (error) {
      // Imprime o erro
      console.log("Error - InstrutorController>createInstrutor", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (R)etrieve
  async getInstrutor(_: Request, res: Response) {
    try {
      // Busca os dados no banco
      const insturtores = await this.service.getAll();
      // Retorna os dados
      res.status(200).send(insturtores);
    } catch (error) {
      console.log("Error - InstrutorController>getInstrutor", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async getInstrutorById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // Busca os dados no banco
      const instrutor = await this.service.getById(instrutorId);
      if (!instrutor) {
        res.status(404).send({ error: true, message: "insturtor não encontrado" });
        return;
      }

      // Retorna os dados
      res.status(200).send(aluno);
    } catch (error) {
      console.log("Error - AlunoController>getAlunoById", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (U)pdate
  async updatePartOfAluno(
    req: Request<{ id: string }, {}, Aluno>,
    res: Response
  ) {
    try {
      // Pega o id dos parametros de rota
      const { id } = req.params;
      // Valida se o id foi informado
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      // Converte o id para number
      const alunoId = parseInt(id);
      // Valida se é um número
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      // Pegar os dados do aluno
      const aluno = req.body;
      // Chama o service para atualizar o aluno
      await this.service.updateAluno(alunoId, aluno);
      // Busca os dados atualizados do aluno e retorna
      const alunoAtualizado = await this.service.getById(alunoId);
      res.status(200).send(alunoAtualizado);
    } catch (error) {
      console.log("Error - AlunoController>updateAluno", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async updateAllFieldsAluno(
    req: Request<{ id: string }, {}, Aluno>,
    res: Response
  ) {
    try {
      // Pega o id dos parametros de rota
      const { id } = req.params;
      // Valida se o id foi informado
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      // Converte o id para number
      const alunoId = parseInt(id);
      // Valida se é um número
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      // Pegar os dados do aluno
      const aluno = req.body;
      // Chama o service para atualizar o aluno
      await this.service.updateAluno(alunoId, aluno);

      const alunoAtualizado = await this.service.getById(alunoId);
      res.status(200).send(alunoAtualizado);
      console.log(alunoAtualizado);
    } catch (error) {
      console.log("Error - AlunoController>updateAluno", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async deleteAluno(req: Request<{ id: string }, {}, Aluno>, res: Response) {
    try {
      // Pega o id dos parametros de rota
      const { id } = req.params;
      // Valida se o id foi informado
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      // Converte o id para number
      const alunoId = parseInt(id);
      // Valida se é um número
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      // Pegar os dados do aluno
      const aluno = req.body;
      // Chama o service para atualizar o aluno
      await this.service.deleteAluno(alunoId);
      res.status(200).send();
    } catch (error) {
      console.log("Error - AlunoController>deleteAluno", error);
      res.status(500).send({
        error: true,
        message: "Internal Error",
      });
    }
  }
}
