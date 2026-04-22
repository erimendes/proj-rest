/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AtivoTipo" AS ENUM ('LAPTOP', 'DESKTOP', 'SERVIDOR_FISICO', 'SERVIDOR_VIRTUAL', 'SWITCH', 'ROTEADOR', 'STORAGE', 'MONITOR');

-- CreateEnum
CREATE TYPE "AtivoStatus" AS ENUM ('DISPONIVEL', 'EM_USO', 'MANUTENCAO', 'DESCARTADO');

-- CreateEnum
CREATE TYPE "SistemaCategoria" AS ENUM ('ADMINISTRATIVO', 'OPERACIONAL');

-- CreateEnum
CREATE TYPE "Criticidade" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'CRITICA');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Session_userId_key";

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "userId",
ADD COLUMN     "usuarioId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Session_id_seq";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "departamento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ativo" (
    "id" SERIAL NOT NULL,
    "tagPatrimonial" TEXT NOT NULL,
    "tipo" "AtivoTipo" NOT NULL DEFAULT 'LAPTOP',
    "fabricante" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "numSerie" TEXT NOT NULL,
    "hostname" TEXT,
    "cpu" TEXT,
    "ram" TEXT,
    "discoFisico" TEXT,
    "status" "AtivoStatus" NOT NULL DEFAULT 'DISPONIVEL',
    "emUso" BOOLEAN NOT NULL DEFAULT true,
    "dataCompra" TIMESTAMP(3),
    "valor" DECIMAL(10,2),
    "isVirtualizado" BOOLEAN NOT NULL DEFAULT false,
    "hyperVName" TEXT,
    "hostFisicoId" INTEGER,
    "usuarioId" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aplicacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "descricao" TEXT,
    "categoria" "SistemaCategoria" NOT NULL DEFAULT 'OPERACIONAL',
    "criticidade" "Criticidade" NOT NULL DEFAULT 'MEDIA',
    "businessOwner" TEXT,
    "responsavelTecnico" TEXT,
    "contatoFuncional" TEXT,
    "fornecedor" TEXT,
    "janelaOperacao" TEXT,
    "backupInfo" TEXT,
    "procedimentoRecup" TEXT,
    "pontoUnicoFalha" TEXT,
    "tecnologiaPrincipal" TEXT,
    "databaseInfo" TEXT,
    "integracoes" TEXT,

    CONSTRAINT "Aplicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigRede" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT,
    "macAddress" TEXT NOT NULL,
    "vlan" INTEGER,
    "portasUTP" INTEGER,
    "portasFibra" INTEGER,
    "storageConect" TEXT,
    "discoStorage" TEXT,
    "ativoId" INTEGER NOT NULL,

    CONSTRAINT "ConfigRede_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "versao" TEXT,
    "fabricante" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licenca" (
    "id" SERIAL NOT NULL,
    "chaveAtivacao" TEXT NOT NULL,
    "dataExpiracao" TIMESTAMP(3),
    "softwareId" INTEGER NOT NULL,

    CONSTRAINT "Licenca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicencaAtivo" (
    "id" SERIAL NOT NULL,
    "ativoId" INTEGER NOT NULL,
    "licencaId" INTEGER NOT NULL,
    "dataInstalacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LicencaAtivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppServidores" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AppServidores_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ativo_tagPatrimonial_key" ON "Ativo"("tagPatrimonial");

-- CreateIndex
CREATE UNIQUE INDEX "Ativo_numSerie_key" ON "Ativo"("numSerie");

-- CreateIndex
CREATE UNIQUE INDEX "Ativo_hostname_key" ON "Ativo"("hostname");

-- CreateIndex
CREATE UNIQUE INDEX "Aplicacao_sigla_key" ON "Aplicacao"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigRede_macAddress_key" ON "ConfigRede"("macAddress");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigRede_ativoId_key" ON "ConfigRede"("ativoId");

-- CreateIndex
CREATE UNIQUE INDEX "Licenca_chaveAtivacao_key" ON "Licenca"("chaveAtivacao");

-- CreateIndex
CREATE UNIQUE INDEX "LicencaAtivo_ativoId_licencaId_key" ON "LicencaAtivo"("ativoId", "licencaId");

-- CreateIndex
CREATE INDEX "_AppServidores_B_index" ON "_AppServidores"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_hostFisicoId_fkey" FOREIGN KEY ("hostFisicoId") REFERENCES "Ativo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfigRede" ADD CONSTRAINT "ConfigRede_ativoId_fkey" FOREIGN KEY ("ativoId") REFERENCES "Ativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licenca" ADD CONSTRAINT "Licenca_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicencaAtivo" ADD CONSTRAINT "LicencaAtivo_ativoId_fkey" FOREIGN KEY ("ativoId") REFERENCES "Ativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicencaAtivo" ADD CONSTRAINT "LicencaAtivo_licencaId_fkey" FOREIGN KEY ("licencaId") REFERENCES "Licenca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppServidores" ADD CONSTRAINT "_AppServidores_A_fkey" FOREIGN KEY ("A") REFERENCES "Aplicacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppServidores" ADD CONSTRAINT "_AppServidores_B_fkey" FOREIGN KEY ("B") REFERENCES "Ativo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
