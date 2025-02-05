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
  const parentFoldersPromise = Promise.all(
    folderIds.map((folderId) => QUERY.getFolderById(folderId)),
  ).then((folders) => folders.map((folder) => folder[0]!));

  const [files, folders, parents] = await Promise.all([
    QUERY.getFilesByParent(currentFolderId),
    QUERY.getFoldersByParent(currentFolderId),
    parentFoldersPromise,
  ]);

  const currentPath = parents.map((folder) => folder.id).join("/");
  const breadcrumbs = parents
    .filter((folder) => folder.id !== 1)
    .map((folder, ind, self) => ({
      link: `/f/1/${self
        .slice(0, ind + 1)
        .map((f) => f.id)
        .join("/")}`,
      ...folder,
    }));

  return (
    <DriveContents
      currentPath={currentPath}
      breadcrumbs={breadcrumbs}
      files={files}
      folders={folders}
    />
  );
}
