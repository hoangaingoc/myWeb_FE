import axios from 'axios';

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hoangngoc'); // Ensure you have a valid upload preset

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/hoangaingoc/image/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.secure_url;
        console.log(response.data.secure_url)
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
