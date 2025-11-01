import type { PageComponentData } from "@/components/page-component/types";

export interface LinkItem {
  title: string;
  link: string;
}

export interface GridBlockProps {
  links: LinkItem[];
  label: string;
}

export interface QuickViewModalProps {
  items: PageComponentData[];
  isVisible: boolean;
  linkElement?: HTMLAnchorElement | null;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
