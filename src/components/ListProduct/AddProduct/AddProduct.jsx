// import React, { useState } from 'react'
// import './AddProduct.css'
// import upload_area from '../../../assets/upload_area.svg'

// function AddProduct() {
  
//   const [image , setImage] = useState(false) ; 
//   const [productDetails , setProductDetails] = useState({

//         name : "" ,
//         image : "" ,
//         category : "women" , 
//         new_price : "" , 
//         old_price : ""
//   })

//   const changeHandler = (e)=>{
//         setProductDetails({...productDetails , [e.target.name] : e.target.value})
//   }

//   const imageHandler = (e)=>{
//         setImage(e.target.files[0]) ;
//   }

//   const Add_Product = async () => {
//     try {
//         let responseData;
//         let product = productDetails;
//         console.log(productDetails);
        
//         let formData = new FormData();
//         formData.append('product', image);
        
//         await fetch('http://localhost:4000/upload' , {
//             method : 'POST' , 
//             headers : {
//                 Accept : 'application/json' , 
//             },
//             body : formData ,
//         }).then((resp)=>resp.json()).then((data)=>{responseData=data})
      
//         //responseData = await uploadResponse.json();

//         if (responseData.success) {
//             product.image = responseData.image_url;

//             const productResponse = await fetch('http://localhost:4000/api/v1/products/addproduct', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(product)
//             });

//             const productData = await productResponse.json();

//             productData.success ? alert('Product Added') : alert('Failed to add product');
//         } else {
//             alert('Failed to upload image');
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert('An error occurred');
//     }
// };

//   return (
//     <div className='add-product'>
//         <div className='addproduct-itemfield'>
//             <p>Product title</p>
//             <input value={productDetails.name} onChange={changeHandler}  type='text' name='name' placeholder='Type here'/>
//         </div>
//         <div className='addproduct-price'>
//             <div className='addproduct-itemfield'>
//                 <p>Price</p>
//                 <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
//             </div>

//             <div className='addproduct-itemfield'>
//                 <p>Offer Price</p>
//                 <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
//             </div>
//         </div>

//         <div className='addproduct-itemfield'>
//             <p>Product Category</p>
//             <select value={productDetails.category} onChange={changeHandler} className='add-product-selector' name='category'>
//                 <option value="women">Women</option>
//                 <option value="men">Men</option>
//                 <option value="kid">Kid</option>
//             </select>
//         </div>
//         <div className='addproduct-itemfield'>
//             <label>  <img src={image?URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img'/> 
//         <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />   
//         </label>
//          </div>
//         <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
//     </div>
//   )
// }

// export default AddProduct



import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../../assets/upload_area.svg';
import { toast } from 'sonner'; // Importing toast from Sonner

function AddProduct() {
  
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const Add_Product = async () => {
    try {
      let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append('product', image);

      await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      }).then((resp) => resp.json()).then((data) => { responseData = data });

      if (responseData.success) {
        product.image = responseData.image_url;

        const productResponse = await fetch('http://localhost:4000/api/v1/products/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product)
        });

        const productData = await productResponse.json();

        if (productData.success) {
          toast.success('Product Added');
          // Reset the form
          setProductDetails({
            name: "",
            image: "",
            category: "women",
            new_price: "",
            old_price: ""
          });
          setImage(false);
        } else {
          toast.error('Failed to add product');
        }
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
        </div>

        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
        </div>
      </div>

      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} className='add-product-selector' name='category'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label>
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt='Thumbnail' />
          <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
        </label>
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
    </div>
  );
}

export default AddProduct;
