/*
  Warnings:

  - You are about to drop the column `administradorId` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clienteId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_administradorId_fkey";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "tipoDeUsuario" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "administradorId",
ADD COLUMN     "clienteId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Administrador";

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
