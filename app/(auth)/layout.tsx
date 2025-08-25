export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-100 h-[100dvh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[200vw] h-full bg-slate-50 right-0 top-[45vh] rotate-3"></div>
      {children}
    </div>
  );
}
