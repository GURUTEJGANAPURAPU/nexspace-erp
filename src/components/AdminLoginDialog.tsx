import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdmin, ADMIN_PASSWORD } from "@/lib/admin-auth";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export function AdminLoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { login } = useAdmin();
  const [pwd, setPwd] = useState("");

  const submit = () => {
    if (login(pwd)) {
      toast.success("Admin mode unlocked", {
        description: "You can now add, edit and delete records.",
      });
      onOpenChange(false);
      setPwd("");
    } else {
      toast.error("Incorrect password", {
        description: `Default password is "${ADMIN_PASSWORD}"`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center mb-2 shadow-glow">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <DialogTitle>Admin sign-in</DialogTitle>
          <DialogDescription>
            Enter the admin password to add, edit and delete records.
            <br />
            <span className="text-[11px]">
              Default password: <code className="font-mono bg-surface-2 px-1.5 py-0.5 rounded">{ADMIN_PASSWORD}</code>
            </span>
          </DialogDescription>
        </DialogHeader>
        <Input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Admin password"
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Unlock</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
