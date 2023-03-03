export const MiddlewareLogin = (router) => {
    if (typeof window !== 'undefined') {
        const role = localStorage.getItem('role')
        const token = localStorage.getItem('token')

        if (token && role === "manager") {
            router.push('/kamar');
        }
        if (token && role === "resepsionis") {
            router.push('/pemesanan');
        }
    }



};
