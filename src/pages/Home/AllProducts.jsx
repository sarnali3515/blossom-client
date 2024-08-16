import { useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi';


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');
    const limit = 6;

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${limit}&search=${searchTerm}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            });
    }, [currentPage, searchTerm, brand, category, minPrice, maxPrice, sort]);

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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        setCurrentPage(1);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto mb-8">
            <div className="flex p-4 justify-between flex-col-reverse md:flex-row bg-pink-300">
                {/* Filters */}
                <div className="my-4 flex space-x-4 ">
                    {/* Brand Filter */}
                    <input
                        type="text"
                        placeholder="Filter by brand..."
                        value={brand}
                        onChange={handleBrandChange}
                        className="p-2 border border-gray-300 rounded"
                    />

                    {/* Category Filter */}
                    <input
                        type="text"
                        placeholder="Filter by category..."
                        value={category}
                        onChange={handleCategoryChange}
                        className="p-2 border border-gray-300 rounded"
                    />

                    {/* Price Range Filter */}
                    <input
                        type="number"
                        placeholder="Min price"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max price"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>


                {/* Search Input */}
                <div className="my-4 flex items-center">
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch
                                className="text-pink-500" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search products by name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-2 pl-10 border border-pink-300 rounded"
                        />
                    </div>
                </div>

            </div>

            {/* Sorting */}
            <div className="my-4 flex items-center justify-center space-x-4">
                <select
                    value={sort}
                    onChange={handleSortChange}
                    className="p-2 border border-pink-400 rounded"
                >
                    <option value="" className="hover:bg-pink-500">Sort by</option>
                    <option value="price-asc" className="hover:bg-pink-500">Price: Low to High</option>
                    <option value="price-desc" className="hover:bg-pink-500">Price: High to Low</option>
                    <option value="date-desc" className="hover:bg-pink-500">Date Added: Newest First</option>
                </select>
            </div>



            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-5">
                {products.map(product => (
                    <div key={product._id} className="">
                        <div className="card w-full md:h-[500px] bg-pink-100 rounded-lg border border-pink-300">
                            <figure className="bg-white">
                                <img src={product.productImage} alt="Product" className="h-5/6" />
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
                                <p className='text-black text-base mt-2'><span className='font-semibold'>Date:</span> {product.creationDate}</p>
                                <div className='flex justify-between '>
                                    <p className='text-black text-base mt-2'><span className='font-semibold'>Ratings:</span> {product.ratings}</p>
                                    <p className='text-pink-600 btn hover:bg-pink-500 btn-xs bg-transparent border-pink-600 text-sm mt-2 font-bold'>{product.category} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination*/}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 font-semibold bg-pink-500 text-white rounded-3xl disabled:bg-gray-300 disabled:text-black"
                >
                    Previous
                </button>
                <p className="m-3">Page {currentPage} of {totalPages}</p>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 font-semibold bg-pink-500 text-white rounded-3xl disabled:bg-gray-300 disabled:text-black"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
