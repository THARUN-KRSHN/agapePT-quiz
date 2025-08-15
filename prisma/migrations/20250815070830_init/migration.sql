-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "submissionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    CONSTRAINT "UserResponse_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "submissionDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scores" TEXT NOT NULL,
    "dominantType" TEXT NOT NULL,
    "calculationLog" TEXT NOT NULL
);
