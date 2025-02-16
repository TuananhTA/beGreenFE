import useSWR from "swr";
import authorizeAxiosInstance from "./authorizeAxiosInstance";

// Hàm fetcher sử dụng axios
const fetcher = (url) => authorizeAxiosInstance.get(url).then((res) => res.data);

const useFetch = (url, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateOnFocus: true, // Refetch khi chuyển tab
        revalidateOnReconnect: true, // Refetch khi có mạng lại
        revalidateIfStale: true, // Refetch nếu dữ liệu cũ
        refreshInterval: 30000, // Tự động fetch lại mỗi 60 giây
        ...options,
    });

    return { data, error, isLoading, mutate };
};

export default useFetch;
