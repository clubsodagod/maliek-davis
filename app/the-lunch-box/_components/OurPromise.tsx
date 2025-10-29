import { Box, Container, Typography, Grid2, Card, CardContent, Stack, Button } from "@mui/material";
import Link from "next/link";
import { FadeIn } from "../_utility";




export function OurPromise() {
    const items = [
        { title: "Fresh ingredients, seasoned right.", body: "We let real ingredients do the talking and season to make flavors sing.", video: "https://www.pexels.com/download/video/5945027/"},
        { title: "Honest portions that hit the spot.", body: "Meals that satisfy without slowing you down — balance is the goal.", video: "https://www.pexels.com/download/video/13441377/"},
        { title: "Every dish crafted like it matters.", body: "Because it does. Care is the most important ingredient we use.", video: "https://www.pexels.com/download/video/7592545/"},
    ];
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }} className="bg-slate-50">
            <Container maxWidth="lg">
                <FadeIn>
                    <Typography variant="h4" className="font-bold text-center">Real Food. Real Flavor. No Shortcuts.</Typography>
                </FadeIn>
                <Grid2 container spacing={3} className="mt-6">
                    {items.map((item, i) => (
                        <Grid2 key={i} size={{ xs: 12, md: 4 }}>
                            <FadeIn delay={0.05 * i}>
                                <Card className="h-full shadow-md"><CardContent>
                                    <Typography variant="h6" className="font-semibold">{item.title}</Typography>
                                    <Typography className="mt-2 text-slate-600">{item.body}</Typography>
                                </CardContent></Card>
                            </FadeIn>
                        </Grid2>
                    ))}
                </Grid2>
                <FadeIn delay={0.2}>
                    <Stack alignItems="center" className="mt-8">
                        <Button component={Link} href="#menu" variant="contained" color="primary" size="large">See What’s Cooking</Button>
                    </Stack>
                </FadeIn>
            </Container>
        </Box>
    );
}