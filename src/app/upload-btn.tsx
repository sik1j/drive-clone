"use client";

import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function UploadBtn() {
  return (
    <Button className="bg-blue-600 text-white hover:bg-blue-700">
      <Upload className="mr-2" size={20} />
      Upload
    </Button>
  );
}
