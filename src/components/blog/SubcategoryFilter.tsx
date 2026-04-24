import { Button } from "@/components/ui/button";
import { useSubcategories } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";

interface SubcategoryFilterProps {
  categoryId: number | null;
  activeSubcategory: string;
  onSubcategoryChange: (slug: string) => void;
}

const SubcategoryFilter = ({
  categoryId,
  activeSubcategory,
  onSubcategoryChange,
}: SubcategoryFilterProps) => {
  const { data, isLoading } = useSubcategories(categoryId ?? 0);

  if (!categoryId) return null;

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    );
  }

  const subs = (data || []).filter((s) => s.status === 1);
  if (subs.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={activeSubcategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onSubcategoryChange("all")}
        className="rounded-full"
      >
        All
      </Button>
      {subs.map((sub) => {
        const slug = sub.name.toLowerCase().replace(/\s+/g, "-");
        return (
          <Button
            key={sub.id}
            variant={activeSubcategory === slug ? "default" : "outline"}
            size="sm"
            onClick={() => onSubcategoryChange(slug)}
            className="rounded-full"
          >
            {sub.name}
          </Button>
        );
      })}
    </div>
  );
};

export default SubcategoryFilter;
