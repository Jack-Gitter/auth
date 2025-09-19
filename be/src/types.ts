
export enum ROLE_TYPE {
    admin = 'admin',
    manager = 'manager',
    viewer = 'viewer'
}

export enum AUTH_PROVIDER {
    google = 'google'
}

export type JWTPayload = {
    roles: ROLE_TYPE[]
    email: string
    authProvider: AUTH_PROVIDER
    accessToken: string
}

