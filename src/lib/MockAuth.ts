import { User, UserRole } from "@/types/user";

export const MockUser: User = {
    user_id: "123456987",
    email: "testemail@email.com",
    display_name: "Timbo Jones",
    display_image: "",
    user_role: UserRole.User,
    account_creation_date: new Date()
}