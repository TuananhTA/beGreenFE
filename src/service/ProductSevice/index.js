import useFetch from "@/hooks/useFetch";
import authorizeAxiosInstance from "@/hooks/authorizeAxiosInstance";

function getProduct({ page = 0, size = 10, keyword = "", options = {} }) {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (size) queryParams.append("size", size);
    if (keyword) queryParams.append("keyword", keyword);

    const url = `/product/get-product-page?${queryParams.toString()}`;


    return useFetch(url, options);
}
const addProduct = async (productData) => {
    try {
        const response = await authorizeAxiosInstance.post("/product/add-product", productData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error;
    }
};

const getUnit = async ()=>{
    const url = `product/get-unit`;
    try {
        const response = await authorizeAxiosInstance(url);
        return response.data;
    } catch (error) {
        console.error("Lỗi:", error);
        throw error;
    }
}

const getCategory = async ()=>{
    const url = `product/get-all-category`;
    try {
        const response = await authorizeAxiosInstance(url);
        return response.data;
    } catch (error) {
        console.error("Lỗi", error);
        throw error;
    }
}

export {getProduct, addProduct, getUnit , getCategory}