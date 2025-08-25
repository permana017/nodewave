import { toast } from "sonner";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";

export const showToast = {
  success: (message: string) =>
    toast.custom((t: any) => (
      <div
        className={`flex items-center gap-3 rounded-xl border bg-green-50 p-4 shadow-lg transition-all
        ${
          t.visible
            ? "animate-in fade-in slide-in-from-top-5"
            : "animate-out fade-out slide-out-to-top-5"
        }`}
      >
        <CheckCircle2 className="text-green-600" />
        <p className="text-green-800 font-medium">{message}</p>
      </div>
    )),

  error: (message: string) =>
    toast.custom((t: any) => (
      <div
        className={`flex items-center gap-3 rounded-xl border bg-red-50 p-4 shadow-lg transition-all
        ${
          t.visible
            ? "animate-in fade-in slide-in-from-top-5"
            : "animate-out fade-out slide-out-to-top-5"
        }`}
      >
        <XCircle className="text-red-600" />
        <p className="text-red-800 font-medium">{message}</p>
      </div>
    )),

  info: (message: string) =>
    toast.custom((t: any) => (
      <div
        className={`flex items-center gap-3 rounded-xl border bg-blue-50 p-4 shadow-lg transition-all
        ${
          t.visible
            ? "animate-in fade-in slide-in-from-top-5"
            : "animate-out fade-out slide-out-to-top-5"
        }`}
      >
        <Info className="text-blue-600" />
        <p className="text-blue-800 font-medium">{message}</p>
      </div>
    )),

  warning: (message: string) =>
    toast.custom((t: any) => (
      <div
        className={`flex items-center gap-3 rounded-xl border bg-yellow-50 p-4 shadow-lg transition-all
        ${
          t.visible
            ? "animate-in fade-in slide-in-from-top-5"
            : "animate-out fade-out slide-out-to-top-5"
        }`}
      >
        <AlertTriangle className="text-yellow-600" />
        <p className="text-yellow-800 font-medium">{message}</p>
      </div>
    )),
};
