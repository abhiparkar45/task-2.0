import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShowProducts = () => {
  //const [currentProductName, setCurrentProductName] = useState("");
  const navigate = useNavigate();
  const [category_name, setCategory_name] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [deleteProduct_id, setDeleteProduct_id] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [UpdateProduct_id, setUpdateProduct_id] = useState("");
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [productPerPage, setProductPerPage] = useState(5);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [initialPageNumber, setInitialPageNumber] = useState([]);
  console.log(products);

  useEffect(() => {
    const { data } = axios
      .get(
        `http://localhost:4000/api/products/${id}?page=${currentPageNumber}&limit=${productPerPage}`
      )
      .then((res) => {
        setProducts(res.data.finalResult);
        setCategory_id(id);
        setTotalPages(res.data.totalPages);
        setProductPerPage(res.data.resultPerPage);
        setCurrentPageNumber(res.data.pageNumber);
        setInitialPageNumber(res.data.totalPagesArr);
        setCategory_name(res.data.categoryName);
      });
  }, [id, currentPageNumber, productPerPage]);

  const deleteProduct = (e, pID) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:4000/api/product/${pID}`)
      .then((res) => console.log(res));
    window.location.reload(false);
  };
  const submitHandler1 = async (e) => {
    e.preventDefault();

    const formData = {
      productName: productName,
      category: category_id,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/products/new`,
      formData,
      config
    );
    window.location.reload(false);
  };
  const updateProductFunc = async () => {
    const data = {
      productName: updatedProductName,
      category: category_id,
    };
    await axios
      .put(`http://localhost:4000/api/product/${UpdateProduct_id}`, data)
      .then((res) => console.log(res));

    window.location.reload(false);
  };
  const getAllProductDetail = async (pId) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product/${pId}`
    );
    console.log(data.product);
    setUpdatedProductName(data.product.productName);
    setUpdateProduct_id(data.product._id);
  };
  console.log(updatedProductName);
  console.log(deleteProduct_id);
  return (
    <>
      <button onClick={(e) => navigate("/")}>Back to Categories</button>

      <h3>Total Page: {totalPages}</h3>
      <h3>Product Per Page: {productPerPage}</h3>
      <h3>Set Products Per Page</h3>
      <select onChange={(ev) => setProductPerPage(ev.target.value)}>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <h3>Current Page Number:{currentPageNumber}</h3>

      <h3>
        Go To Page Number:{" "}
        <select onChange={(ev) => setCurrentPageNumber(ev.target.value)}>
          {initialPageNumber.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </h3>
      {editProduct ? (
        <>
          <hr />
          <h1>Update Product</h1>
          <form onSubmit={updateProductFunc}>
            <h5>Product Name:</h5>
            <input
              onChange={(e) => setUpdatedProductName(e.target.value)}
              value={updatedProductName}
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
        </>
      ) : (
        <>
          <hr />
          <h1>Add New Product</h1>
          <form onSubmit={submitHandler1}>
            <input
              onChange={(e) => setProductName(e.target.value)}
              placeholder="New Product Name"
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
        </>
      )}

      <table>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Category ID</th>
          <th>Category Name</th>
          <th>Actions</th>
        </tr>
        {products.map((e) => (
          <tr key={e._id}>
            <td>{e._id}</td>
            <td>{e.productName}</td>
            <td>{e.category}</td>
            <td>{category_name}</td>
            <td>
              <button
                type="button"
                value={e._id}
                onClick={(ev) => {
                  getAllProductDetail(ev.target.value);
                  setEditProduct(true);
                }}
              >
                Edit
              </button>
              <button
                value={e._id}
                onClick={(ev) => {
                  deleteProduct(ev, e._id);
                }}
              >
                Delete
              </button>
              {editProduct ? (
                <button onClick={() => setEditProduct(false)}>Add New</button>
              ) : (
                <></>
              )}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default ShowProducts;
