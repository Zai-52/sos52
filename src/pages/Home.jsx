import { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";

import Form from "../components/Form.jsx";
import Item from "../components/Item.jsx";

import { useApp, queryClient } from "../ThemedApp.jsx";

import { useQuery, useMutation } from "react-query";

import {
    postPost,
    deletePost,
    fetchPosts,
    fetchFollowingPosts,
} from "../libs/fetcher.js";

// * Component
export default function Home() {

    const [showLatest, setShowLatest] = useState(true);

    // * Context
    const { showForm, setGlobalMsg, auth } = useApp();

    // * React Query
    const { isLoading, isError, error, data } = useQuery(
        ["posts", showLatest],
        () => {
            if (showLatest) {
                return fetchPosts();
            } else {
                return fetchFollowingPosts();
            }
        }
    );

    const remove = useMutation(async id => deletePost(id), {
        onMutate: async id => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData(["posts", showLatest], old =>
                old.filter(item => item.id !== id)
            );

            setGlobalMsg("A post deleted");
        },
    });

    // * Prop, React Query
    const add = useMutation(async content => postPost(content), {
        onSuccess: async post => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData(["posts", showLatest], old => [post, ...old]);
            setGlobalMsg("A post added");
        }
    });

    if (isError) {
        return (
            <Box display="flex" justifyContent="center" >
                <Alert
                    severity="warning"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 'fit-content'
                    }}
                >
                    {error.message}
                </Alert>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <Box sx={{ textAlign: "center" }}>
                Loading...
            </Box>
        );
    }

    return (
        <Box>

            {/* Conditional Rendering */}
            {/* If showForm true, the form behind && will be continue. */}
            {showForm && auth && <Form add={add} />}

            {auth && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Button
                        disabled={showLatest}
                        onClick={() => setShowLatest(true)}
                    >
                        Latest
                    </Button>

                    <Typography sx={{ color: "text.fade", fontSize: 15 }}>
                        |
                    </Typography>

                    <Button
                        disabled={!showLatest}
                        onClick={() => setShowLatest(false)}
                    >
                        Following
                    </Button>
                </Box>
            )}

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
    );
}