interface AdSpaceProps {
  variant?: "horizontal" | "vertical" | "square";
  className?: string;
  showAdv?: boolean;
}

const AdSpace = ({
  variant = "horizontal",
  className = "",
  showAdv = false,
}: AdSpaceProps) => {
  const dimensions = {
    horizontal: "h-24 md:h-28",
    vertical: "h-96",
    square: "aspect-square",
  };

  return (
    <div
      style={{ display: showAdv ? "" : "none" }}
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
