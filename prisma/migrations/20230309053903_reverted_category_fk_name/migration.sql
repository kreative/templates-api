/*
  Warnings:

  - You are about to drop the column `category` on the `Template` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_category_fkey";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "category",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
