
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    name: string;
    email: EmailAddress;
}

export interface UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<EmailAddress>;
}

export interface Card {
    __typename?: 'Card';
    ID: string;
    name?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    card(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    __typename?: 'User';
    id: string;
    name: string;
    email: EmailAddress;
}

export interface IMutation {
    __typename?: 'IMutation';
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export type EmailAddress = string;
type Nullable<T> = T | null;
