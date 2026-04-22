/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Ativo` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ativo" DROP CONSTRAINT "Ativo_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Ativo" DROP COLUMN "usuarioId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "usuarioId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "departamento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
