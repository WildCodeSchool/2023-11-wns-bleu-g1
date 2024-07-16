import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {FormLabel} from "@/components/ui/form";

const LanguagesSelect = () => {
    return (
        <div className="flex justify-end">
          <FormLabel className="flex items-center pr-2">Language</FormLabel>
          <Select>
            <SelectTrigger className="w-[240px]">
            </SelectTrigger>
          <SelectContent>
            <SelectValue placeholder="..." />
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
          </Select>
        </div>
    )
}

export default LanguagesSelect;
