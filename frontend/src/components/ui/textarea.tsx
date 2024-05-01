import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"text-[15pt] resize-none w-[calc(100%-32px)] h-[500px] font-mono border-none m-2.5 p-2 absolute top-0 bg-lightterminalbackground dark:bg-darkterminalbackground rounded-md md:mt-4 leading-[20pt]",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";
// text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:mt-4 rounded-md border-none p-2 resize-none m-1 w-[90%] h-full font-mono
export { Textarea };
