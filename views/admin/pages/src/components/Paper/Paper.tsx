import { Paper as MantinePaper } from "@mantine/core";
import { ReactNode } from "react";

function Paper({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d1d1d1",
        borderRadius: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
      }}
    >
      {children}
    </div>
  );
}

export default Paper;
