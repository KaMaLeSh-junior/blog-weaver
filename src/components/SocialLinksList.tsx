import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  AtSign,
} from "lucide-react";
import { getEnabledSocialLinks, useAppSettings } from "@/hooks/useAppSettings";
import type { SocialPlatform } from "@/types/api";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  threads: AtSign,
};

interface Props {
  className?: string;
  itemClassName?: string;
  iconSize?: number;
}

const SocialLinksList = ({
  className,
  itemClassName,
  iconSize = 16,
}: Props) => {
  const { settings } = useAppSettings();
  const links = getEnabledSocialLinks(settings.social_links);
  if (links.length === 0) return null;
  return (
    <div className={cn("flex gap-3", className)}>
      {links.map(({ platform, url }) => {
        const Icon = ICONS[platform];
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className={cn(
              "w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors",
              itemClassName,
            )}
          >
            <Icon style={{ width: iconSize, height: iconSize }} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinksList;
