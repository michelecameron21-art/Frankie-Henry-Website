export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-8">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm opacity-70">
                    <p className="font-bold">Liabri Studios</p>
                    <p>&copy; 2026 Liabri Studios. All rights reserved.</p>
                </div>

                <div className="flex gap-4">
                    <a href="/privacy-policy.html" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">Terms of Service</a>
                    <a href="#" className="footer-link">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}
