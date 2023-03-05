/*
  Warnings:

  - You are about to drop the `Plugin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PluginToTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PluginToTemplate" DROP CONSTRAINT "_PluginToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_PluginToTemplate" DROP CONSTRAINT "_PluginToTemplate_B_fkey";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "plugins" TEXT[];

-- DropTable
DROP TABLE "Plugin";

-- DropTable
DROP TABLE "_PluginToTemplate";
