
export enum ROLE_TYPE {
    admin = 'admin',
    manager = 'manager',
    viewer = 'viewer'
}

export type JWTPayload = {
    roles: ROLE_TYPE[]
}
