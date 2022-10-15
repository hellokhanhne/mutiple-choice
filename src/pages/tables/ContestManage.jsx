import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const ContestManage = () => {
  const [isInContest, setIsInContest] = useState(false);

  const handleStart = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn bắt đầu trắc nghiệm !")) {
      return;
    }
    const ref = doc(db, "contest", "infomation");
    await setDoc(ref, {
      isInContest: true,
    });
  };

  const handleFinish = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn dừng trắc nghiệm !")) {
      return;
    }
    const ref = doc(db, "contest", "infomation");
    await setDoc(ref, {
      isInContest: false,
    });
  };

  useEffect(() => {
    const q = query(collection(db, "contest"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setIsInContest(querySnapshot.docs[0].data().isInContest);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <div
        className=" mx-auto mb-4 mt-5"
        style={{
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        <button
          onClick={() => handleStart()}
          disabled={isInContest}
          className="btn btn-primary mb-5 me-4"
        >
          BẮT ĐẦU CUỘC THI
        </button>
        <button
          onClick={() => handleFinish()}
          disabled={!isInContest}
          className="btn btn-danger mb-5"
        >
          DỪNG CUỘC THI
        </button>
        <div>
          {isInContest && (
            <h1 className="text-success mb-5">
              CUỘC THI ĐANG ĐƯỢC DIỄN RA ...
            </h1>
          )}
          {/* <h3 className="text-secondary mb-5">Câu hiện tại : 7</h3> */}
          {/* <div className="d-flex">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContestManage;
