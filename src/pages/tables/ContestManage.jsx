import React from "react";

const ContestManage = () => {
  return (
    <div>
      <div
        className=" mx-auto mb-4 mt-5"
        style={{
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        <button className="btn btn-primary mb-5">BẮT ĐẦU CUỘC THI</button>
        <div>
          <h1 className="text-success mb-5">CUỘC THI ĐANG ĐƯỢC DIỄN RA ...</h1>
          <h3 className="text-secondary mb-5">Câu hiện tại : 7</h3>
          <div className="d-flex">
            <div
              className="d-flex justify-content-center align-items-center m-auto    "
              style={{
                width: 200,
                height: 200,
                border: "1px solid #ccc",
                borderRadius: "50%",
              }}
            >
              <h1 className="text-secondary">27</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestManage;
