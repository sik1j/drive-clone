import DriveContents from "~/app/drive-contents";
import { QUERY } from "~/server/db/query";

export default async function FolderPage(props: {
  params: Promise<{ folderIds: string[] }>;
}) {
  const folderIds = (await props.params).folderIds.map((id) => parseInt(id));
  if (!folderIds.every((id) => !isNaN(id))) {
    return <div>Invalid route</div>;
  }

  const currentFolderId = folderIds[folderIds.length - 1]!;

  const [files, folders, parents] = await Promise.all([
    QUERY.getFilesByParent(currentFolderId),
    QUERY.getFoldersByParent(currentFolderId),
    Promise.all(folderIds.map((folderId) => QUERY.getFolderById(folderId))),
  ]);

  return (
    <DriveContents
      parents={parents.map((p) => p[0]!)}
      files={files}
      folders={folders}
    />
  );
}
