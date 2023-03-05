/*
  Warnings:

  - You are about to drop the column `author` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Template` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_author_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_category_fkey";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "author",
DROP COLUMN "category",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
