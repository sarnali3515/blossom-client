import { useEffect, useState } from "react";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 6;

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            });
    }, [currentPage]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-5">
                {products.map(product => (
                    <div key={product._id} className="">
                        <div className="card w-full md:h-[500px] bg-pink-100 rounded-lg border border-pink-300">
                            <figure className="bg-white">
                                <img src={product.productImage} alt="Shoes" className="h-5/6" />
                            </figure>
                            <div className="p-4 text-left">
                                <div className="flex justify-between">
                                    <h2 className="font-bold text-xl  text-black">{product.productName}</h2>
                                    <h2 className="font-bold text-lg  text-pink-600">
                                        $ {product.price}
                                    </h2>
                                </div>
                                <p className='text-base mt-3 text-gray-800'>{product.description}</p>
                                <p className='text-black text-base mt-2'><span className='font-semibold'>Brand:</span> {product.brandName}</p>
                                <div className='flex justify-between '>
                                    <p className='text-black text-base mt-2'><span className='font-semibold'>Ratings:</span> {product.ratings}</p>
                                    <p className='text-pink-600 btn hover:bg-pink-500 btn-xs bg-transparent border-pink-600 text-sm mt-2 font-bold'>{product.category} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:bg-gray-200"
                >
                    Previous
                </button>
                <p className="mx-2">Page {currentPage} of {totalPages}</p>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:bg-gray-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
