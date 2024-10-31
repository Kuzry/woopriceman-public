import { Flex } from "@mantine/core";
import { ReactNode } from "react";

export default function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ padding: "40px 0 20px" }}>
      <Flex justify="space-between" align="center">
        <h2>{title}</h2>
        <div>{children}</div>
      </Flex>
    </div>
  );
}
