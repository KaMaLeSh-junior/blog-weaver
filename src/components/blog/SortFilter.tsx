import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/data/blogData";
import { ArrowDownAZ, TrendingUp, Eye, Clock } from "lucide-react";

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: "latest" as SortOption, label: "Latest", icon: Clock },
  { value: "oldest" as SortOption, label: "Oldest", icon: ArrowDownAZ },
  { value: "trending" as SortOption, label: "Trending", icon: TrendingUp },
  { value: "most-viewed" as SortOption, label: "Most Viewed", icon: Eye },
];

const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="flex items-center gap-2">
              <option.icon className="h-4 w-4" />
              {option.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
