import React from "react";
import "./AddItems.css";

const AddItems = () => {
  const createProduct = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="px-[75px] py-[30px]">
        <form onSubmit={createProduct} className="flex flex-col gap-3">
          <h2 className="mb-2">Upload Image</h2>
          <div className="flex gap-2  ">
            <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
              <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
              <input className="file" name="text" type="file" />
              <p className="text-[12px] text-gray-600">Upload</p>
            </button>
            <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
              <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
              <input className="file" name="text" type="file" />
              <p className="text-[12px] text-gray-600">Upload</p>
            </button>
            <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
              <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
              <input className="file" name="text" type="file" />
              <p className="text-[12px] text-gray-600">Upload</p>
            </button>
            <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
              <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
              <input className="file" name="text" type="file" />
              <p className="text-[12px] text-gray-600">Upload</p>
            </button>
            <button className="container-btn-file border-dotted border-2 px-5 py-3 border-gray-300 ">
              <i className="bx bx-cloud-upload text-[26px] text-gray-400"></i>
              <input className="file" name="text" type="file" />
              <p className="text-[12px] text-gray-600">Upload</p>
            </button>
          </div>
          <div>
            <h2 className="mb-2">Product name</h2>
            <input
              className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
              type="text"
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <h2 className="mb-2">Product description</h2>
            <textarea
              className="prox border border-gray-300 w-full max-w-[500px] px-3 py-2 rounded"
              placeholder="Write content here"
              required
            ></textarea>
          </div>
          <div className="flex flex-row gap-8 w-full">
            <div>
              <p className="mb-2">Product category</p>
              <select className="prox border border-gray-300 w-full  px-3 py-2 rounded">
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <p className="mb-2">Product category</p>
              <select className="prox border border-gray-300 w-full px-3 py-2 rounded">
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWare">WinterWare</option>
              </select>
            </div>
            <div>
              <p className="mb-2">Product Price</p>
              <input
                className="prox max-w-[130px] border border-gray-300 px-3  py-2 rounded"
                type="number"
                placeholder="25"
              />
            </div>
          </div>
          <div>
            <p className="mb-2">Product Sizes</p>
            <div className="flex gap-3">
              <div>
                <p className="bg-slate-200 px-3 py-1 cursor-pointer">S</p>
              </div>
              <div>
                <p className="bg-slate-200 px-3 py-1 cursor-pointer">M</p>
              </div>
              <div>
                <p className="bg-slate-200 px-3 py-1 cursor-pointer">L</p>
              </div>
              <div>
                <p className="bg-slate-200 px-3 py-1 cursor-pointer">XL</p>
              </div>
              <div>
                <p className="bg-slate-200 px-3 py-1 cursor-pointer">XLL</p>
              </div>
            </div>
          </div>
          <button
            className="max-w-28 py-3 mt-4 bg-black text-white"
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
