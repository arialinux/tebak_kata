export const metadata = {
  title: 'Tebak Kata',
  description: 'Game Tebak Kata',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
