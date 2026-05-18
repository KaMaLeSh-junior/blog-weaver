import { useAppSettings } from "@/hooks/useAppSettings";

interface AdSpaceProps {
  variant?: "horizontal" | "vertical" | "square";
  className?: string;
  /**
   * Force-show the ad regardless of the global settings flag.
   * When omitted, visibility is driven by the admin's `advertisment` setting.
   */
  showAdv?: boolean;
}

const AdSpace = ({ variant = "horizontal", className = "", showAdv }: AdSpaceProps) => {
  const { showAds } = useAppSettings();
  const visible = showAdv ?? showAds;

  const dimensions = {
    horizontal: "h-24 md:h-28",
    vertical: "h-96",
    square: "aspect-square",
  };

  if (!visible) return null;

  return (
    <div
      className={`bg-secondary/50 border border-border rounded-xl flex items-center justify-center ${dimensions[variant]} ${className}`}
    >
      <div className="text-center text-muted-foreground">
        <p className="text-sm font-medium">Advertisement</p>
        <p className="text-xs">Your ad could be here</p>
      </div>
    </div>
  );
};

export default AdSpace;
