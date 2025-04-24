const LowerFooter = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className=" flex justify-between px-6 py-8">

            <p className="text-gray-tertiary">
                © {year} Ecommerce
            </p>
        </footer>
    )
}

export default LowerFooter