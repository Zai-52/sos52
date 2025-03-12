import { Alert, Avatar, Box, Typography, ListItemSecondaryAction } from "@mui/material";
import { pink } from "@mui/material/colors";

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import { fetchUserPosts } from "../libs/fetcher.js";
import { queryClient } from "../ThemedApp.jsx";
import Item from "../components/Item.jsx";

import FollowButton from "../components/FollowButton";

export default function Profile() {

    const { id } = useParams();

    const { isLoading, isError, error, data } = useQuery(
        [`content/posts/user/${id}`],
        async () => fetchUserPosts(id)
    );

    const remove = useMutation(async id => deletePost(id), {
        onMutate: async id => {
            await queryClient.cancelQueries([`content/posts/user/${id}`]);
            await queryClient.setQueryData([`content/posts/user/${id}`], old =>
                old.filter(item => item.id !== id)
            );

            setGlobalMsg("A post deleted");
        },
    });

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
                    <Typography>{data[0].user.name}</Typography>
                    <Typography sx={{ fontSize: "0.8em", color: "text.fade", mb: 2 }}>
                        {data[0].user.bio}
                    </Typography>
                    <FollowButton user={data[0].user} />
                </Box>

            </Box>

            <Box>
                {data.map(item => {
                    return (
                        <Item
                            key={item.id}
                            item={item}
                            remove={remove.mutate}
                        />
                    );
                })}
            </Box>

        </Box>
    );
}