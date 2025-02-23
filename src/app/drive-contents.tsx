import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type {
  fileTable as filesSchema,
  folderTable as foldersSchema,
} from "~/server/db/schema";
import { FileRow, FolderRow } from "./file-row";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function DriveContents(props: {
  currentPath: string;
  breadcrumbs: {
    link: string;
    id: number;
    name: string;
  }[];
  files: (typeof filesSchema.$inferSelect)[];
  folders: (typeof foldersSchema.$inferSelect)[];
}) {
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
            {props.breadcrumbs.map((crumb) => (
              <div key={crumb.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={crumb.link}
                  className="text-gray-300 hover:text-white"
                >
                  {crumb.name}
                </Link>
              </div>
            ))}
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
                url={`/f/${props.currentPath}/${encodeURIComponent(folder.id)}`}
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
