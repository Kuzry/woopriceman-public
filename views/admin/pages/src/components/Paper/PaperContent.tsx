import PaperContent_useStyles from "./PaperContent_useStyles";
import { ReactNode } from "react";

export default function PaperContent({ children }: { children: ReactNode }) {
  const PaperContent_styles = PaperContent_useStyles();

  return (
    <div className={PaperContent_styles.classes.PaperContent}>{children}</div>
  );
}
