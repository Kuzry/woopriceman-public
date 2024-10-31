import { Button, Container, Navbar, ScrollArea, Space } from "@mantine/core";
import Paper from "../../components/Paper/Paper";
import PaperContent from "../../components/Paper/PaperContent";
import __ from "../../helpers/translate";
import { useState } from "react";
import AddPriceModal from "./AddPriceModal/AddPriceModal";
import PricesTable from "./PricesTable/PricesTable";
import Header from "../../components/Header/Header";
import MainMenu from "../../components/MainMenu/MainMenu";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function Dashboard() {
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Header />
      <MainMenu />
      <Container>
        <PageHeader title={__("Discounts")}>
          <Button onClick={() => setIsAddPriceModalOpen(!isAddPriceModalOpen)}>
            {__("Add price")}
          </Button>
        </PageHeader>
        <Paper>
          <PaperContent>
            <PricesTable />
          </PaperContent>
        </Paper>
      </Container>
      <AddPriceModal
        isOpen={isAddPriceModalOpen}
        onClose={() => setIsAddPriceModalOpen(false)}
      />
    </>
  );
}
