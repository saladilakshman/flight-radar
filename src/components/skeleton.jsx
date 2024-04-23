import { Skeleton, Stack } from "@mui/material";
export const Loader = () => {
    return (
        <Stack direction="column" justifyContent="center" alignItems="baseline" spacing={2} sx={{ paddingInlineStart: 1 }}>
            <Skeleton sx={{ height: 250, width: { xs: 250, lg: 290 }, }} variant="rectangle" />
            <Skeleton variant="text" sx={{ width: '90%', height: 22 }} />
            <Skeleton variant="text" sx={{ width: '70%', height: 22 }} />
            <Skeleton variant="text" sx={{ width: '65%', height: 22 }} />
            <Skeleton variant="text" sx={{ width: '55%', height: 22 }} />
            <Skeleton variant="rectangle" sx={{ width: '95%', height: 28, borderRadius: 2, position: 'absolute', bottom: 5 }} />
        </Stack>
    )
}