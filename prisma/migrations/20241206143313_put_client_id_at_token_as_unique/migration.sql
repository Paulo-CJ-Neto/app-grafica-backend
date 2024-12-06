/*
  Warnings:

  - A unique constraint covering the columns `[clienteId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Token_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "Token_clienteId_key" ON "Token"("clienteId");
