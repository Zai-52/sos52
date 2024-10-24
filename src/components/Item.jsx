import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton
} from "@mui/material";

import {
    Alarm as TimeIcon,
    AccountCircle as UserIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { formatRelative } from "date-fns";

import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

import { useApp } from "../ThemedApp.jsx";

export default function Item({ item, remove, primary, comment }) {

    const navigate = useNavigate();

    const { setGlobalMsg, auth } = useApp();

    return (
        <Card sx={{ mb: 2 }}>

            { primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}

            <CardContent onClick={() => {
                if (comment) return false;
                navigate(`/comments/${item.id}`);
            }}
                sx={{ cursor: "pointer" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "Center",
                            gap: 1,
                        }}
                    >
                        <TimeIcon fontSize="10" color="success" />
                        <Typography
                            variant="caption"
                            sx={{
                                color: green[500],
                            }}
                        >
                            {formatRelative(item.created, new Date())}
                        </Typography>
                    </Box>
                    <IconButton
                        sx={{ color: "text.fade" }}
                        size="small"
                        onClick={e => {
                            // ! use Delete IconButton for only delete, prevent for no rout to Comments page
                            e.stopPropagation();
                            if (auth) {
                                if (auth.id === item.userId) {
                                    remove(item.id);
                                } else {
                                    setGlobalMsg("Unauthorize to delete");
                                }
                            } else {
                                setGlobalMsg("User not authenticated");
                            }
                        }}
                    >
                        <DeleteIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                </Box>

                <Typography sx={{ my: 3 }}>{item.content}</Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        onClick={e => {
                            navigate(`/profile/${item.user.id}`);
                            e.stopPropagation();
                        }}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItem: "center",
                            gap: 1,
                        }}
                    >
                        <UserIcon
                            fontSize="12"
                            color="info"
                        />
                        <Typography variant="caption">
                            {item.user.username}
                        </Typography>
                    </Box>
                    <Box>
                        <LikeButton item={item} comment={comment} />
                        <CommentButton item={item} comment={comment} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}