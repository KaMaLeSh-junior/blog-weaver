import { Button } from "@/components/ui/button";
import { categories } from "@/data/blogData";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="rounded-full"
      >
        All ({categories.reduce((acc, cat) => acc + cat.count, 0)})
      </Button>
      {categories.map((category) => (
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
