export default function Footer() {
    return (
        <footer style={{ background: '#FFD200', color: '#78350F' }} className="py-8">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm opacity-70">
                    <p className="font-bold">Liabri Studios</p>
                    <p>&copy; 2026 Liabri Studios. All rights reserved.</p>
                </div>

                <div className="flex gap-4">
                    <a href="/privacy-policy.html" className="footer-link">Privacy Policy</a>
                    <a href="/terms-of-service.html" className="footer-link">Terms of Service</a>
                    <a href="/contact.html" className="footer-link">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}
