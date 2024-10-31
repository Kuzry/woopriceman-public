import { Container, Group } from "@mantine/core";
import generateUrl from "../../helpers/generateUrl";
import __ from "../../helpers/translate";

export default function MainMenu() {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, .6)",
        borderBottom: "1px solid rgba(0, 0, 0, .1)",
        borderTop: "1px solid rgba(0, 0, 0, .1)",
        marginLeft: -20,
        padding: "20px 0 20px 20px",
      }}
    >
      <Container>
        <Group>
          <a href={generateUrl("dashboard")}>{__("Dashboard")}</a>
          <a href={generateUrl("settings")}>{__("Settings")}</a>
          <a href={generateUrl("license")}>{__("License")}</a>
        </Group>
      </Container>
    </div>
  );
}
