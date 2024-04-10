import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';


export const ProductoItem = ({title, image, category, price, id}) => {
    
    const value = useContext(DataContext);
    const addCarrito = value.addCarrito;

    return(
        <div className='producto'>
        <Link to={`/producto/${id}`}>
        <div className='producto__img'>
            <img src={image} alt={title} />
        </div>
        </Link>
        <div className='producto__footer'>
            <h1>{title}</h1>
            <p>{category}</p>
            <p className='price'>${price}</p>
        </div>
        <div className='button'>
            <button className='btn' onClick={() => addCarrito(id)}>
              Añadir al Carrito
            </button>
            <div>
                <Link to={`/producto/${id}`} className='btn'>Vista</Link>
            </div>
        </div>
        </div>
    );
};
