import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/navbar/MainHeader";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Trombinoscope LLSS",
	description: "Trombinoscope des diverses commissions des Lames",
};

export default function RootLayout({ children }) {
	return (
		<>
			<meta name="robots" content="noindex, nofollow"></meta>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable}`}>
					<MainHeader />
					{children}
				</body>
			</html>
		</>
	);
}
