import '../css/SalesDetailView.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import ProductsTableSalesDetail from '../component/ProductsTable_SalesDetail';
import ProductsFormSalesDetail from '../component/ProductsForm_SalesDetail';

const SalesDetailView = ({ route }) => {
    const cookies = new Cookies();
    const [ products, setProducts ] = useState([]);
    const [ subSubtotal, setSubSubtotal ] = useState(0);
    const [ presentation, setPresentation ] = useState("");
    const [ amountEdit, setAmountEdit ] = useState({
        amount: 0,
        presentation: "",
        cantidad: 1
    });
    const [ edit, setEdit] = useState({
        id: 0,
        edit: false
    });
    const [ newProduct, setNewProduct ] = useState({
        id_sale: 0,
        id_product: 0,
        id_presentation: 0,
        amount: 0,
        price: 0,
        subtotal: 0,
        delivered: "F"
    });

    const [ saleDetail, setSaleDetail ] = useState({
        subtotal: 0,
        abono: 0,
        total: 0
    });

    useEffect(() => {
        const idSale = cookies.get('idSale')
        const requestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/sale_detail/${idSale}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setProducts(data.data))
        .catch(error => {
            console.log('Error providing sales in sale view: ' + error)
        });

        fetch(`${route}/api/sale/${idSale}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            saleDetail.abono = data.data[0].abono;
            saleDetail.subtotal = data.data[0].subtotal;
            saleDetail.total = data.data[0].total;
        })
        .catch(error => {
            console.log('Error providing sales in sale view: ' + error)
        });

    }, []);

    return(
        <div>
            <div className='max-width sales-detail-content'>
                <div className='table-container'>
                    <ProductsTableSalesDetail 
                        route={route} 
                        edit={edit} 
                        setEdit={setEdit}
                        products={products} 
                        newProduct={newProduct} 
                        setNewProduct={setNewProduct}
                        saleDetail={saleDetail}
                        setSaleDetail={setSaleDetail}
                        setSubSubtotal={setSubSubtotal}
                        setPresentation={setPresentation}
                        amountEdit={amountEdit}
                        setAmountEdit={setAmountEdit}
                    />
                </div>
                <div className='detail-form'>
                    <ProductsFormSalesDetail
                        edit={edit} 
                        setEdit={setEdit} 
                        route={route} 
                        newProduct={newProduct} 
                        setNewProduct={setNewProduct} 
                        saleDetail={saleDetail}
                        subSubtotal={subSubtotal}
                        presentation={presentation}
                        setPresentation={setPresentation}
                        amountEdit={amountEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default SalesDetailView;