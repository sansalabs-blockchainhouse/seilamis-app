import toast from "react-hot-toast"

export const toastError = (message: string, isSei: boolean) => {
    return toast.error(message, {
        style: {
            border: "1px solid #FFFFFF",
            color: "#FFFFFF",
            fontWeight: "bold",
            backgroundColor: isSei ? "#AA6938" : "#722AA3",
            padding: "12px",
            fontSize: "18px",
        }
    })
}

export const toastLoading = (message: string, isSei: boolean) => {
    return toast.loading(message, {
        style: {
            border: "1px solid #FFFFFF",
            color: "#FFFFFF",
            fontWeight: "bold",
            backgroundColor: isSei ? "#AA6938" : "#722AA3",
            padding: "12px",
            fontSize: "18px",
        }
    })
}

export const toastSuccess = (message: string, isSei: boolean) => {
    return toast.success(message, {
        style: {
            border: "1px solid #FFFFFF",
            color: "#FFFFFF",
            fontWeight: "bold",
            backgroundColor: isSei ? "#AA6938" : "#722AA3",
            padding: "12px",
            fontSize: "18px",
        }
    })
}