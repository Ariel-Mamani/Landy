import { TFunction } from "react-i18next";
import { ReactNode } from "react";

export interface ContentBlockProps {
  title: string;
  content: string;
  button?: (
    | {
        title: string;
        color?: undefined;
      }
    | {
        title: string;
        color: string;
      }
  )[];
  t: TFunction;
  id: string;
  direction: "left" | "right";
  chartComponent?: ReactNode;
  // Eliminamos icon completamente
}