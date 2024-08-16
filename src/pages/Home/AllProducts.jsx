import { useEffect, useState } from "react";


const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            });
    }, [])
    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-5">
                {
                    products.map(product => (
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
                    ))
                }
            </div>
        </div>
    );
};

export default AllProducts;