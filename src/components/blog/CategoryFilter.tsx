import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { categories as staticCategories, Category } from "@/data/blogData";
import { useSubcategories } from "@/hooks/useApi";
import { Loader2, ChevronDown } from "lucide-react";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: Category[];
  selectedSubcategories?: string[];
  onSubcategoryToggle?: (slug: string) => void;
  onClearSubcategories?: () => void;
}

const SubcategoryDropdown = ({
  categoryId,
  selected,
  onToggle,
  onClear,
}: {
  categoryId: number;
  selected: string[];
  onToggle: (slug: string) => void;
  onClear: () => void;
}) => {
  const { data, isLoading } = useSubcategories(categoryId);
  const subs = (data || []).filter((s) => s.status === 1);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  if (subs.length === 0) {
    return (
      <p className="p-2 text-sm text-muted-foreground">No subcategories</p>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-2 pb-2 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">
          Filter by subcategory
        </span>
        {selected.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-primary hover:underline"
          >
            Clear
          </button>
        )}
      </div>
      <div className="max-h-64 overflow-y-auto py-1">
        {subs.map((sub) => {
          const slug = sub.name.toLowerCase().replace(/\s+/g, "-");
          const checked = selected.includes(slug);
          return (
            <label
              key={sub.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer text-sm"
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => onToggle(slug)}
              />
              <span className="flex-1">{sub.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const CategoryFilter = ({
  activeCategory,
  onCategoryChange,
  categories,
  selectedSubcategories = [],
  onSubcategoryToggle,
  onClearSubcategories,
}: CategoryFilterProps) => {
  const cats = categories || staticCategories;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="rounded-full"
      >
        All ({cats.reduce((acc, cat) => acc + cat.count, 0)})
      </Button>
      {cats.map((category) => {
        const isActive = activeCategory === category.slug;
        const numericId = Number(category.id);
        const supportsSubcats =
          !!onSubcategoryToggle && Number.isFinite(numericId) && numericId > 0;

        const button = (
          <Button
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.slug)}
            className="rounded-full gap-1"
          >
            {category.name} ({category.count.toString().padStart(2, "0")})
            {supportsSubcats && <ChevronDown className="h-3 w-3 opacity-70" />}
          </Button>
        );

        if (!supportsSubcats) {
          return <div key={category.id}>{button}</div>;
        }

        return (
          <HoverCard key={category.id} openDelay={120} closeDelay={150}>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            <HoverCardContent className="w-64 p-2" align="start">
              <SubcategoryDropdown
                categoryId={numericId}
                selected={isActive ? selectedSubcategories : []}
                onToggle={(slug) => {
                  if (!isActive) onCategoryChange(category.slug);
                  onSubcategoryToggle?.(slug);
                }}
                onClear={() => onClearSubcategories?.()}
              />
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
