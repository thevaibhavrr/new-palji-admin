// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
 
// function Editcategories() {
//   const navigate = useNavigate();
//   const { Id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [Updateloader, setUpdateLoader] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(`/api/get-single-category/${Id}`, "GET");
//         console.log(response.data);
//         setProduct(response.data.category);
//         setFormData({
//           name: response.data.category.name,
//           description: response.data.category.description,
//           // Set more fields if needed
//         });
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [Id]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdateLoader(true);

//       const updateProduct = await makeApi(
//         `/api/update-category/${Id}`,
//         "PUT",
//         formData
//       );
//       console.log("Product updated successfully!", updateProduct);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     } finally {
//       setUpdateLoader(false);
//       navigate("/admin/all-categories");
//     }
//   };
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <>
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className="main_update_product_page">
//             <div>
//               <Link to={"/admin/allproducts"}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="26"
//                   height="36"
//                   fill="currentColor"
//                   className="bi bi-arrow-left back_arrow_icon"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//                   />
//                 </svg>
//               </Link>
//             </div>
//             <div className="update-product-container">
//               <h2>Update Product</h2>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData?.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label>Description:</label>
//                   <textarea
//                     name="description"
//                     value={formData?.description}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <button type="submit" className="update_product_button">
//                   {Updateloader ? <Loader /> : <div>Update Product</div>}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </>
//     </div>
//   );
// }

// export default Editcategories;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import "../../style/updatecategory.css";

// function Editcategories() {
//   const navigate = useNavigate();
//   const { Id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [Updateloader, setUpdateLoader] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
//   const [subcategories, setSubcategories] = useState([]);
//   const [newSubcategory, setNewSubcategory] = useState({
//     name: "",
//     description: "",
//   });
//   const [editSubcategoryId, setEditSubcategoryId] = useState(null); // ID of the subcategory being edited
//   const [editSubcategoryData, setEditSubcategoryData] = useState({
//     name: "",
//     description: "",
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(`/api/get-single-category/${Id}`, "GET");
//         setProduct(response.data.category);
//         setSubcategories(response.data.subcategory);
//         setFormData({
//           name: response.data.category.name,
//           description: response.data.category.description,
//         });
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [Id]);

//   // Update category details
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdateLoader(true);
//       const updateProduct = await makeApi(`/api/update-category/${Id}`, "PUT", formData);
//       console.log("Product updated successfully!", updateProduct);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     } finally {
//       setUpdateLoader(false);
//       navigate("/admin/all-categories");
//     }
//   };

//   // Add new subcategory
//   const handleSubcategorySubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await makeApi("/api/create-sub-category", "POST", {
//         ...newSubcategory,
//         category: Id,
//       });
//       setSubcategories([...subcategories, response.data.subcategory]);
//       setNewSubcategory({ name: "", description: "" });
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//     }
//   };

//   // Delete subcategory
//   const handleDeleteSubcategory = async (subcategoryId) => {
//     try {
//       await makeApi(`/api/delete-sub-category/${subcategoryId}`, "DELETE");
//       setSubcategories(subcategories.filter((sub) => sub._id !== subcategoryId));
//     } catch (error) {
//       console.error("Error deleting subcategory:", error);
//     }
//   };

//   // Start editing a subcategory
//   const handleEditSubcategory = (subcategory) => {
//     setEditSubcategoryId(subcategory._id);
//     setEditSubcategoryData({
//       name: subcategory.name,
//       description: subcategory.description,
//     });
//   };

//   // Handle the edit form submission
//   const handleEditSubcategorySubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await makeApi(
//         `/api/update-sub-category/${editSubcategoryId}`,
//         "PUT",
//         editSubcategoryData
//       );
//       setSubcategories(
//         subcategories.map((sub) =>
//           sub._id === editSubcategoryId ? response.data.subcategory : sub
//         )
//       );
//       setEditSubcategoryId(null); // Reset edit mode
//     } catch (error) {
//       console.error("Error updating subcategory:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubcategoryChange = (e) => {
//     setNewSubcategory({
//       ...newSubcategory,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleEditSubcategoryChange = (e) => {
//     setEditSubcategoryData({
//       ...editSubcategoryData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <>
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className="main_update_product_page">
//             <div>
//               <Link to={"/admin/allproducts"}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="26"
//                   height="36"
//                   fill="currentColor"
//                   className="bi bi-arrow-left back_arrow_icon"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//                   />
//                 </svg>
//               </Link>
//             </div>
//             <div className="update-product-container">
//               <h2>Update Category</h2>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData?.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label>Description:</label>
//                   <textarea
//                     name="description"
//                     value={formData?.description}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <button type="submit" className="update_product_button">
//                   {Updateloader ? <Loader /> : <div>Update Category</div>}
//                 </button>
//               </form>

//               {/* Subcategories Section */}
//               <h3>Subcategories</h3>
//               <ul>
//                 {subcategories.map((subcategory) => (
//                   <li key={subcategory._id}>
//                     <span>{subcategory.name}</span>
//                     <button onClick={() => handleEditSubcategory(subcategory)}>
//                       Edit
//                     </button>
//                     <button onClick={() => handleDeleteSubcategory(subcategory._id)}>
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               {/* Edit Subcategory Section */}
//               {editSubcategoryId && (
//                 <div>
//                   <h3>Edit Subcategory</h3>
//                   <form onSubmit={handleEditSubcategorySubmit}>
//                     <div>
//                       <label>Name:</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={editSubcategoryData.name}
//                         onChange={handleEditSubcategoryChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Description:</label>
//                       <textarea
//                         name="description"
//                         value={editSubcategoryData.description}
//                         onChange={handleEditSubcategoryChange}
//                       />
//                     </div>
//                     <button type="submit">Update Subcategory</button>
//                   </form>
//                 </div>
//               )}

