// import React, { useState, useEffect } from "react";
// import "../../adminCss/product/adminaddProduct.css";
// import { makeApi } from "../../api/callApi";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function AdminaddProduct() {
//   const [categories, setCategories] = useState([]);
//   const [Loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountPercentage, setDiscountPercentage] = useState(0);
//   const [quantity, setQuantity] = useState("");
//   const [images, setImages] = useState([{}]);
//   const [thumbnail, setThumbnail] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [size, setSize] = useState("");
//   const [newDeliverable, setNewDeliverable] = useState("");
//   const [deliverables, setDeliverables] = useState([]);
//   console.log(deliverables);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if (!name || !price || !quantity || !category || !brand || !thumbnail || !images ) {
//     //   toast.error('Please fill all required fields');
//     //   return;
//     // }
//     console.log(deliverables);
//     const requiredFields = [];
//     if (!name) {
//       requiredFields.push("Name");
//     }
//     if (!price) {
//       requiredFields.push("Price");
//     }
//     if (!quantity) {
//       requiredFields.push("Quantity");
//     }
//     if (!category) {
//       requiredFields.push("Category");
//     }
//     if (!thumbnail) {
//       requiredFields.push("Thumbnail");
//     }

//     if (images.length == 1) {
//       requiredFields.push(" Product Images");
//     }

//     if (requiredFields.length > 0) {
//       const fieldNames = requiredFields.join(", ");
//       toast.error(`Please fill all required fields: ${fieldNames}`);
//       return;
//     }
//     try {
//       const response = await makeApi("/api/create-product", "POST", {
//         name,
//         description,
//         price,
//         discountPercentage,
//         quantity,
//         image: images,
//         thumbnail,
//         category,
//         brand,
//         size,
//         deliverables
//       });
//       setName("");
//       setDescription("");
//       setPrice("");
//       setDiscountPercentage("");
//       setQuantity("");
//       setImages([""]);
//       setThumbnail("");
//       setCategory("");
//       setBrand("");
//       setSize("");
//       setDeliverables([]);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleImageChange = (index, value) => {
//     const updatedImages = [...images];
//     updatedImages[index] = value;
//     setImages(updatedImages);
//   };

//   const handleAddMoreImages = () => {
//     setImages([...images, ""]);
//   };

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         setLoading(true);
//         const response = await makeApi("/api/get-all-categories", "GET");
//         if (response.status === 200) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.log("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const handleImageUpload = async (event, index) => {
//     try {
//       const file = event.target.files[0];

//       // if (file.type.startsWith("image/")) {
//       if (file) {
//         console.log(file);

//         const compressedFile = await file;
//         // email-  festivebuck4@justzeus.com
//         // pass - ZXY_Abc-123
//         const data = new FormData();
//         data.append("file", compressedFile);
//         // data.append("upload_preset", "ou1fk438");
//         data.append("upload_preset", "pfendx01");
//         data.append("folder", "palji");

//         await axios
//           .post(
//             // `https://api.cloudinary.com/v1_1/dyl3gzm7d/image/upload`,
//             `https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
//             data
//           )
//           .then((response) => {
//             if (response.status === 200) {
//               const imageURL = response.data.url;
//               // setFormData({ ...formData, screenshot: imageURL });
//               handleImageChange(index, imageURL);
//             }
//           });
//       }
//     } catch (error) {
//       console.log("image upload error", error);
//     }
//   };
//   const handleThumbnailUpload = async (event, index) => {
//     try {
//       const file = event.target.files[0];

//       // if (file.type.startsWith("image/")) {
//       if (file) {
//         console.log(file);

//         const compressedFile = await file;

//         const data = new FormData();
//         data.append("file", compressedFile);
//         data.append("upload_preset", "pfendx01");
//         data.append("folder", "palji");

//         await axios
//           .post(
//             `https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
//             data
//           )
//           .then((response) => {
//             if (response.status === 200) {
//               const imageURL = response.data.url;
//               // setFormData({ ...formData, screenshot: imageURL });
//               setThumbnail(imageURL);
//             }
//           });
//       }
//     } catch (error) {
//       console.log("image upload error", error);
//     }
//   };

  // // include
  // const handleAddDeliverable = () => {
  //   setDeliverables([...deliverables, '']);
  // };

  // const handleRemoveDeliverable = (index) => {
  //   const newDeliverables = deliverables.filter((_, i) => i !== index);
  //   setDeliverables(newDeliverables);
  // };

  // const handleDeliverableChange = (e, index) => {
  //   const newDeliverables = [...deliverables];
  //   newDeliverables[index] = e.target.value;
  //   setDeliverables(newDeliverables);
  // };


