import React from "react";

interface Props {
  url: string;
  userName: string;
  date: string;
  closeModal: () => void;
}

const PicModal: React.FC<Props> = (props) => {
  const { url, userName, date, closeModal } = props;

  return (
    <div className="modal d-block pic-open-modal" id="picOpenModal" aria-labelledby="picShareLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form className="form-box">
            <div className="modal-header">
              <h5 className="modal-title" id="picShareLabel">{userName}</h5>
              <h5 className="modal-date">{date}</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close" 
                onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="img-box">
                <img 
                  src={url} 
                  className="img-fluid d-block mx-auto" 
                  alt="img" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PicModal);
