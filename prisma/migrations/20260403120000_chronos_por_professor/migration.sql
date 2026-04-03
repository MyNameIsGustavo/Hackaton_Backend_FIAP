ALTER TABLE "ConversaAgente"
ADD COLUMN "professorId" INTEGER;

UPDATE "ConversaAgente" c
SET "professorId" = ap."B"
FROM "_AulaToProfessor" ap
WHERE ap."A" = c."aulaId"
  AND ap."B" = (
    SELECT MIN(ap2."B")
    FROM "_AulaToProfessor" ap2
    WHERE ap2."A" = c."aulaId"
  );

ALTER TABLE "ConversaAgente"
ALTER COLUMN "professorId" SET NOT NULL;

ALTER TABLE "ConversaAgente"
ADD CONSTRAINT "ConversaAgente_professorId_fkey"
FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

DROP INDEX "ConversaAgente_aulaId_key";

CREATE UNIQUE INDEX "ConversaAgente_aulaId_professorId_key" ON "ConversaAgente"("aulaId", "professorId");

ALTER TABLE "PlanoAula"
ADD COLUMN "professorId" INTEGER,
ADD COLUMN "habilidadeBNCCId" INTEGER;

UPDATE "PlanoAula" p
SET "professorId" = ap."B"
FROM "_AulaToProfessor" ap
WHERE ap."A" = p."aulaId"
  AND ap."B" = (
    SELECT MIN(ap2."B")
    FROM "_AulaToProfessor" ap2
    WHERE ap2."A" = p."aulaId"
  );

UPDATE "PlanoAula" p
SET "habilidadeBNCCId" = h."id"
FROM "HabilidadeBNCC" h
WHERE h."planoAulaId" = p."id";

ALTER TABLE "PlanoAula"
ALTER COLUMN "professorId" SET NOT NULL,
ALTER COLUMN "habilidadeBNCCId" SET NOT NULL;

ALTER TABLE "PlanoAula"
ADD CONSTRAINT "PlanoAula_professorId_fkey"
FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "PlanoAula"
ADD CONSTRAINT "PlanoAula_habilidadeBNCCId_fkey"
FOREIGN KEY ("habilidadeBNCCId") REFERENCES "HabilidadeBNCC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

DROP INDEX "PlanoAula_aulaId_key";

CREATE UNIQUE INDEX "PlanoAula_aulaId_professorId_key" ON "PlanoAula"("aulaId", "professorId");

ALTER TABLE "HabilidadeBNCC"
DROP CONSTRAINT "HabilidadeBNCC_planoAulaId_fkey";

ALTER TABLE "HabilidadeBNCC"
DROP COLUMN "planoAulaId";
