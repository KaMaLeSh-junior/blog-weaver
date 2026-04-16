import { Button } from "@/components/ui/button";
import { categories as staticCategories, Category } from "@/data/blogData";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: Category[];
}

const CategoryFilter = ({
  activeCategory,
  onCategoryChange,
  categories,
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
      {cats.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.slug)}
          className="rounded-full"
        >
          {category.name} ({category.count.toString().padStart(2, "0")})
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
