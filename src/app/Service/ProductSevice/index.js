import useFetch from "@/hooks/useFetch";

function getProduct({ page = 0, size = 10, keyword = "", options = {} }) {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (size) queryParams.append("size", size);
    if (keyword) queryParams.append("keyword", keyword);

    const url = `/product/get-product-page?${queryParams.toString()}`;


    return useFetch(url, options);
}


export {getProduct}