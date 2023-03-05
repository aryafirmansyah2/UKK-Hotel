export const MiddlewareLogin = (router) => {
    if (typeof window !== 'undefined') {
        const role = sessionStorage.getItem('role')
        const token = sessionStorage.getItem('token')

        if (token && role === "manager") {
            router.push('/kamar');
        }
        if (token && role === "resepsionis") {
            router.push('/pemesanan');
        }
    }



};
