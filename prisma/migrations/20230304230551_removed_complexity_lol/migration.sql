/*
  Warnings:

  - You are about to drop the `CategoriesOnTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PluginsOnTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnTemplate" DROP CONSTRAINT "CategoriesOnTemplate_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnTemplate" DROP CONSTRAINT "CategoriesOnTemplate_templateId_fkey";

-- DropForeignKey
ALTER TABLE "PluginsOnTemplate" DROP CONSTRAINT "PluginsOnTemplate_pluginId_fkey";

-- DropForeignKey
ALTER TABLE "PluginsOnTemplate" DROP CONSTRAINT "PluginsOnTemplate_templateId_fkey";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoriesOnTemplate";

-- DropTable
DROP TABLE "PluginsOnTemplate";

-- CreateTable
CREATE TABLE "_PluginToTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PluginToTemplate_AB_unique" ON "_PluginToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_PluginToTemplate_B_index" ON "_PluginToTemplate"("B");

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PluginToTemplate" ADD CONSTRAINT "_PluginToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Plugin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PluginToTemplate" ADD CONSTRAINT "_PluginToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
