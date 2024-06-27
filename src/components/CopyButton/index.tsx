import copy from "copy-to-clipboard";
import { MouseEvent, useState } from "react";

import { sleep } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";

export type CopyButtonProps = {
  content?: string;
} & Omit<ButtonProps, "children" | "onClick">;

const CopyButton = ({ content, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!content) return;

    copy(content);
    setCopied(true);
    await sleep(500);
    setCopied(false);
  };

  return (
    <Button
      onClick={handleCopy}
      size= "icon"
      {...props}
    >
      {copied ? (
        <CheckCheck className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
};

export default CopyButton;
