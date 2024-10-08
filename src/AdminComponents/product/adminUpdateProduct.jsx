
// import "../../adminCss/adminUpdateProduct.css";
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import axios from "axios";

// function UpdateProduct() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const { productId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [Updateloader, setUpdateLoader] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [deliverables, setDeliverables] = useState([]);
//   const [newDeliverable, setNewDeliverable] = useState("");
//   const fetchCampaignDeliverables = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-all-includes/${productId}`, 'GET');
//       const campaignData = response.data.includes;
//       setDeliverables(campaignData);
//     } catch (error) {
//       console.error('Error fetching campaign deliverables:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     brand: "",
//     image: [],
//     thumbnail: "",
//     discountPercentage: "",
//     productType: "",
//   });

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(
//         `/api/get-single-product/${productId}`,
//         "GET"
//       );
//       const product = response.data.product;
//       setProduct(product);
//       setFormData({ 
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         quantity: product.quantity,
//         category: product.category._id, 
//         brand: product.brand,
//         image: product.image,
//         thumbnail: product.thumbnail,
//         discountPercentage: product.discountPercentage,
//         productType: product.productType,
//       });
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchCampaignDeliverables()
//     fetchProduct();
//   }, [productId]);
  

//   const handleChange = (e) => {

//     const { name, value } = e.target;


//      if (["price", "quantity", "discountPercentage"].includes(name)) {
//       if (!/^\d*$/.test(value)) {
//         return;
//       }
//     }
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdateLoader(true);

//       const updateProduct = await makeApi(
//         `/api/update-product/${productId}`,
//         "PUT",
//         formData
//       );
//       console.log("Product updated successfully!", updateProduct);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     } finally {
//       setUpdateLoader(false);
//       navigate("/admin/allproducts");
//     }
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

//   const removeImage = (indexToRemove) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       image: prevFormData.image.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const handleAddMoreImages = () => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       image: [...prevFormData.image, ""],
//     }));
//   };
//   const handleImageUpload = async (event, index) => {
    
  
//     try {
//       const file = event.target.files[0];

//       // if (file.type.startsWith("image/")) {
//       if (file) {
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
//               const imageUrls = response.data.url;
             
//               setFormData((prevFormData) => {
//                 const updatedImages = [...prevFormData.image];
//                 updatedImages[index] = imageUrls;
//                 return {
//                   ...prevFormData,
//                   image: updatedImages,
//                 };
//               });
//             }
//           });
//       }
//     } catch (error) {
//       console.log("image upload error", error);
//     }
//   };
//   const handleThumbnailUpload = async (event) => {
//     try {
//       const file = event.target.files[0];

//       // if (file.type.startsWith("image/")) {
//       if (file) {
//         console.log(file);

//         const compressedFile = await file;

//         const data = new FormData();
//         data.append("file", compressedFile);
//         data.append("upload_preset", "pfendx01");
//         data.append("folder", "palji");;

//         await axios
//           .post(
//             `https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
//             data
//           )
//           .then((response) => {
//             if (response.status === 200) {
//               const imageUrls = response.data.url;
//               console.log("imageUrlsimageUrlsimageUrls", imageUrls);
//               setFormData((prevFormData) => {
//                 return {
//                   ...prevFormData,
//                   thumbnail: imageUrls,
//                 };
//               });
//             }
//           });
//       }
//     } catch (error) {
//       console.log("image upload error", error);
//     }
//   };

//   const handleDeleteDeliverable = async (deletedelid) => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/delete-include/${deletedelid}`, 'DELETE');
//       fetchCampaignDeliverables();
//     } catch (error) {
//       console.error('Error deleting campaign deliverable:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateDeliverable = async (deliverableId, updatedName) => {
//     console.log(deliverableId);
//     try {
//       setLoading(true);
//       await makeApi(`/api/update-include/${deliverableId}`, 'PUT', { include: updatedName });
//       fetchCampaignDeliverables();
//     } catch (error) {
//       console.error('Error updating campaign deliverable:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleAddDeliverable = async () => {
//     if (!newDeliverable) return;

//     try {
//       setLoading(true);
//       await makeApi('/api/include-product', 'POST', { productId: productId, include: newDeliverable });
//       setNewDeliverable("");
//       fetchCampaignDeliverables();
//     } catch (error) {
//       console.error('Error adding campaign deliverable:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="main_update_product_page">
//           <div>
//             <Link to={"/admin/allproducts"}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="26"
//                 height="36"
//                 fill="currentColor"
//                 className="bi bi-arrow-left back_arrow_icon"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//                 />
//               </svg>
//             </Link>
//           </div>

//           <div className="update-product-container">
//             <h2>Update Product</h2>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData?.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <select
//                   className="add_product_input_filed"
//                   value={formData?.productType}
//                   // onChange={(e) => setProductType(e.target.value)}
//                   onChange={handleChange}
//                   name="productType"
//                 >
//                   <option value="Domestic">Domestic</option>
//                   <option value="International">International</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Description:</label>
//                 <textarea
//                   name="description"
//                   value={formData?.description}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Price:</label>
//                 <input
//                   type="text"
//                   name="price"
//                   value={formData?.price}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Discount Percentage:</label>
//                 <input
//                   type="text"
//                   name="discountPercentage"
//                   value={formData?.discountPercentage}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Quantity:</label>
//                 <input
//                   type="text"
//                   name="quantity"
//                   value={formData?.quantity}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
              
//                 <label>Category:</label>
//                 {/* <input
//                   type="text"
//                   name="category"
//                   value={formData?.category}
//                   onChange={handleChange}
//                 /> */}
//                 <select
//                   className="add_product_input_filed add_product_dropdown"
//                   value={formData?.category || ""} 
//                   name="category"
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label>Brand:</label>
//                 <input
//                   type="text"
//                   name="brand"
//                   value={formData?.brand}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="update_product_Image_section">
//                 <label>Images:</label>
//                 {formData?.image.map((imageUrl, index) => (
//                   <div
//                     key={index}
//                     className="image_wrapper d-flex justify-content-around align-items-center"
//                   >
//                     {/* <input
//                       type="file"
//                       className="add_product_input_filed add_product_input_filed_image"
//                       accept="image/*"
//                       onChange={(event) => handleImageUpload(event, index)}
//                       //   required
//                     /> */}
//                     <div>
//                       <form className="file-upload-form file_upload_form_upload_image">
//                         <label className="file-upload-label">
//                           <div className="file-upload-design">
//                             <svg viewBox="0 0 640 512" height="1em">
//                               <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
//                             </svg>
//                             <p>Drag and Drop</p>
//                             <p>or</p>
//                             <span className="browse-button">Browse file</span>
//                           </div>
//                           <input
//                             type="file"
//                             className="add_product_input_filed add_product_input_filed_image"
//                             accept="image/*"
//                             onChange={(event) =>
//                               handleImageUpload(event, index)
//                             }
//                           //   required
//                           />
//                         </label>
//                       </form>
//                     </div>
//                     <div>
//                       <img
//                         src={imageUrl}
//                         alt={`Image ${index + 1}`}
//                         className="update_product_image"
//                       />
//                     </div>
//                     <div>
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="remove_image_button btn btn-danger p-3"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <div>
//                   <button
//                     type="button"
//                     onClick={handleAddMoreImages}
//                     className="add_more_images_button btn btn-success p-3"
//                   >
//                     Add More Images
//                   </button>
//                 </div>
//               </div>
//               <label>Thumbnail:</label>
//               <div className="d-flex justify-content-evenly">
//                 {/* <input
//                   type="file"
//                   className="add_product_input_filed add_product_input_filed_image"
//                   accept="image/*"
//                   onChange={handleThumbnailUpload}
//                   //   required
//                 /> */}
//                 <div>
//                   <form className="file-upload-form file_upload_form_upload_image">
//                     <label className="file-upload-label">
//                       <div className="file-upload-design">
//                         <svg viewBox="0 0 640 512" height="1em">
//                           <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
//                         </svg>
//                         <p>Drag and Drop</p>
//                         <p>or</p>
//                         <span className="browse-button">Browse file</span>
//                       </div>
//                       <input
//                         id="vaibhav"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleThumbnailUpload}
//                         required
//                       />
//                     </label>
//                   </form>
//                 </div>
//                 <div>
//                   {formData?.thumbnail && (
//                     <img
//                       src={formData?.thumbnail}
//                       alt="Thumbnail"
//                       className="update_product_image_thumbnail"
//                     />
//                   )}
//                 </div>
//               </div>
//               <div className="d-flex justify-content-center align-items-center text-center" >

//               <div type="submit" className=" d-flex justify-content-center align-items-center text-center " style={{border:"none"}} >
//                 {Updateloader ? <div className="w-100" > <Loader  /> </div>: <div className="btn btn-secondary" onClick={handleSubmit} >Update Product</div>}
//               </div>
//               </div>
//             </form>
//           </div>
//           <div className='campaign-update' >
//           <h4 className="update-title">Update Deliverables</h4>

//           <div className="deliverables-container">
//             {deliverables.map((item) => (
//               <div key={item._id} className="deliverable-row">
//                 <input
//                   type="text"
//                   value={item.include}
//                   onChange={(e) => {
//                     const updatedDeliverables = deliverables.map((deliverable) =>
//                       deliverable._id === item._id ? { ...deliverable, include: e.target.value } : deliverable
//                     );
//                     setDeliverables(updatedDeliverables);
//                   }}
//                   className="deliverable-input"
//                 />
//                 <button
//                   onClick={() => handleUpdateDeliverable(item._id, item.include)}
//                   className="btn btn-warning "
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleDeleteDeliverable(item._id)}
//                   className="btn btn-danger"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}

