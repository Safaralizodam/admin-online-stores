import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { axiosRequest } from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const PostProduct = () => {
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasDiscount, setHasDiscount] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
    setFieldValue('images', [...images, ...files]);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Product name is required';
    }
    if (!values.price) {
      errors.price = 'Price is required';
    } else if (values.price <= 0) {
      errors.price = 'Price must be a positive number';
    }
    if (values.discount < 0) {
      errors.discount = 'Discount cannot be negative';
    }
    if (!values.count) {
      errors.count = 'Count is required';
    } else if (values.count < 1) {
      errors.count = 'Count must be at least 1';
    }
    return errors;
  };

  async function postCart(formData) {
    try {
      await axiosRequest.post('Product/add-product', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/dashboard/product");
    } catch (error) {
      console.error(error);
    }
  }

  async function getBrands() {
    try {
      const { data } = await axiosRequest.get('Brand/get-brands');
      setBrands(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function getColors() {
    try {
      const { data } = await axiosRequest.get('Color/get-colors');
      setColors(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCategories() {
    try {
      const { data } = await axiosRequest.get('SubCategory/get-sub-category');
      setCategories(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBrands();
    getColors();
    getCategories();
  }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('ProductName', values.name);
    formData.append('Description', values.description);
    formData.append('Price', values.price);
    formData.append('Quantity', values.count);
    formData.append('BrandId', selectedBrand);
    formData.append('ColorId', selectedColor);
    formData.append('SubCategoryId', selectedCategory);
    formData.append('code', values.code);
    formData.append('HasDiscount', hasDiscount);

    images.forEach((file) => {
      formData.append('Images', file);
    });

    postCart(formData);
  };


  const goHome = async () => {
    navigate("/dashboard/product");
  };
  
  
  return (
    <div className="flex justify-center">
      <div className=" w-full p-8  rounded-lg">
      <button className='font-bold text-5xl' onClick={goHome}>←</button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h2>
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: '',
            count: '',
            code: '',
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold">Product Name</label>
                <Field
                  name="name"
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Code</label>
                <Field
                  name="code"
                  as="textarea"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product code"
                />
                <ErrorMessage name="code" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold">Product Price</label>
                  <Field
                    name="price"
                    type="number"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Count</label>
                  <Field
                    name="count"
                    type="number"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter count"
                  />
                  <ErrorMessage name="count" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Images</label>
                <input
                  name="images"
                  type="file"
                  multiple
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                />
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <FormControl fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      inputProps={{ 'aria-label': 'Color' }}
                    >
                      {colors.map((color) => (
                        <MenuItem key={color.id} value={color.id} style={{ backgroundColor: color.colorName }}>
                          {color.colorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      inputProps={{ 'aria-label': 'Brand' }}
                    >
                      {brands.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                          {brand.brandName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      inputProps={{ 'aria-label': 'Category' }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.subCategoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Has Discount:</label>
                <select
                  name="HasDiscount"
                  value={hasDiscount}
                  onChange={(e) => setHasDiscount(e.target.value === 'true')}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostProduct;
