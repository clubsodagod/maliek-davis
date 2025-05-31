// components/cards/UserCard.tsx

import ComponentTransition from "@/components/layout/ComponentTransition";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { IUser } from "@/database/models/user.model";
import { CardHeader, CardContent, Typography } from "@mui/material";


type UserCardProps = {
    user: IUser;
};

const UserAccountRegistrationCard: React.FC<UserCardProps> = ({ user }) => {

    const open = true;

    const springTransition = {
        type: "spring",
        stiffness: 80,
        damping: 15,
        bounce: 0.25,
        duration: 0.6,
    };

    return (
        <ComponentTransition id={`transition-card-access`}>
            <MotionDiv
                className="caseStudy-card overflow-hidden rounded-t-4xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: open ? 1 : 1, y: open ? 0 : 0, scale: open ? 1 : 1.03 }}
                exit={{ opacity: 0, y: 10 }}
                transition={springTransition}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: "1px -6px 8px  #17171747",
                }}
            >
                <CardHeader className="text-xl font-semibold text-center">
                    Welcome, {user.firstName} {user.lastName}!
                </CardHeader>
                <CardContent className="space-y-3 text-left">
                    <Typography><strong>Username:</strong> {user.username}</Typography>
                    <Typography><strong>Email:</strong> {user.email}</Typography>
                    <Typography><strong>Role:</strong> {user.role}</Typography>
                    <Typography><strong>Membership:</strong> {user.membershipTier}</Typography>
                    <Typography><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</Typography>
                    <Typography><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</Typography>
                </CardContent>
            </MotionDiv>
        </ComponentTransition>

    );
};

export default UserAccountRegistrationCard;
