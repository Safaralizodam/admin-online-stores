import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosRequest } from '../../utils/axiosRequest';

const EditProduct = () => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brandId, setBrandId] = useState('');
  const [colorId, setColorId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const { data } = await axiosRequest.get(`/Product/get-product-by-id?id=${id}`);
        const product = data.data;
        setProductName(product.productName);
        setDescription(product.description);
        setCode(product.code);
        setPrice(product.price);
        setQuantity(product.quantity);
        setBrandId(product.brandId);
        setColorId(product.colorId);
        setSubCategoryId(product.subCategoryId);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductById();
  }, [id]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axiosRequest.get('/Brand/get-brands');
        setBrands(data.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { data } = await axiosRequest.get('/Color/get-colors');
        setColors(data.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosRequest.get('/SubCategory/get-sub-category');
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      Id: id,
      ProductName: productName,
      Description: description,
      Price: +price,
      Quantity: +quantity,
      BrandId: brandId,
      ColorId: colorId,
      SubCategoryId: subCategoryId,
      Code: code,
      HasDiscount: false,
    };

    try {
      const response = await axiosRequest.put('/Product/update-product', productData);
      if (response.status === 204) {
        navigate('/dashboard/product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold">Product Name</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product code"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">Product Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Quantity</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="gap-2 max-h-[300px] min-h-[300px] overflow-y-scroll flex flex-col">
              {colors.map((color) => (
                <div
                  key={color.id}
                  style={{
                    backgroundColor: color.colorName,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid black',
                    cursor: 'pointer',
                  }}
                  onClick={() => setColorId(color.id)}
                />
              ))}
            </div>
            <div className="gap-2 max-h-[400px] min-h-[400px] overflow-y-scroll flex flex-col">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => setBrandId(brand.id)}
                  className="cursor-pointer"
                >
                  {brand.brandName}
                </div>
              ))}
            </div>
            <div className="gap-2 max-h-[400px] min-h-[400px] overflow-y-scroll flex flex-col">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSubCategoryId(category.id)}
                  className="cursor-pointer"
                >
                  {category.subCategoryName}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Has Discount:</label>
            <select
              name="HasDiscount"
              onChange={(e) => {
                // Handle the change if necessary
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
