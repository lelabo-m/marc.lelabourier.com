type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: LayoutProps) {
  return children;
}
