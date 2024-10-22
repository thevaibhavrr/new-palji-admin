// import React, { useState } from "react";
// import "../../adminCss/catogory/AddCategory.css"; 
// import { makeApi } from "../../api/callApi";
// import { Link } from "react-router-dom";

// const Addcatogory = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       //   const response = await axios.post('/api/add-category', { name, description });
//       const response = await makeApi("/api/create-category", "POST", {
//         name,
//         description,  
//       });
//       if (response.status === 201) {
//         alert("Category added successfully");
//         setName("");
//         setDescription("");
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//       setErrorMessage("Error adding category. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div>
//         <Link to={"/admin/all-categories"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//       </div>
//       <div className="add-category">
//         <div className="add_category_div">Add Category</div>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="admin_add_product_button add_category_button"
//           >
//             Add Category
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Addcatogory;



import React, { useState } from "react";
import "../../adminCss/catogory/AddCategory.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subcategories, setSubcategories] = useState([{ name: "", description: "" }]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi("/api/create-category", "POST", {
        name,
        description,
        subcategorieslist: subcategories,
      });
      if (response.status === 201) {
        alert("Category added successfully");
        setName("");
        setDescription("");
        setSubcategories([{ name: "", description: "" }]);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setErrorMessage("Error adding category. Please try again.");
    }
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = subcategories.map((subcategory, i) =>
      i === index ? { ...subcategory, [field]: value } : subcategory
    );
    setSubcategories(updatedSubcategories);
  };

  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: "", description: "" }]);
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  return (
    <>
      <div>
        <Link to={"/admin/all-categories"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left back_arrow_icon back_button_add_category"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
      </div>
      <div className="add-category">
        <h2>Add Category</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Subcategory Section */}
          <div className="subcategory-section">
            <h2 className="text-center" >Subcategories</h2>
            {subcategories.map((subcategory, index) => (
              <div key={index} className="subcategory-form">
                <div className="form-group">
                  <label htmlFor={`subcategory-name-${index}`}  >Subcategory Name:</label>
                  <input
                    type="text"
                    id={`subcategory-name-${index}`}
                    value={subcategory.name}
                    onChange={(e) => handleSubcategoryChange(index, "name", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`subcategory-description-${index}`}>Subcategory Description:</label>
                  <textarea
                    id={`subcategory-description-${index}`}
                    value={subcategory.description}
                    onChange={(e) => handleSubcategoryChange(index, "description", e.target.value)}
                  />
                </div>
                <button type="button" onClick={() => removeSubcategory(index)} className="btn btn-danger">
                  Remove Subcategory
                </button>
              </div>
            ))}
            <button type="button" onClick={addSubcategory} className="btn btn-warning my-4">
              Add Subcategory
            </button>
          </div>

          <div className="text-center">

            <button
              type="submit"
              className="admin_add_product_button add_category_button "
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
