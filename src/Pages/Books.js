import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Books() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN Number is required'),
    publicationDate: Yup.string().required('Publication Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (editMode) {
        const updatedUsers = users.map((user) => {
          if (user.id === editUserId) {
            return {
              ...user,
              ...values,
            };
          }
          return user;
        });
        setUsers(updatedUsers);
        setEditMode(false);
        setEditUserId(null);
      } else {
        const newUser = {
          id: users.length + 1,
          ...values,
        };
        setUsers([...users, newUser]);
      }

      formik.resetForm();
    },
  });

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditUserId(user.id);
    formik.setValues({
      title: user.title,
      author: user.author,
      isbn: user.isbn,
      publicationDate: user.publicationDate,
    });
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const renderAddUserButton = () => {
    return (
      <button type="button" className="btn btn-primary mb-2 mt-1" onClick={formik.handleSubmit}>
        <span className="fw-bold">{editMode ? 'Edit Book' : '+ Add Book'}</span>
      </button>
    );
  };

  return (
    <div className="App">
      <h1 className="py-3">Books</h1>

      <div>
        <div className="container">
          <input
            placeholder="Enter Title"
            type="text"
            className="me-5 mb-3"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}

          <input
            placeholder="Enter Author"
            type="text"
            {...formik.getFieldProps('author')}
          />
          {formik.touched.author && formik.errors.author && (
            <div className="error">{formik.errors.author}</div>
          )}

          <br />
          <input
            placeholder="Enter ISBN Number"
            type="text"
            className="me-5 mb-3"
            {...formik.getFieldProps('isbn')}
          />
          {formik.touched.isbn && formik.errors.isbn && (
            <div className="error">{formik.errors.isbn}</div>
          )}

          <input
            placeholder="Enter Publication Date dd/mm/yyyy"
            type="date"
            {...formik.getFieldProps('publicationDate')}
          />
          {formik.touched.publicationDate && formik.errors.publicationDate && (
            <div className="error">{formik.errors.publicationDate}</div>
          )}

          <br />

          <div className="w-100 d-flex justify-content-end">
            {renderAddUserButton()}
          </div>

          <div className="row">
            <div className="table-responsive">
              <table className="table table-success table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">ISBN Number</th>
                    <th scope="col">Publication Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.title}</td>
                      <td>{user.author}</td>
                      <td>{user.isbn}</td>
                      <td>{user.publicationDate}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info btn-sm me-1"
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
