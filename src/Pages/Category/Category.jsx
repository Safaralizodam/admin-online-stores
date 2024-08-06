import React, { useEffect, useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { axiosRequest, apiUrl } from '../../utils/axiosRequest';

const Categories = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('category');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', imageUrl: '', imageFile: null });
  const [imagePreview, setImagePreview] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (formData.imageFile) {
      const previewUrl = URL.createObjectURL(formData.imageFile);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [formData.imageFile]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [data, searchQuery]);

  const fetchData = async () => {
    let url = '';
    switch (activeTab) {
      case 'category':
        url = 'Category/get-categories';
        break;
      case 'brand':
        url = 'Brand/get-brands';
        break;
      case 'color':
        url = 'Color/get-colors';
        break;
      default:
        return;
    }

    try {
      const response = await axiosRequest.get(url);
      setData(response.data.data);
    } catch (error) {
      console.error(`Error fetching ${activeTab} data:`, error);
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setIsEdit(true);
      setFormData({
        id: item.id,
        name: item.categoryName || item.brandName || item.colorName,
        imageUrl: item.categoryImage || '',
        imageFile: null
      });
      setImagePreview(item.categoryImage ? apiUrl + item.categoryImage : '');
    } else {
      setIsEdit(false);
      setFormData({ id: '', name: '', imageUrl: '', imageFile: null });
      setImagePreview('');
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, imageFile: event.target.files[0] });
  };

  const handleSubmit = async () => {
    let url = '';
    const formDataToSend = new FormData();
    let method = 'post';
    let headers = {};

    switch (activeTab) {
      case 'category':
        if (isEdit) {
          url = 'Category/update-category';
          method = 'put';
          formDataToSend.append('Id', formData.id);
        } else {
          url = 'Category/add-category';
          formDataToSend.append('CategoryName', formData.name);
          if (formData.imageFile) {
            formDataToSend.append('CategoryImage', formData.imageFile);
          } else {
            console.error('Image file is required for category.');
            return;
          }
        }
        formDataToSend.append('CategoryName', formData.name);
        headers = {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer YOUR_TOKEN_HERE' // Replace with actual token
        };
        break;
      case 'brand':
        url = isEdit ? 'Brand/update-brand' : 'Brand/add-brand';
        method = isEdit ? 'put' : 'post';
        formDataToSend.append('BrandName', formData.name);
        if (isEdit) {
          formDataToSend.append('Id', formData.id);
        }
        break;
      case 'color':
        url = isEdit ? 'Color/update-color' : 'Color/add-color';
        method = isEdit ? 'put' : 'post';
        formDataToSend.append('ColorName', formData.name);
        if (isEdit) {
          formDataToSend.append('Id', formData.id);
        }
        break;
      default:
        return;
    }

    try {
      await axiosRequest[method](url, formDataToSend, { headers });
      fetchData();
      handleClose();
    } catch (error) {
      console.error('Error adding/editing data:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    let url = '';
    switch (activeTab) {
      case 'category':
        url = `Category/delete-category?id=${id}`;
        break;
      case 'brand':
        url = `Brand/delete-brand?id=${id}`;
        break;
      case 'color':
        url = `Color/delete-color?id=${id}`;
        break;
      default:
        return;
    }

    try {
      await axiosRequest.delete(url);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error.response ? error.response.data : error.message);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      (item.categoryName || item.brandName || item.colorName)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderContent = () => {
    const displayData = searchQuery ? filteredData : data;
    switch (activeTab) {
      case 'category':
        return displayData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center mb-2">
              <div className='w-[20%] m-auto'>
                <img
                  src={apiUrl + item.categoryImage}
                  alt={item.categoryName}
                  className="w-[70px] h-12 object-cover mr-2"
                />
              </div>
              <div className="flex">
                <IconButton aria-label="edit" className="text-blue-500" onClick={() => handleOpen(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" className="text-red-500" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <div className="text-center text-sm font-medium">{item.categoryName}</div>
          </div>
        ));
      case 'brand':
        return displayData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xl">{item.brandName}</div>
              <div className="flex">
                <IconButton aria-label="edit" className="text-blue-500" onClick={() => handleOpen(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" className="text-red-500" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ));
      case 'color':
        return displayData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center text-xl">
                <div
                  style={{
                    borderRadius: '50%',
                    backgroundColor: item.colorName,
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                    border: '1px solid black'
                  }}
                ></div>
                {item.colorName}
              </div>
              <div className="flex">
                <IconButton aria-label="edit" className="text-blue-500" onClick={() => handleOpen(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" className="text-red-500" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('category')}
          >
            Category
          </button>
          <button
            className={`px-4 py-2 rounded ml-2 ${activeTab === 'brand' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('brand')}
          >
            Brand
          </button>
          <button
            className={`px-4 py-2 rounded ml-2 ${activeTab === 'color' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('color')}
          >
            Color
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => handleOpen()}
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <TextField
          fullWidth
          placeholder={`Search ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
          variant="outlined"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {renderContent()}
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? `Edit ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` : `Add New ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Name`}
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {activeTab === 'category' && (
            <>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2"
                  style={{ width: '100px', height: '100px' }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;
