import { Folder as MockFolder, File } from "~/lib/mock-data";
import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react";
import Link from "next/link";

export function FileRow({ file }: { file: File }) {
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">"File"</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
      </div>
    </li>
  );
}

export function FolderRow({
  folder,
  handleFolderClick,
}: {
  folder: MockFolder;
  handleFolderClick: () => void;
}) {
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => handleFolderClick()}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <Folder className="mr-3" size={20} />
            {folder.name}
          </button>
        </div>
        <div className="col-span-3 text-gray-400">"Folder"</div>
        <div className="col-span-3 text-gray-400">"--"</div>
      </div>
    </li>
  );
}
