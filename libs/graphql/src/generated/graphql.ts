
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    __typename?: 'IQuery';
    user(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    __typename?: 'User';
    id: string;
    name: string;
    email: EmailAddress;
}

export type EmailAddress = string;
type Nullable<T> = T | null;