//   return (
//     <div>
//       <div className="add-product-container">
//         <div>
//           <Link to={"/admin/allproducts"}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="26"
//               height="36"
//               fill="currentColor"
//               className="bi bi-arrow-left back_arrow_icon"
//               viewBox="0 0 16 16"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//               />
//             </svg>
//           </Link>
//         </div>
//         <div className="add_product_text">Add Product</div>
//         <div>
//           <ToastContainer />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className='form_group'>
//             <label className='form_label'>Includes:</label>
//             {deliverables.map((deliverable, index) => (
//               <div key={index} className='form_nested_group'>
//                 <input type="text" value={deliverable} className='form_nested_input' placeholder="Include" onChange={(e) => handleDeliverableChange(e, index)} />
//                 <button type="button" className='form_nested_button btn btn-danger ms-2' onClick={() => handleRemoveDeliverable(index)}>
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button type="button" className="admin_add_product_button add_product_page_button m-3"
//               style={{ width: "200px" }} onClick={handleAddDeliverable}>
//               Add Include
//             </button>
//           </div>
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           // required
//           />
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           // required
//           />
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Discount Percentage"
//             defaultValue={0}
//             value={discountPercentage}
//             onChange={(e) => setDiscountPercentage(e.target.value)}
//           />
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           // required
//           />
//           {/* drop down for setProductType */}





//           {/* {images.map((image, index) => (
//             <input
//               key={index}
//               type="text"
//               className="add_product_input_filed"
//               placeholder={`Image URL ${index + 1}`}
//               value={image}
//               onChange={(e) => handleImageChange(index, e.target.value)}
//               // required
//             />
//           ))} */}
//           <h3>Add Images of Product</h3>
//           {images.map((image, index) => (
//             <input
//               key={index}
//               type="file"
//               className="add_product_input_filed add_product_input_filed_image"
//               // placeholder={`Image URL ${index + 1}`}
//               // value={image}
//               // onChange={(e) => handleImageChange(index, e.target.value)}
//               onChange={(event) => {
//                 handleImageUpload(event, index);
//               }}
//             // required
//             />
//           ))}
//           <div>
//             {images.map((image, index) => (
//               <img src={image} alt="" width={150} height={150} />
//             ))}
//           </div>
//           <div className="add_product_page_add_more_div">
//             <button
//               type="button"
//               className="admin_add_product_button add_product_page_button"
//               onClick={handleAddMoreImages}
//             >
//               Add More
//             </button>
//           </div>
//           {/* <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Thumbnail URL"
//             value={thumbnail}
//             onChange={(e) => setThumbnail(e.target.value)}
//             // required
//           /> */}
//           <h3>Add thumbnail of Product</h3>
//           <form className="file-upload-form file_upload_form_upload_image d-flex justify-content-between">
//             <div>
//               <label for="file" className="file-upload-label">
//                 <div className="file-upload-design">
//                   <svg viewBox="0 0 640 512" height="1em">
//                     <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
//                   </svg>
//                   <p>Drag and Drop</p>
//                   <p>or</p>
//                   <span className="browse-button">Browse file</span>
//                 </div>
//                 <input
//                   id="file"
//                   type="file"
//                   onChange={(e) => handleThumbnailUpload(e)}
//                 // required
//                 />
//               </label>
//             </div>
//             <div>
//               {thumbnail === "" ? (
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRhb8uI0vKINdZJCfOmdIWu0uMBsKNCzlAk2myawr1rr3xFE-5g_B575p5H9V5S5nH3E&usqp=CAU"
//                   alt="no image"
//                   width={150}
//                   height={150}
//                 />
//               )

//                 : (
//                   <img src={thumbnail} alt="thumbnail" width={150} height={150} />
//                 )}
//               {/* {thumbnail && <img src={thumbnail} alt="thumbnail" width={150} height={150} />} */}
//             </div>
//           </form>

//           {/* <input
//             type="file"
//             className="add_product_input_filed add_product_input_filed_image"
//             placeholder="Thumbnail URL"
//             // value={thumbnail}
//             onChange={(e) => handleThumbnailUpload(e)}
//             // required
//           /> */}

//           <select
//             className="add_product_input_filed add_product_dropdown"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Brand"
//             value={brand}
//             onChange={(e) => setBrand(e.target.value)}
//           />
//           {/* <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Size"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//           /> */}
//           <div className="add_product_page_button_div">
//             <button
//               type="submit"
//               className="admin_add_product_button add_product_page_button"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminaddProduct;

