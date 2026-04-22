import { useMemo, useState, type ReactNode } from "react";
import { Search, Download, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

interface FilterDef {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  accessor: (row: any) => string;
}

interface DataTableProps<T extends { id: string | number }> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: FilterDef[];
  pageSize?: number;
  selectable?: boolean;
  bulkActions?: { label: string; onClick: (ids: (string | number)[]) => void }[];
  exportable?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search…",
  searchKeys,
  filters = [],
  pageSize = 10,
  selectable = false,
  bulkActions = [],
  exportable = true,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const filtered = useMemo(() => {
    let rows = data;
    if (query.trim()) {
      const q = query.toLowerCase();
      const keys = searchKeys ?? (Object.keys(data[0] ?? {}) as (keyof T)[]);
      rows = rows.filter((r) =>
        keys.some((k) => String(r[k] ?? "").toLowerCase().includes(q))
      );
    }
    for (const f of filters) {
      const v = activeFilters[f.key];
      if (v && v !== "all") {
        rows = rows.filter((r) => f.accessor(r) === v);
      }
    }
    return rows;
  }, [data, query, activeFilters, filters, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const allSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelected) pageRows.forEach((r) => next.delete(r.id));
    else pageRows.forEach((r) => next.add(r.id));
    setSelected(next);
  };
  const toggleOne = (id: string | number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const exportCsv = () => {
    const header = columns.map((c) => c.header).join(",");
    const rows = filtered.map((r) =>
      columns
        .map((c) => {
          const v = (r as any)[c.key];
          return typeof v === "string" && v.includes(",") ? `"${v}"` : String(v ?? "");
        })
        .join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported CSV");
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative flex-1 min-w-[180px] max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={searchPlaceholder}
                className="pl-9 h-9"
              />
            </div>
          )}
          {filters.map((f) => (
            <Select
              key={f.key}
              value={activeFilters[f.key] ?? "all"}
              onValueChange={(v) => {
                setActiveFilters((p) => ({ ...p, [f.key]: v }));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 w-auto min-w-[140px] gap-1">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder={f.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {f.label.toLowerCase()}</SelectItem>
                {f.options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {selectable && selected.size > 0 && bulkActions.length > 0 && (
            <>
              <span className="text-xs text-muted-foreground">{selected.size} selected</span>
              {bulkActions.map((a) => (
                <Button key={a.label} size="sm" variant="outline" onClick={() => { a.onClick([...selected]); setSelected(new Set()); }}>
                  {a.label}
                </Button>
              ))}
            </>
          )}
          {exportable && (
            <Button size="sm" variant="outline" onClick={exportCsv} className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-left">
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />
                </th>
              )}
              {columns.map((c) => (
                <th key={c.key} className={cn("px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", c.className)}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr key={row.id} className="border-b border-border/40 transition-base hover:bg-secondary/50">
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox checked={selected.has(row.id)} onCheckedChange={() => toggleOne(row.id)} aria-label="Select row" />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} className={cn("px-4 py-3", c.className)}>
                      {c.cell ? c.cell(row) : String((row as any)[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-2 border-t border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{(safePage - 1) * pageSize + 1}</span>–
          <span className="font-medium text-foreground">{Math.min(safePage * pageSize, filtered.length)}</span> of{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>
        </p>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="px-3 text-sm">{safePage} / {totalPages}</span>
          <Button size="sm" variant="outline" disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
