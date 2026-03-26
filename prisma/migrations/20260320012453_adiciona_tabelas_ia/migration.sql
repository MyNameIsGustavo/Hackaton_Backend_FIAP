-- CreateTable
CREATE TABLE "ConversaAgente" (
    "id" SERIAL NOT NULL,
    "aulaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversaAgente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MensagemAgente" (
    "id" SERIAL NOT NULL,
    "conversaId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MensagemAgente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtividadeComplementar" (
    "id" SERIAL NOT NULL,
    "planoAulaId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AtividadeComplementar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConversaAgente_aulaId_key" ON "ConversaAgente"("aulaId");

-- AddForeignKey
ALTER TABLE "ConversaAgente" ADD CONSTRAINT "ConversaAgente_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Aula"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemAgente" ADD CONSTRAINT "MensagemAgente_conversaId_fkey" FOREIGN KEY ("conversaId") REFERENCES "ConversaAgente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadeComplementar" ADD CONSTRAINT "AtividadeComplementar_planoAulaId_fkey" FOREIGN KEY ("planoAulaId") REFERENCES "PlanoAula"("id") ON DELETE CASCADE ON UPDATE CASCADE;
