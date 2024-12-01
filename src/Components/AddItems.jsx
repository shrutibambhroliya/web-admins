import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddItems.css";

const AddItems = ({ setLoading }) => {
  const [parentCategory, setParentCategory] = useState("Men");
  const [type, setType] = useState("TopWear");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([
    { img1: null, img2: null, img3: null, img4: null },
  ]);
  const [previewImg, setPreviewImg] = useState({});

  const navigate = useNavigate();

  const parCat = ["Men", "Women", "Kids"];
  const categoryType = [
    "TopWear",
    "BottomWear",
    "WinterWear",
    "Shoes",
    "Belts",
    "HandBags",
    "Caps",
    "Glasses",
  ];

  const handleImageChange = (e, imageName) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    console.log("p", previewUrl);

    setImages((prevImg) => ({
      ...prevImg,
      [imageName]: file,
    }));
    console.log("p", imageName);
    setPreviewImg((prevImage) => ({
      ...prevImage,
      [imageName]: previewUrl,
    }));
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to create a product");
      navigate("/Login");
      return;
    }

    if (role !== "admin") {
      alert("You do not have permission to create a product!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("parentCategory", parentCategory);
    formData.append("type", type);

    if (images.img1) formData.append("images", images.img1);
    if (images.img2) formData.append("images", images.img2);
    if (images.img3) formData.append("images", images.img3);
    if (images.img4) formData.append("images", images.img4);
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/a1/products/createProduct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        console.log("Error creating product");
        return;
      }

      const data = await response.json();
      console.log("create successfully product!!", data);
      // Clear the form fields after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setParentCategory("Men");
      setType("TopWear");
      setImages([]);
      setPreviewImg({});
    } catch (error) {
      console.log("Error:", error);
      alert("product not created successfully!");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div>
      <div className="px-[75px] py-[30px]">
        <form onSubmit={createProduct} className="flex flex-col gap-3">
          <h2 className="mb-2 outfit-uniqueClass">Upload Image</h2>
          <div className="flex gap-2">
            {previewImg.img1 ? (
              <img src={previewImg.img1} alt="Preview" width={80} />
            ) : (
              <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
                <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
                <input
                  className="file"
                  name="text"
                  type="file"
                  onChange={(e) => handleImageChange(e, "img1")}
                />
                <p className="text-[12px] text-gray-600 outfit-uniqueClass">
                  Upload
                </p>
              </button>
            )}

            {previewImg.img2 ? (
              <img src={previewImg.img2} alt="Preview" width={80} />
            ) : (
              <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
                <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
                <input
                  className="file"
                  name="text"
                  type="file"
                  onChange={(e) => handleImageChange(e, "img2")}
                />
                <p className="text-[12px] text-gray-600 outfit-uniqueClass">
                  Upload
                </p>
              </button>
            )}

            {previewImg.img3 ? (
              <img src={previewImg.img3} alt="Preview" width={80} />
            ) : (
              <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
                <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
                <input
                  className="file"
                  name="text"
                  type="file"
                  onChange={(e) => handleImageChange(e, "img3")}
                />
                <p className="text-[12px] text-gray-600 outfit-uniqueClass">
                  Upload
                </p>
              </button>
            )}

            {previewImg.img4 ? (
              <img src={previewImg.img4} alt="preview" width={80} />
            ) : (
              <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
                <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
                <input
                  className="file"
                  name="text"
                  type="file"
                  onChange={(e) => handleImageChange(e, "img4")}
                />
                <p className="text-[12px] text-gray-600 outfit-uniqueClass">
                  Upload
                </p>
              </button>
            )}
          </div>

          <div>
            <h2 className="mb-2 outfit-uniqueClass">Product Name</h2>
            <input
              className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
              type="text"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <h2 className="mb-2 outfit-uniqueClass">Product Description</h2>
            <textarea
              className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
              placeholder="Write content here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-8 w-full ">
              <div className="">
                <p className="mb-2 outfit-uniqueClass">Product Category</p>
                {
                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="prox border border-gray-300 w-full px-3 py-2 rounded"
                    required
                  >
                    {/* <option value="" className="outfit-uniqueClass">
                      Select Category
                    </option> */}
                    {parCat.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="outfit-uniqueClass"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                }
              </div>
              <div>
                <p className="mb-2 outfit-uniqueClass"> Types</p>
                {
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="prox border border-gray-300 w-full px-3 py-2 rounded"
                    required
                  >
                    {/* <option value="" className="outfit-uniqueClass">
                      Select Types
                    </option> */}
                    {categoryType.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="outfit-uniqueClass"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                }
              </div>
            </div>
            <div className="flex flex-row gap-8 w-full">
              <div>
                <p className="mb-2 outfit-uniqueClass">Product Price</p>
                <input
                  className="prox max-w-[130px] border border-gray-300 px-3 py-2 rounded outfit-uniqueClass"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>
          </div>

          <button
            className="max-w-28 py-3 mt-4 bg-black text-white outfit-uniqueClass"
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

// // const AddItems = ({ setLoading }) => {
// //   const [category, setCategory] = useState([]);
// //   const [selectCategory, setSelectCategory] = useState("");
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [stock, setStock] = useState("");
// //   const [ratings, setRatings] = useState("");
// //   const [images, setImages] = useState([
// //     { img1: null, img2: null, img3: null, img4: null },
// //   ]);
// //   const [previewImg, setPreviewImg] = useState({});

// //   useEffect(() => {
// //     const fetchCategory = async () => {
// //       const token = localStorage.getItem("token");

// //       if (!token) {
// //         alert("You need to be logged in to create a product");
// //         return;
// //       }
// //       setLoading(true);
// //       try {
// //         const response = await fetch(
// //           "http://localhost:4000/api/a1/category/getAllCategories",
// //           {
// //             method: "GET",
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );
// //         if (!response.ok) {
// //           console.log("Data not fetched successfully!!");
// //           return;
// //         }
// //         const data = await response.json();
// //         console.log("data", data.data);
// //         setCategory(data.data); // Assuming `categories` is the array of categories
// //       } catch (error) {
// //         console.log("Error fetching category data", error);
// //       } finally {
// //         setTimeout(() => {
// //           setLoading(false);
// //         }, 3000);
// //       }
// //     };
// //     fetchCategory();
// //   }, []);

// //   const handleImageChange = (e, imageName) => {
// //     const file = e.target.files[0];
// //     const previewUrl = URL.createObjectURL(file);
// //     console.log("p", previewUrl);

// //     setImages((prevImg) => ({
// //       ...prevImg,
// //       [imageName]: file,
// //     }));
// //     console.log("p", imageName);
// //     setPreviewImg((prevImage) => ({
// //       ...prevImage,
// //       [imageName]: previewUrl,
// //     }));
// //   };

// //   const createProduct = async (e) => {
// //     e.preventDefault();

// //     const role = localStorage.getItem("role");
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       alert("You need to be logged in to create a product");
// //       return;
// //     }

// //     if (role !== "admin") {
// //       alert("You do not have permission to create a product!");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("name", name);
// //     formData.append("description", description);
// //     formData.append("price", price);
// //     formData.append("stock", stock);
// //     formData.append("ratings", ratings);
// //     formData.append("category", selectCategory); // Append selected category ID

// //     if (images.img1) formData.append("images", images.img1);
// //     if (images.img2) formData.append("images", images.img2);
// //     if (images.img3) formData.append("images", images.img3);
// //     if (images.img4) formData.append("images", images.img4);
// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         "http://localhost:4000/api/a1/products/createProduct",
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: formData,
// //         }
// //       );

// //       if (!response.ok) {
// //         console.log("Error creating product");
// //         return;
// //       }

// //       const data = await response.json();
// //       console.log("create successfully product!!", data);
// //       // Clear the form fields after successful submission
// //       setName("");
// //       setDescription("");
// //       setPrice("");
// //       setStock("");
// //       setRatings("");
// //       setSelectCategory("");
// //       setImages([]);
// //       setPreviewImg({});
// //     } catch (error) {
// //       console.log("Error:", error);
// //       alert("product not created successfully!");
// //     } finally {
// //       setTimeout(() => {
// //         setLoading(false);
// //       }, 3000);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="px-[75px] py-[30px]">
// //         <form onSubmit={createProduct} className="flex flex-col gap-3">
// //           <h2 className="mb-2 outfit-uniqueClass">Upload Image</h2>
// //           <div className="flex gap-2">
// //             {previewImg.img1 ? (
// //               <img src={previewImg.img1} alt="Preview" width={80} />
// //             ) : (
// //               <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
// //                 <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
// //                 <input
// //                   className="file"
// //                   name="text"
// //                   type="file"
// //                   onChange={(e) => handleImageChange(e, "img1")}
// //                 />
// //                 <p className="text-[12px] text-gray-600 outfit-uniqueClass">
// //                   Upload
// //                 </p>
// //               </button>
// //             )}

// //             {previewImg.img2 ? (
// //               <img src={previewImg.img2} alt="Preview" width={80} />
// //             ) : (
// //               <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
// //                 <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
// //                 <input
// //                   className="file"
// //                   name="text"
// //                   type="file"
// //                   onChange={(e) => handleImageChange(e, "img2")}
// //                 />
// //                 <p className="text-[12px] text-gray-600 outfit-uniqueClass">
// //                   Upload
// //                 </p>
// //               </button>
// //             )}

// //             {previewImg.img3 ? (
// //               <img src={previewImg.img3} alt="Preview" width={80} />
// //             ) : (
// //               <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
// //                 <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
// //                 <input
// //                   className="file"
// //                   name="text"
// //                   type="file"
// //                   onChange={(e) => handleImageChange(e, "img3")}
// //                 />
// //                 <p className="text-[12px] text-gray-600 outfit-uniqueClass">
// //                   Upload
// //                 </p>
// //               </button>
// //             )}

// //             {previewImg.img4 ? (
// //               <img src={previewImg.img4} alt="preview" width={80} />
// //             ) : (
// //               <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
// //                 <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
// //                 <input
// //                   className="file"
// //                   name="text"
// //                   type="file"
// //                   onChange={(e) => handleImageChange(e, "img4")}
// //                 />
// //                 <p className="text-[12px] text-gray-600 outfit-uniqueClass">
// //                   Upload
// //                 </p>
// //               </button>
// //             )}
// //           </div>

// //           <div>
// //             <h2 className="mb-2 outfit-uniqueClass">Product Name</h2>
// //             <input
// //               className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
// //               type="text"
// //               placeholder="Type here"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <h2 className="mb-2 outfit-uniqueClass">Product Description</h2>
// //             <textarea
// //               className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
// //               placeholder="Write content here"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               required
// //             ></textarea>
// //           </div>

// //           <div className="flex flex-col gap-3">
// //             <div className="flex flex-row gap-8 w-full ">
// //               <div className="">
// //                 <p className="mb-2 outfit-uniqueClass">Product Category</p>
// //                 {
// //                   <select
// //                     value={selectCategory}
// //                     onChange={(e) => setSelectCategory(e.target.value)}
// //                     className="prox border border-gray-300 w-full px-3 py-2 rounded"
// //                     required
// //                   >
// //                     <option value="" className="outfit-uniqueClass">
// //                       Select Category
// //                     </option>
// //                     {category.map((item) => (
// //                       <option
// //                         key={item._id}
// //                         value={item._id}
// //                         className="outfit-uniqueClass"
// //                       >
// //                         {item.parentCategory}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 }
// //               </div>
// //               <div>
// //                 <p className="mb-2 outfit-uniqueClass"> Types</p>
// //                 {
// //                   <select
// //                     value={selectCategory}
// //                     onChange={(e) => setSelectCategory(e.target.value)}
// //                     className="prox border border-gray-300 w-full px-3 py-2 rounded"
// //                     required
// //                   >
// //                     <option value="" className="outfit-uniqueClass">
// //                       Select Types
// //                     </option>
// //                     {category.map((item) => (
// //                       <option
// //                         key={item._id}
// //                         value={item._id}
// //                         className="outfit-uniqueClass"
// //                       >
// //                         {item.type}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 }
// //               </div>
// //             </div>
// //             <div className="flex flex-row gap-8 w-full">
// //               <div>
// //                 <p className="mb-2 outfit-uniqueClass">Product Price</p>
// //                 <input
// //                   className="prox max-w-[130px] border border-gray-300 px-3 py-2 rounded outfit-uniqueClass"
// //                   type="number"
// //                   value={price}
// //                   onChange={(e) => setPrice(e.target.value)}
// //                   placeholder="Enter price"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <p className="mb-2 outfit-uniqueClass">Product Stock</p>
// //                 <input
// //                   className="prox max-w-[130px] border border-gray-300 px-3 py-2 rounded outfit-uniqueClass"
// //                   type="number"
// //                   value={stock}
// //                   onChange={(e) => setStock(e.target.value)}
// //                   placeholder="Enter stock"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <p className="mb-2 outfit-uniqueClass">Product ratings</p>
// //                 <input
// //                   className="prox max-w-[130px] border border-gray-300 px-3 py-2 rounded outfit-uniqueClass"
// //                   type="number"
// //                   value={ratings}
// //                   onChange={(e) => setRatings(e.target.value)}
// //                   placeholder="2"
// //                   required
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             className="max-w-28 py-3 mt-4 bg-black text-white outfit-uniqueClass"
// //             type="submit"
// //           >
// //             ADD
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

export default AddItems;
