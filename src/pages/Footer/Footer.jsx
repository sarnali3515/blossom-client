

const Footer = () => {
    return (

        <div>
            <footer className="footer p-2 md:p-6 lg:p-10 bg-pink-600 text-base-content">
                <aside >
                    <div className="">

                        <p className="btn btn-ghost italic font-bold md:text-4xl text-pink-950">Blossom</p>

                    </div>
                </aside>
                <nav className="text-white">
                    <h6 className="footer-title">Links</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">All Products</a>
                    <a className="link link-hover"></a>
                </nav>
                <nav className="text-white">
                    <a className="link link-hover">News</a>
                    <a className="link link-hover">Contact Us</a>
                    <a className="link link-hover">About us</a>
                </nav>


            </footer>
            <footer className="footer footer-center bg-pink-600 text-white p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Blossom- Sarnali</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;