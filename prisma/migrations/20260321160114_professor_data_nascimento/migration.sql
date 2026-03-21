/*
  Warnings:

  - Changed the type of `idade` on the `Professor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "idade",
ADD COLUMN     "idade" TIMESTAMP(3) NOT NULL;