//               {/* Add New Subcategory */}
//               <h3>Add New Subcategory</h3>
//               <form onSubmit={handleSubcategorySubmit}>
//                 <div>
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={newSubcategory.name}
//                     onChange={handleSubcategoryChange}
//                   />
//                 </div>
//                 <div>
//                   <label>Description:</label>
//                   <textarea
//                     name="description"
//                     value={newSubcategory.description}
//                     onChange={handleSubcategoryChange}
//                   />
//                 </div>
//                 <button type="submit">Add Subcategory</button>
//               </form>
//             </div>
//           </div>
//         )}
//       </>
//     </div>
//   );
// }

// export default Editcategories;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import "../../style/updatecategory.css";

function Editcategories() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [loading, setLoading] = useState(false);
  const [Updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    description: "",
  });
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [editSubcategoryData, setEditSubcategoryData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-category/${Id}`, "GET");
        setProduct(response.data.category);
        setSubcategories(response.data.subcategory);
        setFormData({
          name: response.data.category.name,
          description: response.data.category.description,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [Id]);

  // Update category details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      const updateProduct = await makeApi(`/api/update-category/${Id}`, "PUT", formData);
      console.log("Product updated successfully!", updateProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdateLoader(false);
      navigate("/admin/all-categories");
    }
  };

  // Add new subcategory
  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi("/api/create-sub-category", "POST", {
        ...newSubcategory,
        category: Id,
      });
      setSubcategories([...subcategories, response.data.subcategory]);
      setNewSubcategory({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  // Delete subcategory
  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await makeApi(`/api/delete-sub-category/${subcategoryId}`, "DELETE");
      setSubcategories(subcategories.filter((sub) => sub._id !== subcategoryId));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  // Start editing a subcategory
  const handleEditSubcategory = (subcategory) => {
    setEditSubcategoryId(subcategory._id);
    setEditSubcategoryData({
      name: subcategory.name,
      description: subcategory.description,
    });
  };

  // Handle the edit form submission
  const handleEditSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi(
        `/api/update-sub-category/${editSubcategoryId}`,
        "PUT",
        editSubcategoryData
      );
      setSubcategories(
        subcategories.map((sub) =>
          sub._id === editSubcategoryId ? response.data.subcategory : sub
        )
      );
      setEditSubcategoryId(null); // Reset edit mode
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubcategoryChange = (e) => {
    setNewSubcategory({
      ...newSubcategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubcategoryChange = (e) => {
    setEditSubcategoryData({
      ...editSubcategoryData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edut_catogry_container">
      {loading ? (
        <Loader />
      ) : (
        <div className="edut_catogry_main">
          <div className="edut_catogry_back_btn">
            <Link to={"/admin/all-categories"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="edut_catogry_back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>

          <div className="edut_catogry_form_container">
            <h2 className="edut_catogry_heading">Update Category</h2>
            <form onSubmit={handleSubmit} className="edut_catogry_form">
              <div className="edut_catogry_form_group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="edut_catogry_input"
                />
              </div>
              <div className="edut_catogry_form_group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className="edut_catogry_textarea"
                />
              </div>
              <button type="submit" className="edut_catogry_submit_btn">
                {Updateloader ? <Loader /> : <div>Update Category</div>}
              </button>
            </form>

            {/* Subcategories Section */}
            <h3 className="edut_catogry_sub_heading">Subcategories</h3>
            <ul className="edut_catogry_subcategory_list">
              {subcategories.map((subcategory) => (
                <li key={subcategory._id} className="edut_catogry_subcategory_item">
                  <span className="edut_catogry_subcategory_name">{subcategory.name}</span>
                  <button
                    className="edut_catogry_edit_btn"
                    onClick={() => handleEditSubcategory(subcategory)}
                  >
                    Edit
                  </button>
                  <button
                    className="edut_catogry_delete_btn"
                    onClick={() => handleDeleteSubcategory(subcategory._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            {/* Edit Subcategory Section */}
            {editSubcategoryId && (
              <div className="edut_catogry_edit_subcategory_form">
                <h3 className="edut_catogry_sub_heading">Edit Subcategory</h3>
                <form onSubmit={handleEditSubcategorySubmit}>
                  <div className="edut_catogry_form_group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editSubcategoryData.name}
                      onChange={handleEditSubcategoryChange}
                      className="edut_catogry_input"
                    />
                  </div>
                  <div className="edut_catogry_form_group">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={editSubcategoryData.description}
                      onChange={handleEditSubcategoryChange}
                      className="edut_catogry_textarea"
                    />
                  </div>
                  <button type="submit" className="edut_catogry_submit_btn">
                    Update Subcategory
                  </button>
                </form>
              </div>
            )}

            {/* Add New Subcategory */}
            <h3 className="edut_catogry_sub_heading">Add New Subcategory</h3>
            <form onSubmit={handleSubcategorySubmit} className="edut_catogry_form">
              <div className="edut_catogry_form_group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newSubcategory.name}
                  onChange={handleSubcategoryChange}
                  className="edut_catogry_input"
                />
              </div>
              <div className="edut_catogry_form_group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newSubcategory.description}
                  onChange={handleSubcategoryChange}
                  className="edut_catogry_textarea"
                />
              </div>
              <button type="submit" className="edut_catogry_submit_btn">
                Add Subcategory
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editcategories;
