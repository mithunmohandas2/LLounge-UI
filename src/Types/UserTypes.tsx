interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    image?: string,
    role: string,
    isBlocked: boolean,
    isVerified: boolean,
    qualification?: string,
    address?: {
        streetAddress: string,
        landmark: string,
        city: string,
        state: string,
        country: string,
        pincode: string,
    },
    enrolls?: [],
    createdAt: Date,
}

interface UserTypeRedux {
    userData: null | User,
    token: null | string,
}

export type { User, UserTypeRedux}