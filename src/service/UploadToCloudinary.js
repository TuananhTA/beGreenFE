import dotenv from "dotenv";

dotenv.config();

let URL_UPLOAD = "ddnasugap"
let PRESET = "beGreen"

export async function uploadMultipleToCloudinary(files) {
    console.log("name" , URL_UPLOAD)
    const cloudinaryURL = `https://api.cloudinary.com/v1_1/${URL_UPLOAD}/image/upload`;

    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", PRESET);

        try {
            const response = await fetch(cloudinaryURL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!data.secure_url) {
                throw new Error(`Upload ảnh "${file.name}" thất bại!`);
            }

            return { name: file.name, url: data.secure_url };
        } catch (error) {
            console.error(`Lỗi khi upload ảnh "${file.name}":`, error);
            return null;
        }
    });

    // Chờ tất cả các ảnh upload xong
    const results = await Promise.all(uploadPromises);
    return results.filter(item => item !== null); // Lọc ra những ảnh upload thành công
}
