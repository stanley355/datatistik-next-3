"use client";

import { Product } from "@/lib/types";
import { formatToAsiaJakartaTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const COLUMNS: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      return (
        <div>
          {formatToAsiaJakartaTime(row.original.created_at)} (Asia/Jakarta)
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Last Update",
    cell: ({ row }) => {
      return (
        <div>
          {formatToAsiaJakartaTime(row.original.updated_at)} (Asia/Jakarta)
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div>{row.original.title.id}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <div>RMB {row.original.price / 100}</div>;
    },
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => {
      const options = row.original.options;
      if (options.length > 0) {
        return (
          <div className="flex flex-col gap-1">
            {options.map((opt, index) => (
              <div key={index + opt.en}>
                {opt.en}: {opt.values.length} options
              </div>
            ))}
          </div>
        );
      }
      return "-";
    },
  },
];
