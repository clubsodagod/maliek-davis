// components/feedback/VerificationSuccessCard.tsx

import { IUser } from "@/database/models/user.model";
import { Button, Typography } from "@mui/material";
import UserAccountRegistrationCard from "../register/UserAccountRegistrationCard";
import Link from "next/link";


type Props = {
    user: IUser;
    message: string;
};

const VerificationSuccessCard: React.FC<Props> = ({ user, message }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-6">
            <Typography className="text-green-600 text-xl font-semibold mb-4 opacity-0">
                {message}
            </Typography>
            <UserAccountRegistrationCard user={user} />
            <div className="w-1/3">
                <Button variant="contained"
                    LinkComponent={Link}
                    href="/admin/access/login"
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default VerificationSuccessCard;
