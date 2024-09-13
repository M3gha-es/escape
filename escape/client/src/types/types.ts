export interface User {
    firstName: string,
    lastName: string,
    userName?:string|undefined,
    email: string,
    password: string,
}

export interface Art{
    "id":number,
    "title":string,
    "desciption":string|null,
    "url":string,
    "access":"all"|"user"
}