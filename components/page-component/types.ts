export interface PageComponentData {
  id: string;
  title: string;
  description_en: string;
  description_fi: string;
  image?: string;
  link: string;
  alt: string;
  tags?: string[];
  new?: boolean;
}

export interface PageComponentProps {
  data: PageComponentData[];
  routeStyles?: React.CSSProperties;
  layout?: "grid" | "list" | "masonry";
  showTags?: boolean;
  showNew?: boolean;
}

export interface DataRowProps {
  item: PageComponentData;
  routeStyles?: React.CSSProperties;
  layout?: "grid" | "list" | "masonry";
  showTags?: boolean;
  showNew?: boolean;
  localImage?: string;
}
