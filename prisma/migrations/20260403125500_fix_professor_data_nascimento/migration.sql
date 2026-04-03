ALTER TABLE "Professor"
ADD COLUMN "dataNascimento" TIMESTAMP(3);

UPDATE "Professor"
SET "dataNascimento" = "idade";

ALTER TABLE "Professor"
ALTER COLUMN "dataNascimento" SET NOT NULL;

ALTER TABLE "Professor"
DROP COLUMN "idade";