//             <div className="add-deliverable-row">
//               <input
//                 type="text"
//                 value={newDeliverable}
//                 onChange={(e) => setNewDeliverable(e.target.value)}
//                 placeholder="Add new deliverable"
//                 className="deliverable-input"
//               />
//               <button onClick={handleAddDeliverable} className=" btn btn-success ">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default UpdateProduct;

import "../../adminCss/adminUpdateProduct.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState({ show: false, sizeId: null });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    image: [],
    thumbnail: "",
    discountPercentage: "",
    productType: "",
    Tax: "",
    PriceAfterDiscount: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

        const productData = response.data.product;
        setProduct(productData);
        setSizes(response.data.sizes);

        // Set form data with the product details
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          category: productData.category._id,
          brand: productData.brand,
          image: productData.image,
          thumbnail: productData.thumbnail,
          discountPercentage: productData.discountPercentage,
          productType: productData.productType,
          Tax: productData.Tax,
          PriceAfterDiscount: productData.PriceAfterDiscount,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeChange = (e, index, field) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = e.target.value;
    setSizes(updatedSizes);
  };

  const handleAddMoreSizes = () => {
    setSizes([...sizes, { size: "", sizetype: "", quantity: "" }]);
  };

  const handleDeleteSize = async (sizeId) => {
    try {
      await makeApi(`/api/delete-productsize/${sizeId}`, "DELETE");
      setSizes(sizes.filter((size) => size._id !== sizeId));
      setShowConfirm({ show: false, sizeId: null });
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    try {
      const url = await uploadToCloudinary(file, setUploadProgress);
      if (type === "thumbnail") {
        setFormData({ ...formData, thumbnail: url });
      } else {
        setFormData({ ...formData, image: [...formData.image, url] });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.image.filter((_, i) => i !== index);
    setFormData({ ...formData, image: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      await makeApi(`/api/update-product/${productId}`, "PUT", formData);
      for (const size of sizes) {
        if (size._id) {
          await makeApi(`/api/update-productsize/${size._id}`, "PUT", size);
        } else {
          await makeApi(`/api/add-productsize`, "POST", {
            productId,
            ...size,
          });
        }
      }
      console.log("Product updated successfully!");
      navigate("/admin/allproducts");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdateLoader(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_update_product_page">
          <div>
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
          </div>

          <div className="update-product-container">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
              {/* General Information Section */}
              <div className="form-section">
                <h3>General Information</h3>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Pricing Section */}
              {/* <div className="form-section">
                <h3>Pricing</h3>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price After Discount:</label>
                  <input
                    type="number"
                    name="PriceAfterDiscount"
                    value={formData.PriceAfterDiscount}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tax:</label>
                  <input
                    type="number"
                    name="Tax"
                    value={formData.Tax}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Discount Percentage:</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              {/* Stock & Quantity Section */}
              <div className="form-section">
                <h3>Stock & Quantity</h3>
                {/* <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="form-group">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="form-group">
                  <label>Product Type:</label>
                  <input
                    type="text"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                  />
                </div> */}
              </div>

              {/* Sizes Section */}
              <div className="form-section">
                <h3>Sizes</h3>
                <div className="size-section">
                  {sizes.map((size, index) => (
                    <div key={index} className="size-row">
                      <input
                        type="text"
                        name={`size_${index}`}
                        value={size.size}
                        placeholder="Size"
                        onChange={(e) => handleSizeChange(e, index, "size")}
                      />
                      <input
                        type="text"
                        name={`sizetype_${index}`}
                        value={size.sizetype}
                        placeholder="Size Type"
                        onChange={(e) => handleSizeChange(e, index, "sizetype")}
                      />
                      <input
                        type="number"
                        name={`quantity_${index}`}
                        value={size.quantity}
                        placeholder="Quantity"
                        onChange={(e) => handleSizeChange(e, index, "quantity")}
                      />
                      {size._id && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirm({ show: true, sizeId: size._id })
                          }
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-more-sizes-button"
                    onClick={handleAddMoreSizes}
                  >
                    Add More Sizes
                  </button>
                </div>
              </div>

              {/* Images Section */}
              <div className="form-section">
                <h3>Images</h3>
                <div className="update_product_Image_section">
                  <label>Thumbnail:</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "thumbnail")}
                  />
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail"
                      className="update_product_image_thumbnail"
                    />
                  )}
                </div>

                <div className="update_product_Image_section">
                  <label>Product Images:</label>
                  {formData.image.map((img, index) => (
                    <div key={index} className="image_wrapper">
                      <img src={img} alt={`Product ${index}`} />
                      <button
                        type="button"
                        className="remove_image_button"
                        onClick={() => handleImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "image")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-section">
                <button
                  type="submit"
                  className="admin_panel_button"
                  disabled={updateloader}
                >
                  {updateloader ? <Loader /> : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Size Popup */}
      {showConfirm.show && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <p>Are you sure you want to delete this size?</p>
          <button
            onClick={() => handleDeleteSize(showConfirm.sizeId)}
            style={{ marginRight: "10px" }}
          >
            Yes
          </button>
          <button onClick={() => setShowConfirm({ show: false, sizeId: null })}>
            No
          </button>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;
