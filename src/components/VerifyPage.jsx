import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

const VerifyPage = () => {
  const { certId } = useParams();
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const certRef = ref(db, `certificates/${certId}`);
    get(certRef).then(snapshot => {
      if (snapshot.exists()) {
        setCertData(snapshot.val());
      } else {
        setCertData(null);
      }
    });
  }, [certId]);

  if (certData === null) {
    return <p className="text-red-500">Certificate not found or invalid ID</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Certificate Verification</h2>
      <p><strong>Name:</strong> {certData.name}</p>
      <p><strong>Date:</strong> {certData.date}</p>
      <p><strong>Course:</strong> {certData.course}</p>
      {/* Add more details as required */}
    </div>
  );
};

export default VerifyPage;
