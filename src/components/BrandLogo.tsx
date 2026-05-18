import { Link } from "react-router-dom";
import { useAppSettings } from "@/hooks/useAppSettings";
import { getImageUrl } from "@/config/api";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  textClassName?: string;
}

const BrandLogo = ({ className, textClassName }: BrandLogoProps) => {
  const { settings } = useAppSettings();
  const title = settings.title || "ClarityMFG";
  const initial = title.trim().charAt(0).toUpperCase() || "C";
  const logoSrc = settings.logo_image ? getImageUrl(settings.logo_image) : null;

  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
        {logoSrc ? (
          <img src={logoSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-primary-foreground font-heading font-bold text-lg">
            {initial}
          </span>
        )}
      </div>
      <span className={cn("font-heading font-bold text-xl", textClassName)}>{title}</span>
    </Link>
  );
};

export default BrandLogo;
