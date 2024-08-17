/*
  Warnings:

  - You are about to drop the column `secao` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `subtipo` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "secao",
ADD COLUMN     "subtipo" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;
