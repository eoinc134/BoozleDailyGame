-- CreateTable
CREATE TABLE "DailyCocktail" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "cocktailData" TEXT NOT NULL,

    CONSTRAINT "DailyCocktail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clue" (
    "clueId" UUID NOT NULL,
    "sessionId" TEXT NOT NULL,
    "revealedAt" TIME(6) NOT NULL,
    "cocktailId" INTEGER,

    CONSTRAINT "Clue_pkey" PRIMARY KEY ("clueId")
);

-- CreateTable
CREATE TABLE "Guess" (
    "guessId" UUID NOT NULL,
    "sessionId" TEXT NOT NULL,
    "guess" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "cocktailId" INTEGER NOT NULL,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("guessId")
);

-- CreateIndex
CREATE UNIQUE INDEX "id" ON "DailyCocktail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "date" ON "DailyCocktail"("date");

-- CreateIndex
CREATE UNIQUE INDEX "clueId" ON "Clue"("clueId");

-- AddForeignKey
ALTER TABLE "Clue" ADD CONSTRAINT "cocktailId" FOREIGN KEY ("cocktailId") REFERENCES "DailyCocktail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "cocktailId" FOREIGN KEY ("cocktailId") REFERENCES "DailyCocktail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
