export interface UserData{
    user_id: string;
    user_name: string;
    user_lastname: string;
    user_password:string;
    user_email:string;
    user_balance: number;
    user_birthdate: Date;
}

export interface UserBalanceData{
    user_id: string;
    user_balance: number;
}
