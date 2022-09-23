import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";

const ShowCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showAddNewCategory, setShowAddNewCategory] = useState(false);
  const [showEditCtegory, setShowEditCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/categories");
    const req_data = data.allCategories;
    setCategories(req_data);
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteCategory = (id, e) => {
    e.preventDefault();
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/category/${id}`)
      .then((res) => console.log(res));

    window.location.reload(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      categoryName: newCategoryName,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/categories/new`,
      formData,
      config
    );
    window.location.reload(false);
  };

  console.log(showAddNewCategory);
  return (
    <>
      <form onSubmit={submitHandler}>
        <h3>add new Category:</h3>
        <input
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <div>
        <table>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>

          {categories.map((e) => (
            <tr key={e._id}>
              <td>{e.categoryName}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/category/${e._id}`);
                  }}
                >
                  Show Products
                </button>
                <button
                  onClick={() => {
                    navigate(`/EditCategory/${e._id}`);
                  }}
                >
                  Edit
                </button>
                <button onClick={(ev) => deleteCategory(e._id, ev)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default ShowCategory;
