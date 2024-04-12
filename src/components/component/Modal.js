import "../css/Modal.css";
import ClientSelection from "./ClientSelection";
import EmployeeSelection from "./EmployeeSelection";
import ProductSelection from "./ProductsSelection";

const Modal = ({ route, 
    modalClient, 
    modalEmployee, 
    modalProduct, 
    setModalClient, 
    setModalEmployee, 
    setModalProduct, 
    setSale, 
    sale, 
    newProduct, 
    setNewProduct, 
    setProduct, 
}) => {
    return(
        <>
            {modalClient &&
                <div className="overlay">    
                    <div className="modalContainer">
                        <div className="modalHeader">
                            <h2>Seleccionar Cliente</h2>
                        </div>
                        <button className="closeModal" onClick={() => setModalClient(false)}>x</button>
                        <ClientSelection 
                            route={route} 
                            setSale={setSale} 
                            sale={sale} 
                            setModalClient={setModalClient} 
                        />
                    </div>
                </div>
            }
            {modalEmployee &&
                <div className="overlay">    
                    <div className="modalContainer">
                        <div className="modalHeader">
                            <h2>Seleccionar Empleado</h2>
                        </div>
                        <button className="closeModal" onClick={() => setModalEmployee(false)}>x</button>
                        <EmployeeSelection 
                            route={route} 
                            setSale={setSale} 
                            sale={sale} 
                            setModalEmployee={setModalEmployee} 
                        />
                    </div>
                </div>
            }
            {modalProduct &&
                <div className="overlay">    
                    <div className="modalContainer">
                        <div className="modalHeader">
                            <h2>Seleccionar Producto</h2>
                        </div>
                        <button className="closeModal" onClick={() => setModalProduct(false)}>x</button>
                        <ProductSelection 
                            route={route} 
                            newProduct={newProduct} 
                            setNewProduct={setNewProduct} 
                            setModalProduct={setModalProduct} 
                            setProduct={setProduct}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;