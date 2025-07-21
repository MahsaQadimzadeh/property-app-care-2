import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, auth } from '../firebase';

const BillUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('User not authenticated.');
      return;
    }

    setLoading(true);
    const fileRef = ref(storage, `bills/${user.uid}/${Date.now()}_${file.name}`);

    try {
      // 1. Upload file to Firebase Storage
      await uploadBytes(fileRef, file);

      // 2. Get download URL
      const downloadUrl = await getDownloadURL(fileRef);

      // 3. Send file URL + user info to backend for OCR
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/ocr/upload-and-process`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileUrl: downloadUrl,
            uid: user.uid,
            email: user.email,
          }),
        }
      );

      const result = await res.json();
      console.log('Server response:', result);
      alert('Upload & processing complete!');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload or processing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload & Process'}
      </button>
    </div>
  );
};

export default BillUploader;



//////////////////////////////////////////////////////////////////////
// // //Automatically associate the uploaded file with the logged-in user:
// import React, { useState } from 'react';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// // import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage, auth } from '../firebase';

// const BillUploader: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFile(e.target.files?.[0] || null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file.');
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       alert('User not authenticated.');
//       return;
//     }

//     setLoading(true);
//     const fileRef = ref(storage, `bills/${user.uid}/${Date.now()}_${file.name}`);

//     try {
//       // Upload file to Firebase Storage
//       await uploadBytes(fileRef, file);

//       // Get download URL
//       const downloadUrl = await getDownloadURL(fileRef);

//       // Send file URL + user info to backend for OCR

//       //LATER REPLACE THE BELOW WITH "const res = await fetch('https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/upload-and-process', {
//       //WHICH WILL BE  : 

//         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ocr/upload-and-process`, {

//       //general local host: sconst res = await fetch('http://localhost:5000/api/ocr/upload-and-process', {
//       ///My Specific local host: const res = await fetch('http://localhost:5173/api/ocr/upload-and-process', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fileUrl: downloadUrl,
//           uid: user.uid,
//           email: user.email,
//         }),
//       });

//       const result = await res.json();
//       console.log('Server response:', result);
//       alert('Upload & processing complete!');
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Upload or processing failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload & Process'}
//       </button>
//     </div>
//   );
// };

// export default BillUploader;



////////////////////////////////////////////
// //Automatically associate the uploaded file with the logged-in user:
// import React, { useState } from 'react';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage, auth } from '../firebase';

// const BillUploader: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFile(e.target.files?.[0] || null);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert('Please select a file.');
//     const user = auth.currentUser;
//     if (!user) return alert('User not authenticated.');

//     setLoading(true);
//     const fileRef = ref(storage, `bills/${user.uid}/${Date.now()}_${file.name}`);
//     try {
//       // 1. Upload to Firebase Storage
//       await uploadBytes(fileRef, file);
//       const downloadUrl = await getDownloadURL(fileRef);

//       // 2. Send to backend for OCR + storage
//       const res = await fetch('http://localhost:5000/api/ocr/upload-and-process', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fileUrl: downloadUrl,
//           uid: user.uid,
//           email: user.email,
//         }),
//       });

//       const result = await res.json();
//       console.log(result);
//       alert('Upload + processing complete!');
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload & Process'}
//       </button>
//     </div>
//   );
// };

// export default BillUploader;


//////////////////////////////////////////
///without associating the login with uploaded pics:

// import React, { useState } from 'react';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../firebase';

// const BillUploader: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [url, setUrl] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const uploadedFile = e.target.files?.[0];
//     if (uploadedFile) setFile(uploadedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("No file selected");
//     const fileRef = ref(storage, `bills/${Date.now()}_${file.name}`);
//     try {
//       await uploadBytes(fileRef, file);
//       const downloadUrl = await getDownloadURL(fileRef);
//       setUrl(downloadUrl);
//       alert('Upload successful!');
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
//       <button onClick={handleUpload}>Upload</button>
//       {url && (
//         <p>
//           File uploaded: <a href={url} target="_blank" rel="noreferrer">{url}</a>
//         </p>
//       )}
//     </div>
//   );
// };

// export default BillUploader;
