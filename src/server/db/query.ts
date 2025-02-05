import "server-only";

import { db } from "./";
import { eq } from "drizzle-orm";
import { fileTable, folderTable } from "./schema";

export const QUERY = {
  async getFilesByParent(parentFolderId: number) {
    return db
      .select()
      .from(fileTable)
      .where(eq(fileTable.parent, parentFolderId));
  },

  async getFoldersByParent(parentFolderId: number) {
    return db
      .select()
      .from(folderTable)
      .where(eq(folderTable.parent, parentFolderId));
  },

  async getFolderById(folderId: number) {
    return db
      .select()
      .from(folderTable)
      .where(eq(folderTable.id, folderId))
      .limit(1);
  },
};
