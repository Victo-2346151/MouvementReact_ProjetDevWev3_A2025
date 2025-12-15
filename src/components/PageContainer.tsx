interface Props {
  children: React.ReactNode;
}

export default function PageContainer({ children }: Props) {
  return <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>;
}
