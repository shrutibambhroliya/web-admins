import React, { useEffect, useState } from "react";

const CategoryList = ({ setLoading }) => {
  const [category, setCategory] = useState([]);
  const [editCategoryForm, setCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("you need to be logged in to get category!");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:4000/api/a1/category/getAllCategories",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        console.log("data", data);
        setCategory(data.data);
      } catch (error) {
        console.log("error fetching category..", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchCategory();
  }, []);

  const deleteCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("logged in your account!!!");
      return;
    }
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("only admin role deleted category!");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:4000/api/a1/category/c/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("deleted successfully!");
        setCategory(category.filter((cat) => cat._id !== categoryId));
      } else {
        console.log("failed to category deleted!!");
      }
    } catch (error) {
      console.log("error category delete process!");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const showEditForm = (category) => {
    setCategoryForm(true);
    setSelectedCategory(category);
    setName(category.name);
    setParentCategory(category.parentCategory);
    setType(category.type);
    setDescription(category.description);
  };
  const closeEditForm = () => {
    setCategoryForm(false);
    setSelectedCategory(null);
  };

  const updateCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      alert("please logged in your account!");
      return;
    }
    if (role !== "admin") {
      alert("only admin role updated category!!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/a1/category/c/${categoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, parentCategory, type, description }),
        }
      );

      if (!response.ok) {
        console.log("failed to update category!");
        return;
      }
      const data = await response.json();
      console.log("update category", data);
      setCategoryForm(false);
    } catch (error) {
      console.log("error category update process!", error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="relative">
        <div className={`${editCategoryForm ? "opacity-50" : ""}`}>
          <div className="flex justify-between items-center px-5 py-3 bg-slate-100 mb-3 ">
            <h1 className="text-[25px]  outfit-uniqueClass">Categories</h1>
          </div>
          <div className="grid  grid-cols-6 mb-3 px-16  text-gray-500 text-[16px] outfit-uniqueClass">
            <p className=" col-span-3 text-left">Name</p>
            <p className="col-span-1 text-center">Category</p>
            <p className="col-span-1 text-center">Type</p>
            <p className="col-span-1 text-center">Actions</p>
          </div>

          {category.map((item, index) => (
            <div key={index}>
              <div className="px-3 ">
                <ul className="grid  grid-cols-6 capitalize px-8 items-center bg-slate-100 py-1  text-[16px] border-b-2 border-slate-300 rounded outfit-uniqueClass">
                  <li className="col-span-3 text-left ">{item.name}</li>
                  <li className="col-span-1 text-center">
                    {item.parentCategory}
                  </li>
                  <li className="col-span-1 text-center">{item.type}</li>
                  <li className="col-span-1 text-center">
                    <button
                      onClick={() => showEditForm(item)}
                      className=" mr-2 bg-black text-white px-3 rounded py-1"
                    >
                      <i className="bx bx-edit-alt"></i> Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(item._id)}
                      className="py-1 px-1 rounded bg-gray-300 text-gray-500"
                    >
                      <i className="bx bxs-trash "></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editCategoryForm && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md w-1/3 m-auto relative outfit-uniqueClass">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[23px] font-semibold text-[#af5f87]">
                Edit Category
              </h2>
              <button>
                <i onClick={closeEditForm} className="bx bx-x text-[30px]"></i>
              </button>
            </div>
            <div className="mb-4">
              <div className="mb-3">
                <label htmlFor="name" className="block mb-1 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-1 border rounded prox"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="block mb-1 font-semibold"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="prox border border-gray-300 px-3 p-1 rounded w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-semibold">
                  Parent Category
                </label>
                <select
                  value={parentCategory}
                  onChange={(e) => setParentCategory(e.target.value)}
                  className="w-full p-1 border rounded"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-semibold">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-1 border rounded"
                >
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Caps">Caps</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-[#FFEBF5] border border-pink-400  rounded"
                onClick={() => updateCategory(selectedCategory._id)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
