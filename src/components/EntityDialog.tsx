// Generic add/edit dialog driven by a field schema.
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Field =
  | {
      name: string;
      label: string;
      type: "text" | "number" | "email";
      placeholder?: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: readonly { label: string; value: string }[];
    };

export function EntityDialog<T extends Record<string, unknown>>({
  open,
  onOpenChange,
  title,
  fields,
  initial,
  onSubmit,
  submitLabel = "Save",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  fields: Field[];
  initial: Partial<T>;
  onSubmit: (values: T) => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initial as Record<string, unknown>);

  useEffect(() => {
    if (open) setValues(initial as Record<string, unknown>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submit = () => {
    const out: Record<string, unknown> = { ...values };
    fields.forEach((f) => {
      if (f.type === "number") out[f.name] = Number(out[f.name] ?? 0);
      else out[f.name] = (out[f.name] ?? "").toString();
    });
    onSubmit(out as T);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-1">
          {fields.map((f) => (
            <div key={f.name} className="space-y-1.5">
              <Label className="text-[12px]">{f.label}</Label>
              {f.type === "select" ? (
                <Select
                  value={String(values[f.name] ?? "")}
                  onValueChange={(v) => setValues({ ...values, [f.name]: v })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder={`Select ${f.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={f.type === "number" ? "number" : f.type}
                  value={String(values[f.name] ?? "")}
                  onChange={(e) =>
                    setValues({ ...values, [f.name]: e.target.value })
                  }
                  placeholder={(f as { placeholder?: string }).placeholder}
                  className="h-9"
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>{submitLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
