import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Authors() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Author's Name is required"),
    city: Yup.string().required('Birth Date is required'),
    email: Yup.string().required('Biography is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      city: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (editMode) {
        const updatedUsers = users.map((user) => {
          if (user.id === editUserId) {
            return {
              ...user,
              ...values,
              address: { ...user.address, city: values.city },
              email: values.email,
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
          username: values.username,
          address: {
            city: values.city,
          },
          email: values.email,
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
      username: user.username,
      city: user.address.city,
      email: user.email,
    });
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const renderAddUserButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary mb-2 mt-1"
        onClick={formik.handleSubmit}
      >
        <span className="fw-bold">{editMode ? 'Edit Author' : '+ Add Author'}</span>
      </button>
    );
  };

  return (
    <div className="App">
      <h1 className="py-3">Authors</h1>

      <div>
        <div className="container">
          <input
            placeholder="Enter Author's Name"
            className="me-4 mb-3"
            type="text"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error">{formik.errors.username}</div>
          )}

          <input
            placeholder="Enter Birth Date dd/mm/yyyy"
            type="date"
            {...formik.getFieldProps('city')}
          />
          {formik.touched.city && formik.errors.city && (
            <div className="error">{formik.errors.city}</div>
          )}

          <br />
          <textarea
            placeholder="Biography of the Author..."
            type="text"
            className="me-5 mb-3"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
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
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Biography</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.username}</td>
                      <td>{user.address.city}</td>
                      <td>{user.email}</td>
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

export default Authors;
