import usePricesTable from "./usePricesTable";
import generateUrl from "../../../helpers/generateUrl";
import { flexRender } from "@tanstack/react-table";
import { Button, createStyles, Group, Modal, Space } from "@mantine/core";
import useGetAllPricesQuery from "../../../queries/price/useGetAllPricesQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import __ from "../../../helpers/translate";
import useRemovePriceMutation from "../../../queries/price/useRemovePriceMutation";

const PricesTable_useStyles = createStyles((theme, _params, getRef) => ({
  PricesTable: {
    // border: "1px solid #ccc",
    borderCollapse: "collapse",
    width: "100%",

    "td, th": {
      border: "1px solid #ccc",
      padding: "5px 10px",
    },

    th: {
      background: "rgba(0, 0, 0, .05)",
      textAlign: "left",
    },
  },
}));

export default function PricesTable() {
  const PricesTable_styles = PricesTable_useStyles();

  const pricesTable = usePricesTable();

  const getAllPricesQuery = useGetAllPricesQuery();

  const [isRemovePriceModalOpen, setIsRemovePriceModalOpen] =
    useState<boolean>(false);

  const removePriceMutation = useRemovePriceMutation();

  const [currentPriceToDelete, setCurrentPriceToDelete] = useState<
    number | null
  >(null);

  if (getAllPricesQuery.isLoading) {
    return "Loading...";
  }

  if (0 === getAllPricesQuery.data?.data.length) {
    return __(
      'There is no prices. Add your first pricing by clicking on "Add price" button.'
    );
  }

  return (
    <>
      <table className={PricesTable_styles.classes.PricesTable}>
        <thead>
          {pricesTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {pricesTable.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <a
                    href={generateUrl("edit-price", {
                      id: cell.row.original.id,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </a>
                  <Button
                    style={{
                      backgroundColor: "#ff0000",
                      float: "right",
                      padding: "3px 5px",
                    }}
                    onClick={() => {
                      setCurrentPriceToDelete(
                        cell.row.original.id as unknown as number
                      );
                      setIsRemovePriceModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        opened={isRemovePriceModalOpen}
        onClose={() => setIsRemovePriceModalOpen(false)}
      >
        {__("Are you sure you want to delete this pricing?")}
        <Space h="xl" />
        <Group>
          <Button
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              color: "#000",
            }}
            onClick={() => setIsRemovePriceModalOpen(false)}
          >
            {__("No")}
          </Button>
          <Button
            loading={removePriceMutation.isLoading}
            onClick={() => {
              removePriceMutation.mutate(
                {
                  data: {
                    id: currentPriceToDelete!,
                  },
                },
                {
                  onSuccess: (response) => {
                    location.reload();
                  },
                }
              );
            }}
          >
            {__("Yes")}
          </Button>
        </Group>
      </Modal>
    </>
  );
}
