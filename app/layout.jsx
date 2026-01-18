import ClientLayout from "../components/ClientLayout";
import FontPreloader from "../FontPreloader";

export const metadata = {
  metadataBase: new URL("https://techsfera.com"),
  title: {
    default: "TechSfera | Digital Product Studio",
    template: "%s | TechSfera",
  },
  description:
    "TechSfera is a digital product studio building modern software, products, and brands for startups and growing businesses.",
  keywords: [
    "digital product studio",
    "software development",
    "UI/UX design",
    "branding",
    "web development",
    "mobile app development",
    "startup",
    "Bangladesh",
    "Dhaka",
  ],
  authors: [{ name: "TechSfera", url: "https://techsfera.com" }],
  creator: "TechSfera",
  publisher: "TechSfera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techsfera.com",
    siteName: "TechSfera",
    title: "TechSfera | Digital Product Studio",
    description:
      "TechSfera is a digital product studio building modern software, products, and brands for startups and growing businesses.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechSfera - Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSfera | Digital Product Studio",
    description:
      "TechSfera is a digital product studio building modern software, products, and brands for startups and growing businesses.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/static/fav.png" />
        <meta content="#000000" name="theme-color" />
        <FontPreloader />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