import React, { useState, useEffect } from "react";
import "../../adminCss/product/adminaddProduct.css";
import { makeApi } from "../../api/callApi";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import fetchCategory  from "../../utils/CFunctions";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";


function AdminaddProduct() {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([{}]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [productType, setProductType] = useState("Domestic");
  const [uploadProgress, setUploadProgress] = useState({});
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [productSizes, setProductSizes] = useState([{ size: '', sizetype: '', quantity: '',price: '',discountPercentage: 0,FinalPrice: '' }]);
  const [deliverables, setDeliverables] = useState([]);


  // size
  // const handleSizeChange = (index, event) => {
  //   const values = [...productSizes];
  //   values[index][event.target.name] = event.target.value;
  //   setProductSizes(values);
  // };
  const handleSizeChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSizes = [...productSizes];

    // Update the value of the changed field
    updatedSizes[index][name] = parseFloat(value) || value;

    // Recalculate FinalPrice if price or discountPercentage is changed
    if (name === 'price' || name === 'discountPercentage') {
      const { price, discountPercentage } = updatedSizes[index];
      updatedSizes[index].FinalPrice = calculateFinalPrice(price, discountPercentage);
    }

    setProductSizes(updatedSizes);
  };

  const calculateFinalPrice = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
  };

  const handleAddSize = () => {
    setProductSizes([...productSizes, { size: '', sizetype: '', quantity: '',price: '',discountPercentage: 0,FinalPrice: '' }]);
  };

  const handleRemoveSize = (index) => {
    const values = [...productSizes];
    values.splice(index, 1);
    setProductSizes(values);
  };
  const fetchCategory =  async function fetchCategories() {
          try {
            setLoading(true);
            const response = await makeApi("/api/get-all-categories", "GET");
              setCategories(response.data.categories);
          } catch (error) {
            console.log("Error fetching categories:", error);
          } finally {
            setLoading(false);
          }
        }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [];
    if (!name) requiredFields.push("Name");
    // if (!price) requiredFields.push("Price");
    // if (!quantity) requiredFields.push("Quantity");
    if (!category) requiredFields.push("Category");
    if (!thumbnail) requiredFields.push("Thumbnail");
    if (!productType) requiredFields.push("Product Type");
    if (images.length === 0 || images.includes("")) requiredFields.push("Product Images");

    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      return;
    }

    try {
      const response = await makeApi("/api/create-product", "POST", {
        name,
        description,
        price,
        discountPercentage: discountPercentage || 0,
        quantity: quantity || 0,
        image: images,
        thumbnail,
        category,
        brand,
        size,
        productType,
        productSizes,
        deliverables
      });
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPercentage("");
      setQuantity("");
      setImages([""]);
      setThumbnail("");
      setCategory("");
      setBrand("");
      setSize("");
      setProductType("Domestic");
      setProductSizes([{ size: '', sizetype: '', quantity: '' }]);
      setDeliverables([]);
      
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
    // include
    const handleAddDeliverable = () => {
      setDeliverables([...deliverables, '']);
    };
  
    const handleRemoveDeliverable = (index) => {
      const newDeliverables = deliverables.filter((_, i) => i !== index);
      setDeliverables(newDeliverables);
    };
  
    const handleDeliverableChange = (e, index) => {
      const newDeliverables = [...deliverables];
      newDeliverables[index] = e.target.value;
      setDeliverables(newDeliverables);
    };
  
  

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleAddMoreImages = () => {
    setImages([...images, ""]);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchCategory()
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }

  }, []);

  const handleImageUpload = async (event, index) => {
    try {
      const file = event.target.files[0];
      console.log("1",file);

      if (file) {
        console.log("-=-=",file);
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        const imageURL = uploadedImageUrl;
        handleImageChange(index, imageURL);

      }
    } catch (error) {
      console.log("Image upload error", error);
    }
  };

  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      console.log("- thumbnil---",file);

      if (file) {
        console.log("---file---",file);
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        console.log("---file ---2---",uploadedImageUrl);

        // if (response.status === 200) {
        const imageURL = uploadedImageUrl;
        setThumbnail(imageURL);
        setThumbnailUploadProgress(100);
        // }
      }
    } catch (error) {
      console.log("Thumbnail upload error", error);
    }
  };
  return (
    <div className="add-product-container">
      <div className="header-section">
        <Link to={"/admin/allproducts"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left back_arrow_icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
        <div className="add_product_text">Add Product</div>
        <ToastContainer />
      </div>
  
      <form onSubmit={handleSubmit} className="form-section">
      <div className='form_group'>
             <label className='form_label'>Includes:</label>
             {deliverables.map((deliverable, index) => (
              <div key={index} className='form_nested_group'>
                <input type="text" value={deliverable} className='form_nested_input' placeholder="Include" onChange={(e) => handleDeliverableChange(e, index)} />
                <button type="button" className='form_nested_button btn btn-danger ms-2' onClick={() => handleRemoveDeliverable(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="admin_add_product_button add_product_page_button m-3"
              style={{ width: "200px" }} onClick={handleAddDeliverable}>
              Add Include
            </button>
          </div>
        {/* Name & Description */}
        <div className="section-wrapper">
          <h3>Product Details</h3>
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
   
        {/* Product Sizes */}
        <div className="section-wrapper">
          <h3>Product Sizes</h3>
          {productSizes.map((size, index) => (
            <div className="size-wrapper" key={index}>
              
              <input
                type="text"
                name="size"
                placeholder="Size"
                value={size.size}
                onChange={(event) => handleSizeChange(index, event)}
              />
              
              <input
                type="text"
                name="sizetype"
                placeholder="Size Type"
                value={size.sizetype}
                onChange={(event) => handleSizeChange(index, event)}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Stock"
                value={size.quantity}
                onChange={(event) => handleSizeChange(index, event)}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={size.price}
                onChange={(event) => handleSizeChange(index, event)}
              />
              <input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={size.discountPercentage}
                onChange={(event) => handleSizeChange(index, event)}
              />
              <input
                type="number"
                name="FinalPrice"
                placeholder="Final Price"
                // value={size.price - size.discountPercentage}
                value={calculateFinalPrice(size.price, size.discountPercentage)}
                onChange={(event) => handleSizeChange(index, event)}
              />

              <button
                type="button"
                className="w-25 btn btn-danger"
                onClick={() => handleRemoveSize(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddSize}
          >
            Add More
          </button>
        </div>
  
        {/* Images & Thumbnail */}
        <div className="section-wrapper">
          <h3>Product Images</h3>
          {images.map((image, index) => (
            <div key={index}>
              <input
                type="file"
                className="add_product_input_filed add_product_input_filed_image"
                onChange={(event) => handleImageUpload(event, index)}
              />
              {uploadProgress[index] !== undefined && (
                <div className="upload-progress">
                  {uploadProgress[index]}%
                  {uploadProgress[index] < 100 && <div className="loader"></div>}
                </div>
              )}
              {image && (
                <img
                  loading="lazy"
                  src={image}
                  alt={`Product ${index + 1}`}
                  width={150}
                  height={150}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            className="admin_add_product_button add_product_page_button"
            onClick={handleAddMoreImages}
          >
            Add More
          </button>
        </div>
  
        <div className="section-wrapper">
          <h3>Product Thumbnail</h3>
          <div className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 1024 1024" className="add_product_upload_image">
                  <path className="path1" d="M384 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"></path>
                  <path className="path2" d="M853.333333 725.333333v106.666667H170.666667v-106.666667H106.666667v106.666667c0 35.413333 28.586667 64 64 64h682.666666c35.413333 0 64-28.586667 64-64v-106.666667h-64z"></path>
                  <path className="path3" d="M469.333333 554.666667l85.333334-113.066667 128 170.666667H341.333333L213.333333 469.333333l170.666667-213.333333 85.333333 106.666667 149.333334-192h-448c-35.413333 0-64 28.586667-64 64v554.666666h64v-405.333333l128 149.333333 85.333333 106.666667z"></path>
                  <path className="path4" d="M725.333333 298.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"></path>
                </svg>
              </div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="file-upload-input"
              onChange={handleThumbnailUpload}
            />
            {thumbnailUploadProgress > 0 && (
              <div className="upload-progress">
                {thumbnailUploadProgress}%
                {thumbnailUploadProgress < 100 && <div className="loader"></div>}
              </div>
            )}
            {thumbnail && (
              <img
                loading="lazy"
                src={thumbnail}
                alt="Thumbnail"
                width={150}
                height={150}
              />
            )}
          </div>
        </div>
  
        {/* Additional Details */}
        <div className="section-wrapper">
          <h3>Additional Details</h3>
          {/* <select
            className="add_product_input_filed"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select> */}
          <select
            className="add_product_input_filed"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            className="add_product_input_filed"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          /> */}
         
        </div>
  
        {/* Submit Button */}
        <div className="submit-section">
          <button type="submit" className="admin_add_product_button">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
  
}

export default AdminaddProduct;
