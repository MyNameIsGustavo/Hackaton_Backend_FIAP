-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "formacao" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabilidadeBNCC" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "anoEscolar" INTEGER NOT NULL,
    "objetoConhecimentoId" INTEGER NOT NULL,
    "planoAulaId" INTEGER,
    "avaliacaoId" INTEGER,

    CONSTRAINT "HabilidadeBNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoAula" (
    "id" SERIAL NOT NULL,
    "aulaId" INTEGER NOT NULL,
    "objetivo" TEXT NOT NULL,
    "metodologia" TEXT NOT NULL,
    "recursosDidaticos" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanoAula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataAvaliacao" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetenciaBNCC" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "habilidadeBNCCId" INTEGER,

    CONSTRAINT "CompetenciaBNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnidadeTematica" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "UnidadeTematica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjetoConhecimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidadeTematicaId" INTEGER NOT NULL,

    CONSTRAINT "ObjetoConhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "areaConhecimento" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "periodoId" INTEGER NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "anoEscolar" INTEGER NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "periodoId" INTEGER NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periodo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "horarioInicio" TEXT NOT NULL,
    "horarioFim" TEXT NOT NULL,

    CONSTRAINT "Periodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "objetivosAprendizagem" TEXT NOT NULL,
    "dataAula" TIMESTAMP(3) NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "materiaId" INTEGER,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AulaToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AulaToProfessor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlanoAula_aulaId_key" ON "PlanoAula"("aulaId");

-- CreateIndex
CREATE INDEX "_AulaToProfessor_B_index" ON "_AulaToProfessor"("B");

-- AddForeignKey
ALTER TABLE "HabilidadeBNCC" ADD CONSTRAINT "HabilidadeBNCC_objetoConhecimentoId_fkey" FOREIGN KEY ("objetoConhecimentoId") REFERENCES "ObjetoConhecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabilidadeBNCC" ADD CONSTRAINT "HabilidadeBNCC_planoAulaId_fkey" FOREIGN KEY ("planoAulaId") REFERENCES "PlanoAula"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabilidadeBNCC" ADD CONSTRAINT "HabilidadeBNCC_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoAula" ADD CONSTRAINT "PlanoAula_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciaBNCC" ADD CONSTRAINT "CompetenciaBNCC_habilidadeBNCCId_fkey" FOREIGN KEY ("habilidadeBNCCId") REFERENCES "HabilidadeBNCC"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnidadeTematica" ADD CONSTRAINT "UnidadeTematica_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjetoConhecimento" ADD CONSTRAINT "ObjetoConhecimento_unidadeTematicaId_fkey" FOREIGN KEY ("unidadeTematicaId") REFERENCES "UnidadeTematica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AulaToProfessor" ADD CONSTRAINT "_AulaToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Aula"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AulaToProfessor" ADD CONSTRAINT "_AulaToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
