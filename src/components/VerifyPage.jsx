import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import logo from '../../public/logo.jpg'; 

const VerifyPage = () => {
  const { certId } = useParams();
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const certRef = ref(db, `certificates/${certId}`);
    get(certRef).then(snapshot => {
      if (snapshot.exists()) {
        setCertData(snapshot.val());
      } else {
        setCertData(null);
      }
      setLoading(false);
    });
  }, [certId]);

  if (loading) return <p className="text-black text-center mt-10">Loading...</p>;

  if (certData === null) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl font-bold">❌ Certificate not found or invalid ID</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black font-sans px-4 py-10">
      <div className="max-w-3xl mx-auto text-center">

        {/* ✅ Logo */}
        <img 
          src={logo} 
          alt="Compliance360 Logo" 
          className="mx-auto w-40 mb-8"
        />

        {/* ✅ Status */}
        <div className="bg-green-100 border border-green-500 text-green-800 inline-block px-4 py-2 rounded mb-6 font-semibold">
          ✅ Authentic Certificate
        </div>

        {/* ✅ Certificate Info */}
        <p className="text-lg mt-6 leading-relaxed">
          This certificate is <strong>authentic</strong> and was issued to 
          <span className="text-blue-600 font-semibold"> {certData.name} </span> 
          by <span className="text-yellow-600 font-semibold">Compliance360</span> for:
        </p>

        {/* 🔽 Course - separate line */}
        <div className="text-purple-600 italic font-medium mt-2 mb-4 text-center break-words">
  "{certData.course}"
</div>


        {/* ✅ Date */}
        <p className="text-lg leading-relaxed text-center">
          <span className="text-gray-700">Commencement Date:</span> 
          <span className="text-pink-600"> {certData.date}</span>
        </p>

        <hr className="my-6 border-gray-300" />
      </div>
    </div>
  );
};

export default VerifyPage;
