import { Whatshot, LocalDining } from "@mui/icons-material";
import { Box, Container, Grid2, Typography, Stack, Chip, Button, Card, CardContent } from "@mui/material";
import Link from "next/link";
import { FadeIn } from "../_utility";






export function WhyWeExist() {
    return (
        <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
            <Container maxWidth="lg">
                <Grid2 container spacing={6} alignItems="center">
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <FadeIn>
                            <Typography variant="h3" className="font-bold">Lunch doesn’t have to be bland.</Typography>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Typography className="mt-4 text-slate-600">
                                We were tired of quick bites that felt like an afterthought. So we made something better — quality food that’s full of life, flavor, and love. Every meal is cooked with care and built to satisfy — from crispy wings and garlic mash to sweet corn and salmon bites that melt in your mouth.
                            </Typography>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <Stack direction="row" spacing={1} className="mt-6">
                                <Chip icon={<Whatshot />} label="Flavor First" color="primary" variant="outlined" />
                                <Chip icon={<LocalDining />} label="Quality Made Simple" variant="outlined" />
                            </Stack>
                        </FadeIn>
                        <FadeIn delay={0.25}>
                            <Button component={Link} href="#menu" variant="text" className="mt-6 !normal-case">This isn’t fast food. It’s flavor that moves at your pace →</Button>
                        </FadeIn>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <FadeIn delay={0.15}>
                            <Card className="shadow-xl"><CardContent>
                                <div className="aspect-video w-full rounded-2xl bg-slate-100 Grid2 place-items-center">
                                    <span className="text-slate-500">Behind‑the‑scenes prep reel placeholder</span>
                                </div>
                            </CardContent></Card>
                        </FadeIn>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
}