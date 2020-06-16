import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';

import {fetchProducts} from '../actions'
import Pagination from './Pagination'

const Products = () => {
    // componentDidMount () {
    //     this.props.fetchProducts()
    // }
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/photos');
            setProducts(res.data);
            setLoading(false);
        }
        fetchProducts();
    }, []);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if(loading) {
        return <h2>Loading...</h2>
    }

    const filteredProducts = products.filter( product => {
        return product.title.toLowerCase().includes(search.toLocaleLowerCase())
    })

    return (
        <div>
            <input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />
            <ul>
                {search !== '' ? filteredProducts.map(product => (
                    <li key={product.id}>
                        {product.title}
                    </li>
                )) : currentProducts.map(product => (
                    <li key={product.id}>
                        {product.title}
                    </li>
                ))
                }
            </ul>
            {search === '' ? <Pagination 
                productsPerPage={productsPerPage} 
                totalProducts={products.length} 
                paginate={paginate}
            /> : ''}
        </div>
    )
}

const mapDispatchToProps = {
    fetchProducts
}

export default connect(null, mapDispatchToProps)(Products)
