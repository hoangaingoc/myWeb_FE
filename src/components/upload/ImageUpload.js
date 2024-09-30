import {uploadToCloudinary} from "../utils/cloudinary";

export const handleImageUpload = async (image) => {
    if (image) {
        const imageUrl = await uploadToCloudinary(image); // Upload image to Cloudinary
        return imageUrl; // Return the Cloudinary image URL
    }
    return null;
};
