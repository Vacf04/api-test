/*
  Warnings:

  - Added the required column `updatedAt` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `fotos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_alunos" ("altura", "email", "id", "idade", "nome", "peso", "sobrenome") SELECT "altura", "email", "id", "idade", "nome", "peso", "sobrenome" FROM "alunos";
DROP TABLE "alunos";
ALTER TABLE "new_alunos" RENAME TO "alunos";
CREATE UNIQUE INDEX "alunos_email_key" ON "alunos"("email");
CREATE TABLE "new_fotos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalname" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "alunoId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "fotos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_fotos" ("alunoId", "filename", "id", "originalname") SELECT "alunoId", "filename", "id", "originalname" FROM "fotos";
DROP TABLE "fotos";
ALTER TABLE "new_fotos" RENAME TO "fotos";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("email", "id", "nome", "password_hash") SELECT "email", "id", "nome", "password_hash" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
