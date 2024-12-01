// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Category = ({ setLoading }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [parentCategory, setParentCategory] = useState("Men");
//   const [type, setType] = useState("TopWear");

//   const navigate = useNavigate();

//   const parCat = ["Men", "Women", "Kids"];
//   const categoryType = ["TopWear", "BottomWear", "WinterWear", "Shoes", "Caps"];

//   const createCategory = async (e) => {
//     e.preventDefault();

//     const role = localStorage.getItem("role");
//     if (role !== "admin") {
//       alert("you do not have permission to create a category!");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("you need to be logged in to create category!");
//       navigate("/Login");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/a1/category/createCategory",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             name,
//             description,
//             parentCategory,
//             type,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok!");
//       }

//       const data = await response.json();
//       console.log("Category created successfully!", data);

//       // alert("category creates successfully!");
//       setName("");
//       setDescription("");
//       setParentCategory("Men");
//       setType("TopWear");

//       setLoading(true);
//     } catch (error) {
//       console.log("error creating category", error);
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//       }, 2000);
//     }
//   };

//   return (
//     <div className="">
//       <div className="px-[75px] py-[30px]">
//         <form
//           onSubmit={createCategory}
//           className="flex flex-col gap-3 outfit-uniqueClass"
//         >
//           <h2 className="mb-2 text-[35px]">Create New Category</h2>

//           <div>
//             <h2 className="mb-2">Category Name</h2>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="prox border border-gray-300 px-3 py-2 rounded"
//               placeholder="Enter category name"
//               required
//             />
//           </div>
//           <div>
//             <h2 className="mb-2">Description</h2>
//             <textarea
//               className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Write content here"
//             ></textarea>
//           </div>
//           <div>
//             <h2 className="mb-2">Parent Category</h2>
//             <select
//               value={parentCategory}
//               onChange={(e) => setParentCategory(e.target.value)}
//               className="prox border border-gray-300  px-3 py-2 rounded"
//             >
//               <option value="" className="outfit-uniqueClass">
//                 Select Category
//               </option>
//               {parCat.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <h2 className="mb-2">Type</h2>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="prox border border-gray-300  px-3 py-2 rounded"
//             >
//               <option value="" className="outfit-uniqueClass">
//                 Select Type
//               </option>
//               {categoryType.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex justify-start items-center gap-4">
//             <button
//               className="max-w-[200px] py-3 px-2 mt-4 bg-black text-white rounded"
//               type="submit"
//             >
//               Create Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Category;
