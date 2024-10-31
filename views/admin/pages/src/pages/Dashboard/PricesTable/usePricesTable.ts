import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useGetAllPricesQuery from "../../../queries/price/useGetAllPricesQuery";
import { TPrice } from "../../../types";
import { useEffect, useMemo, useState } from "react";
import __ from "../../../helpers/translate";

const columnHelper = createColumnHelper<TPrice>();

export default function usePricesTable() {
  const getAllPricesQuery = useGetAllPricesQuery();

  const columns = useMemo(() => {
    return [
      // columnHelper.accessor("id", {}),
      columnHelper.accessor("name", {
        cell: (context) => context.renderValue(),
        header: __("Name"),
      }),
    ];
  }, [getAllPricesQuery.data]);

  const [tableData, setTableData] = useState<TPrice[]>([]);

  useEffect(() => {
    setTableData(getAllPricesQuery.data?.data ?? []);
  }, [getAllPricesQuery.data]);

  return useReactTable({
    columns: columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });
}
