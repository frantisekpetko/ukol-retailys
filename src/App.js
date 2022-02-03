import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import AppSplashScreen from './components/AppSplashScreen/AppSplashScreen';
import Buttons from './components/Buttons/Buttons';
import Items from './components/Items/Items';
import ProductsNumber from './components/ProductsNumber/ProductsNumber';
import ItemsPagination from './components/ItemsPagination/ItemsPagination';

function App() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [length, setLength] = useState(null);
    const [showItems, setShowItems] = useState({
        products: false,
        productsLength: false,
        productsWithParts: false,
    })

    const [productsPagination, setProductsPagination] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);

    function handleClick(page) {
        let productsLength = data.length;
        let productsPerPage = 16;
        let count = Math.ceil(productsLength / productsPerPage);
        setCount(count);
        //console.log("tradesPerPage", tradesPerPage)
        let paginateProductsTop = page * productsPerPage;
        //console.log("paginateTradesTop, offset", paginateTradesTop, offset)
        let paginateProductsBottom = (paginateProductsTop - productsPerPage + 1);
        //console.log("paginateTradesBottom", paginateTradesBottom )

        const productsForPage = data.filter((item, index) => {
            //console.log(paginateTradesTop , paginateTradesBottom)
            const id = index + 1;
            if (id <= paginateProductsTop && id >= paginateProductsBottom) {
                //console.log("item", item)
                return item;
            }
        })

        setProductsPagination(productsForPage);
        setPage(page);
    }


    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('http://localhost:4000/api/export-full');
                //console.log('res', res.data.item);
                setLength(res.data.item.length);
                setData([...res.data.item]);
                //.slice(0, 2000)


                let productsPerPage = 16;
                let count = Math.ceil(res.data.item.length / productsPerPage );
                setCount(count);
                //console.log("tradesPerPage", tradesPerPage)
                let paginateProductsTop = page * productsPerPage;
                //console.log("paginateTradesTop, offset", paginateTradesTop, offset)
                let paginateProductsBottom = (paginateProductsTop - productsPerPage);
                //console.log("paginateTradesBottom", paginateTradesBottom )
                //console.log("paginateTradesBottom", paginateTradesBottom )

                const productsForPage = res.data.item.filter((item, index) => {
                    //console.log(paginateTradesTop , paginateTradesBottom)
                    const id = index + 1;
                    if (id <= paginateProductsTop && id >= paginateProductsBottom) {
                        //console.log("item", item)
                        return item;
                    }
                })

                setProductsPagination([...productsForPage]);
                setPage(1);
                setIsLoading(false);
               
            }
            catch (e) {
                console.log(e);
            }
    
        }

        getData();

    }, []);

    //console.log('data', data);
    //console.log('paginationData', productsPagination);

    const AppHomePage = () =>
        <>
            <Header />
            <div className="center">        
                <div className="header-customized">
                    <h1>Produkty</h1>

                    <Buttons setShowItems={setShowItems} />
                  
                    <Items
                        showItems={showItems}
                        productsPagination={productsPagination}
                    />

                    <ProductsNumber
                        productsLength={showItems.productsLength}
                        length={length}
                    />
                   
                    <ItemsPagination
                        count={count}
                        showItems={showItems}
                        page={page}
                        handleClick={handleClick}
                        productsPaginationLength={productsPagination.length}
                    />  
                </div>
        </div></>;

    if (isLoading) { return <AppSplashScreen />};


    return (
          <AppHomePage />
    );
}

export default App;
