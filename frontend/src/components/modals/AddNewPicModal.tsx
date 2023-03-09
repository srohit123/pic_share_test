import React from "react";
import { useFormik, FormikErrors } from "formik";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { ADD_IMAGE } from "../../utils/actionConstants";
import { urlValidate } from "../../utils/validateURL";

interface Props {
  closeModal: () => void;
}

interface InputValues {
  url: string;
  title: string;
}

const AddNewPicModal: React.FC<Props> = (props) => {
  const { closeModal } = props;
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const validate = (values: InputValues) => {
    const errors: FormikErrors<InputValues> = {};
    if (!values.url) {
      errors.url = "Required";
    } else if (!urlValidate(values.url) || values.url.trim() === "") {
      errors.url = "Please enter valid url !!!";
    }
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.trim() === "") {
      errors.title = "Please enter valid title !!!";
    }
    return errors;
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<InputValues>({
      initialValues: {
        url: "",
        title: "",
      },
      onSubmit: (values) => {
        dispatch({
          type: ADD_IMAGE,
          payload: {
            url: values.url,
            title: values.title,
            pathname,
          },
        });
        closeModal();
      },
      validate,
    });

  return (
    <div
      className="modal d-block"
      id="picShareModal"
      tabIndex={-1}
      aria-labelledby="picShareLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form className="form-box" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="picShareLabel">
                Share A New Picture
              </h5>
              <button
                type="button"
                onClick={closeModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group-wrap">
                <div className="form-group">
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="New picture URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.url}
                    autoComplete="off"
                  />
                  {touched.url && errors.url ? (
                    <small className="text-danger">{errors.url}</small>
                  ) : null}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    autoComplete="off"
                  />
                  {touched.title && errors.title ? (
                    <small className="text-danger">{errors.title}</small>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeModal}
                className="btn secondary-btn"
              >
                Cancel
              </button>
              <button type="submit" className="btn primary-btn">
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddNewPicModal);
