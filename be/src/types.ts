
export enum ROLE_TYPE {
    admin = 'admin',
    manager = 'manager',
    viewer = 'viewer'
}

export enum AUTH_PROVIDER {
    google = 'google'
}

export type JWTPayload = {
    sub: string 
    iss: string,
    aud: string,
    roles: ROLE_TYPE[]
    authProvider: AUTH_PROVIDER
}

