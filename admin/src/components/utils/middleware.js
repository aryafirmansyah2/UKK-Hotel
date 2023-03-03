export const Middleware = (router) => {
    if (typeof window !== 'undefined') {
        const role = localStorage.getItem('role')
        const token = localStorage.getItem('token')

        if (!token && !role) {
            router.push('/login');
        }
    }



};
