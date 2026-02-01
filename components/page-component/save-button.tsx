"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import type { PageComponentData } from "@/components/page-component/types";
import { useSaved } from "@/components/saved/saved-context";
import styles from "@/styles/PageComponent.module.css";

type SaveButtonProps = {
  item: PageComponentData;
  route: string;
};

export default function SaveButton({ item, route }: SaveButtonProps) {
  const t = useTranslations("Common");
  const { isSaved, toggleSaved } = useSaved();
  const saved = isSaved(route, item.id);

  const label = saved ? t("removeSaved") : t("save");

  return (
    <div className={styles.saveContainer}>
      <button
        type="button"
        className={styles.saveButton}
        aria-label={label}
        aria-pressed={saved}
        data-saved={saved}
        onClick={() => toggleSaved(route, item)}
        title={label}
        data-testid="save-button"
      >
        <Image
          src={saved ? "/icons/star_filled.svg" : "/icons/star.svg"}
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
