import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Modal
} from '@mui/material';
import { Add, Edit, Delete, Search, DeleteSweep } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { apiUrl, axiosRequest } from '../../utils/axiosRequest';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Newest');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState('multiple'); // 'multiple' or 'single'
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosRequest.get('/Product/get-products');
        setProducts(response.data.data.products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      const allProductIds = products.map((product) => product.id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(newSelectedProducts);
  };

  const handleDeleteAll = () => {
    setDeleteMode('multiple');
    setModalOpen(true);
  };

  const handleDeleteSingle = (product) => {
    setProductToDelete(product);
    setDeleteMode('single');
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalConfirm = async () => {
    try {
      if (deleteMode === 'multiple') {
        await Promise.all(
          selectedProducts.map((productId) =>
            axiosRequest.delete(`Product/delete-product?id=${productId}`)
          )
        );
        setProducts(products.filter((product) => !selectedProducts.includes(product.id)));
        setSelectedProducts([]);
        setSelectAll(false);
      } else if (deleteMode === 'single' && productToDelete) {
        await axiosRequest.delete(`Product/delete-product?id=${productToDelete.id}`);
        setProducts(products.filter((product) => product.id !== productToDelete.id));
        setProductToDelete(null);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting products', error);
    }
  };

  const handleModalNo = () => {
    setSelectedProducts([]);
    setSelectAll(false);
    setModalOpen(false);
  };

  const handleEditProduct = (productId) => {
    navigate(`/dashboard/EditProduct/${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="w-full m-auto px-5">
      <div className='flex items-center justify-between mb-12'>
        <h1 className="text-2xl font-bold mb-5">Products</h1>
        <Link to="/dashboard/PostProduct">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add Product
          </Button>
        </Link>
      </div>
      <Toolbar className="flex justify-between mb-12">
        <div className='flex items-center space-x-4'>
          <TextField
            variant="outlined"
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            className="w-64"
          />
          <TextField
            select
            value={filter}
            onChange={handleFilterChange}
            variant="outlined"
            className="w-48"
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
            <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
            <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
          </TextField>
        </div>
        <Button variant="outlined" color="secondary" onClick={handleDeleteAll}>
          <DeleteSweep />
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Inventory</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box className="flex items-center">
                    <img src={`${apiUrl + product.image}`} alt={product.productName} className="w-12 h-12 mr-2" />
                    {product.productName}
                  </Box>
                </TableCell>
                <TableCell>{product.quantity} in stock</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditProduct(product.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteSingle(product)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box className="w-1/2 p-5 bg-white rounded shadow-lg mx-auto my-24">
          <Typography variant="h4" className="mb-4">
            {deleteMode === 'multiple' ? 'Delete Items' : 'Delete Product'}
          </Typography>
          <Typography variant="h6" className="mb-4">
            {deleteMode === 'multiple'
              ? `Are you sure you want to delete ${selectedProducts.length} selected items?`
              : 'Are you sure you want to delete this product?'}
          </Typography>
          <Box className="flex justify-end space-x-4">
            <Button variant="outlined" color="primary" onClick={handleModalNo}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={handleModalConfirm}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductList;
