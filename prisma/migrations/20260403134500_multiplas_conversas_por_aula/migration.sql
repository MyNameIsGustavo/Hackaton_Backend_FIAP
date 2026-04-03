DROP INDEX "ConversaAgente_aulaId_professorId_key";

CREATE INDEX "ConversaAgente_aulaId_professorId_idx" ON "ConversaAgente"("aulaId", "professorId");
