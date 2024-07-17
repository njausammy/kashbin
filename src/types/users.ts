export interface IUserRead {
    phone_number: string;
    is_active: boolean;
    is_superuser: boolean;
    user_type: 'customer' | 'admin' | 'staff'; // Assuming these are the possible values
    verification_code: string;
    verified: boolean;
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    date_of_birth: string | null; // Assuming date_of_birth is in string format
    id: number;
}

export interface IUserWrite {
    phone_number: string;
    password: string;
}
