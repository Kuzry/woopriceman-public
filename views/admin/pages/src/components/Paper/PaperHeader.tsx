import { ReactNode } from "react";
import PaperHeader_useStyles from "./PaperHeader_useStyles";

interface Props {
  children: ReactNode;
}

function Paper({ children }: Props) {
  const PaperHeader_styles = PaperHeader_useStyles();

  return <div className={PaperHeader_styles.classes.PaperHeader}>{children}</div>;
}

export default Paper;
