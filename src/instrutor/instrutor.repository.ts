import { Instrutor } from "../shared/model/instrutor";

export class InstrutorRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(instrutor: Instrutor): Promise<Instrutor> {
    const queryInsertInstrutor = `
      insert into instrutores (nome, data_nascimento, cpf,
           matricula, sexo, email, data_admissao,
           data_desligamento)
      values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    `;

    const result = await this.database.one(queryInsertInstrutor, [
      instrutor.nome,
      instrutor.dataNascimento,
      instrutor.cpf,
      instrutor.matricula,
      instrutor.sexo,
      instrutor.email,
      instrutor.data_admissao,
      instrutor.data_desligamento,

    ]);

    return {
      id: result.id,
      ...instrutor,
    };
  }

  async getAll(): Promise<Instrutor[]> {
    const result = await this.database.query(
      `select nome, data_nascimento, cpf,
           matricula, sexo, email, data_admissao,
           data_desligamento
       from instrutores`,
      []
    );
    if (result.length === 0) {
      return [];
    }
    return result.map((aluno: any) => ({
      id: aluno.id,
      nome: aluno.nome,
      dataNascimento: aluno.data_nascimento,
      cpf: aluno.cpf,
      telefone: aluno.telefone,
      sexo: aluno.sexo,
      email: aluno.email,
      escolaridade: aluno.escolaridade,
      renda: aluno.renda,
      pcd: aluno.pcd,
    }));
  }

  async getById(id: number): Promise<Instrutor | undefined> {
    const [result] = await this.database.query(
      `select nome, data_nascimento, cpf,
           matricula, sexo, email, data_admissao,
           data_desligamento
       from instrutores
       where id = $1`,
      [id]
    );
    if (!result) return;
    return {
      id,
      nome: result.nome,
      dataNascimento: result.data_nascimento,
      cpf: result.cpf,
      matricula: result.matricula,
      sexo: result.sexo,
      email: result.email,
      data_admissao: result.data_admissao,
      data_desligamento: result.data_desligamento,
    };
  }

  async updateInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      // Monta a query de update
      const statementUpdateInstrutor = `
        update instrutores set
          nome = $1,
          data_nascimento = $2,
          cpf = $3,
          matricula = $4,
          sexo = $5,
          email = $6,
          data_admissao = $7,
          data_desligamento = $8,
        where id = $9
      `;
      await this.database.query(statementUpdateInstrutor, [
        instrutor.nome,
        instrutor.dataNascimento,
        instrutor.cpf,
        instrutor.matricula,
        instrutor.sexo,
        instrutor.email,
        instrutor.data_admissao,
        instrutor.data_desligamento,
        id,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async updatePartOfInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      // Obter os dados do aluno do banco
      const saved = await this.getById(id);
      if (!saved) {
        throw new Error("Instrutor não encontrado");
      }

      let instrutorParams: Instrutor = {} as Instrutor;

      // Nome
      instrutorParams.nome = saved.nome !== instrutor.nome ? instrutor.nome : saved.nome;
      // DataNascimento
      instrutorParams.dataNascimento =
        saved.dataNascimento !== instrutor.dataNascimento
          ? instrutor.dataNascimento
          : saved.dataNascimento;
      // CPF
      instrutorParams.cpf = saved.cpf !== instrutor.cpf ? instrutor.cpf : saved.cpf;
      // Matricula
      instrutor.matricula =
        saved.matricula !== instrutor.matricula ? instrutor.matricula : saved.matricula;
      // Sexo
      instrutorParams.sexo = saved.sexo !== instrutor.sexo ? instrutor.sexo : saved.sexo;
      // Email
      instrutorParams.email =
        saved.email !== instrutor.email ? instrutor.email : saved.email;
      // Data
      instrutorParams.data_admissao =
        saved.data_admissao !== instrutor.data_admissao
          ? instrutor.data_admissao
          : saved.data_admissao;
      // Data de desligamento
      instrutorParams.data_desligamento =
        saved.data_desligamento !== instrutor.data_desligamento ? instrutor.data_desligamento : saved.data_desligamento;

      this.updateInstrutor(id, instrutorParams);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    const instrutor = await this.getById(id);

    if (!instrutor) {
      throw new Error("Instrutor não encontrado");
    }
    // Monta a query de exclusão
    const statementDeleteInstrutores = `delete from instrutor where id = $1`;
    await this.database.query(statementDeleteInstrutores, [id]);
  }
}
