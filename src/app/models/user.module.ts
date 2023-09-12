export interface User {
    id:string;
    email:string;
    password:string;
    name:string;
    role:string;
    avatar:string;
}


export interface CreateUserDTO extends Omit<User,'id'|'role'>{}

export interface UserProfile extends User{
    creationAt?:string;
    updateAt?:string;
}