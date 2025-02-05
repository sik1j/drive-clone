import { Folder, FileIcon } from "lucide-react";
import Link from "next/link";
import { fileTable, folderTable } from "~/server/db/schema";

export function FileRow(props: { url: string; name: string; size: string }) {
  return (
    <li className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={props.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {props.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">File</div>
        <div className="col-span-3 text-gray-400">{props.size}</div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folderTable.$inferSelect;
  name: string;
  url: string;
}) {
  return (
    <li className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={props.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <Folder className="mr-3" size={20} />
            {props.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400">--</div>
      </div>
    </li>
  );
}
