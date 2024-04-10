import React, { useContext, useState, useEffect} from 'react';
import { DataContext } from '../../context/DataProvider';
import { useParams } from 'react-router-dom';
import { ProductoItem } from './ProductoItem';


export const ProductoDetalles = () => {
   const value = useContext(DataContext)
   const [productos] = value.productos;
   const addCarrito = value.addCarrito;
   const [detalle, setDetalle] = useState([]);
   const [url, setUrl] = useState(0);
   const [images, setImages] = useState('')
   const params = useParams();
   let item = 0;

   
   useEffect(() => {
      productos.forEach(producto => {
         item= 0;
         if(producto.id === parseInt(params.id)){
            setDetalle(producto)
            setUrl(0)
         }
      })
   },[params.id, productos])


   useEffect(() => {
      const values = `${detalle.img1} ${url} ${detalle.img2}`
      setImages(values);
   },[url,params.id])

   const handleInput = e => {
      const number = e.target.value.toString().padStart(2, '01');
      setUrl(number)
      console.log(number);
   }

   if(detalle.length < 1) return null;

   return(
      <>
      {
       <div className='detalles'>
        <h2>{detalle.title}</h2>
        <p className='price'>${detalle.price}</p>
        <div className='grid'>
         <p className='nuevo'>Nuevo</p>
         <div className='size'>
            <select placeholder='Tamaño'>
               <option value='1'>1</option>
               <option value='2'>2</option>
               <option value='3'>3</option>
               <option value='4'>4</option>
               <option value='5'>5</option>
               <option value='6'>6</option>
               <option value='7'>7</option>
               <option value='8'>8</option>
               <option value='9'>9</option>
               <option value='10'>10</option>
            </select>
            <p>Tamaño</p>
         </div>
        </div>
        <button onClick={() => addCarrito(detalle.id)}>Añadir al carrito</button>

        {
         url ? <img src={images} alt={detalle.title} /> : <img src={detalle.image} alt={detalle.title} />
        }
         
        <input type='range' min='1' max='36' value={url} onChange={handleInput} />

        <div className='description'>
         <p><b>Description:</b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto mollitia placeat aperiam quas odit sunt asperiores nulla, animi reprehenderit quasi expedita ullam sint, facere ratione, id laboriosam! Blanditiis, necessitatibus consequatur.<br/> <br/> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus ad quod dolorum qui eligendi doloribus quisquam consequuntur eum dolore eaque voluptas aperiam nihil, deserunt suscipit quaerat molestiae dolorem nisi consectetur!</p>
        </div>
       </div>
      }

      <h2 className='relacionado'>Productos Relacionados</h2>
      <div className='productos'> {
         productos.map((producto) => {
            if((item < 6) && (detalle.category === producto.category)) {
               item++;
               return <ProductoItem
               key={producto.id}
               id={producto.id}
               title={producto.title}
               price={producto.price}
               image={producto.image}
               category={producto.category}
               cantidad={producto.cantidad}
               />
            }
         })
      }
      </div>
      </>
   )
}