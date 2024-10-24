import { Alert, Avatar, Box, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import { useParams } from "react-router-dom";
import { fetchUser } from "../libs/fetcher.js";
import { useQuery, useMutation } from "react-query";

import { useApp, queryClient } from "../ThemedApp.jsx";

import Item from "../components/Item";

const api = import.meta.env.VITE_API;

export default function Profile() {

    const { id } = useParams();

    const { setGlobalMsg } = useApp();

    const { isLoading, isError, error, data } = useQuery(
        `users/${id}`,
        async () => fetchUser(id)
    );

    // * Prop
    const remove = useMutation(
        async id => {
            await fetch(`${api}/content/posts/${id}`, {
                method: "DELETE",
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(`users/${id}`);
                setGlobalMsg("A post deleted");
            },
        }
    );
    

    if (isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        );
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>
    }

    const username = data.username;

    return (
        <Box>

            <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }}></Box>

            <Box
                sx={{
                    mb: 4,
                    marginTop: "-60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />

                <Box sx={{ textAlign: "center" }}>
                    <Typography>{data.name}</Typography>
                    <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
                        {data.bio}
                    </Typography>
                </Box>
            </ Box>

            {data.posts.map(item => {
                return (
                    <Item
                        key={item.id}
                        item={item}
                        userId={item.userId}
                        username={username}
                        remove={remove.mutate}
                    />
                );
            })}
        </Box>
    );
}