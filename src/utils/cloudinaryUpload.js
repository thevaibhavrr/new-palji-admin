// // src/utils/cloudinaryUpload.js

// import axios from 'axios';

// const uploadToCloudinary = async (file, setUploadProgress) => {
//   try {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "wnsxe2pa");
//     data.append("folder", "SKFood")
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`,
//       data,
//       {
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           if (setUploadProgress) {
//             setUploadProgress(percentCompleted);
//           }
//         } 
//       }
//     );

//     if (response.status === 200) {
//       return response.data.url;
//     } else {
//       throw new Error('Failed to upload image');
//     }
//   } catch (error) {
//     console.error("Image upload error:", error);
//     throw error;
//   }
// };

// export default uploadToCloudinary;
// src/utils/cloudinaryUpload.js

// import axios from 'axios';
// import imageCompression from 'browser-image-compression';

// const uploadToCloudinary = async (file, setUploadProgress) => {
//   try {
//     // Options for image compression
//     const options = {
//       maxSizeMB: 1,          // Maximum size in MB
//       // maxWidthOrHeight: 800, // Maximum width or height
//       useWebWorker: true,    // Use web worker for compression

//     };

//     // Compress the image
//     const compressedFile = await imageCompression(file, options);

//     // Prepare form data for upload
//     const data = new FormData();
//     data.append("file", compressedFile);
//     data.append("upload_preset", "wnsxe2pa");
//     data.append("folder", "SKFood");

//     // Upload the compressed image to Cloudinary
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`,
//       data,
//       {
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           if (setUploadProgress) {
//             setUploadProgress(percentCompleted);
//           }
//         } 
//       }
//     );

//     if (response.status === 200) {
//       return response.data.url;
//     } else {
//       throw new Error('Failed to upload image');
//     }
//   } catch (error) {
//     console.error("Image upload error:", error);
//     throw error;
//   }
// };

// export default uploadToCloudinary;


import axios from 'axios';
import imageCompression from 'browser-image-compression';

const uploadToCloudinary = async (file, setUploadProgress, maxSizeKB = 800) => {
    console.log("-=-=-=-=-=-=-=",file);
  try {
    // Convert max size from KB to MB
    const maxSizeMB = maxSizeKB / 1024;

    // Options for image compression
    const options = {
      maxSizeMB: maxSizeMB,
      // maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    // Compress the image
    const compressedFile = await imageCompression(file, options);

    // Check if the compressed file size is within the desired range
    // if (compressedFile.size / 1024 > maxSizeKB) {
    //   throw new Error(`Unable to compress image to desired size. Current size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
    // }

    // Prepare form data for upload
    const data = new FormData();
    data.append("file", compressedFile);
    data.append("upload_preset", "pfendx01");
    data.append("folder", "Saburi");

    // email - interestingdriscoll3@typingsquirrel.com

    // Upload the compressed image to Cloudinary
    const response = await axios.post(
      // `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`,
      `https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
      data,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (setUploadProgress) {
            setUploadProgress(percentCompleted);
          }
        }
      }
    );

    if (response.status === 200) {
      return response.data.url;
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
