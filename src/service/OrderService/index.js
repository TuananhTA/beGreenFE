import useFetch from "@/hooks/useFetch";
import authorizeAxiosInstance from "@/hooks/authorizeAxiosInstance";

async function createInPos(){
    try {
        const response = await authorizeAxiosInstance.post("/order/create-order-pending-in-pos");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo: ", error);
        throw error;
    }
}
async function getOrderPendingInPos(){
    try {
        const response = await authorizeAxiosInstance.get("/order/get-all-pending-offline");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo: ", error);
        throw error;
    }
}


export { createInPos, getOrderPendingInPos }