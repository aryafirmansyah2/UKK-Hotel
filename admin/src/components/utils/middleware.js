export const Middleware = (router) => {
    if (typeof window !== 'undefined') {
        const role = sessionStorage.getItem('role')
        const token = sessionStorage.getItem('token')

        if (!token && !role) {
            router.push('/login');
        }
    }



};
