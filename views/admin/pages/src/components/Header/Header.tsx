import { ReactNode } from "react";
import { Container } from "@mantine/core";
import generateUrl from "../../helpers/generateUrl";

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        marginLeft: -20,
        padding: "20px 0 20px 20px",
      }}
    >
      <Container>
        <a
          href={generateUrl("dashboard")}
          style={{
            textDecoration: "none",
          }}
        >
          WooPriceman
        </a>
        {children}
      </Container>
    </div>
  );
}
