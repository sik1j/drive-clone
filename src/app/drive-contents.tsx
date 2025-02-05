import { ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import type {
  fileTable as filesSchema,
  folderTable as foldersSchema,
} from "~/server/db/schema";
import { FileRow, FolderRow } from "./file-row";
import UploadBtn from "./upload-btn";

export default function DriveContents(props: {
  parents: (typeof foldersSchema.$inferSelect)[];
  files: (typeof filesSchema.$inferSelect)[];
  folders: (typeof foldersSchema.$inferSelect)[];
}) {
  // don't show the root folder on the breadcrumbs
  const breadcrumbs = props.parents.filter((folder) => folder.id !== 1);
  const currentPath = props.parents.map((folder) => folder.id).join("/");
  console.log("path passed in:", currentPath);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/f/${encodeURIComponent("1")}`}
              className="mr-2 text-gray-300 hover:text-white"
            >
              My Drive
            </Link>
            {breadcrumbs.map((folder, ind) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/1/${breadcrumbs
                    .slice(0, ind + 1)
                    .map((f) => f.id)
                    .join("/")}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <UploadBtn />
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow
                url={`/f/${currentPath}/${encodeURIComponent(folder.id)}`}
                folder={folder}
                name={folder.name}
                key={folder.id}
              />
            ))}
            {props.files.map((file) => (
              <FileRow
                name={file.name}
                size={file.size}
                url={file.url}
                key={file.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
