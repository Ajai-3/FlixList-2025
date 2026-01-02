import axiosInstance from "./AxiosInstance";


export const getCast = async ( mediaType: string, id: string ) => {
    try {
        const endpoint = `/${mediaType}/${id}/credits`;
        const res = await axiosInstance.get(endpoint);
        const cast = res.data.cast;
        return cast;
    } catch (error) {
        console.error("Error fetching cast:", error);
        throw error;
    }
}