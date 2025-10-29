import { LocalDining  } from "@mui/icons-material";
import { Box, Container, Stack, Chip, Typography, Button } from "@mui/material";
import Link from "next/link";
import { FadeIn } from "../../_utility";
import HeroCarousel from "./HeroCarousel";



export function Hero() {
    return (
        <Box
            className={`bg-[#fafafa] dark:bg-[#232323] relative overflow-hidden`} component="section"  sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 10, md: 14 } }}>
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="blur-3xl opacity-30 bg-sky-500/30 w-[40rem] h-[40rem] rounded-full absolute -top-40 -left-32" />
                <div className="blur-3xl opacity-20 bg-red-500/30 w-[36rem] h-[36rem] rounded-full absolute -bottom-48 -right-40" />
            </div>
            <Container maxWidth="lg">
                <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={6}>
                    <Box sx={{ flex: 1 }}>
                        <FadeIn>
                            <Chip icon={<LocalDining />} label="The Lunch Box" color="primary" variant="filled" className="!font-semibold !tracking-wide" />
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Typography variant="h3" className="mt-6 font-extrabold leading-tight">
                                Bringing Bold <span className="text-amber-400">Flavor</span> to Lunch
                            </Typography>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <Typography variant="subtitle1" className="mt-4 text-slate-600 max-w-2xl">
                                Fresh, quality meals that crush bland. Pick a favorite and we&apos;ll handle the craving.
                            </Typography>
                        </FadeIn>
                    </Box>
                    {/* <FadeIn delay={0.2}>
                        <Box sx={{ flex: 1, borderRadius: 4, overflow: "hidden" }} className="shadow-2xl ring-1 ring-white/10">
                            <div className="relative aspect-[4/3] w-full bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-600">
                                <div className="absolute inset-0 grid place-items-center">
                                    <div className="text-center px-6">
                                        <Restaurant fontSize="large" />
                                        <p className="mt-2 text-slate-200">Cinematic food close‑ups here (video or image).</p>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </FadeIn> */}
                </Stack>
            </Container>
            <FadeIn delay={0.3}>
                <HeroCarousel />
            </FadeIn>
            <FadeIn delay={0.3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="mt-8 justify-center">
                    <Button size="large" variant="contained" color="primary" component={Link} href={"#order"} className="!px-7 !py-3 !text-base !shadow-lg">Order Now</Button>
                    <Button size="large" variant="outlined" color="secondary" component={Link} href={"#menu"} className="!px-7 !py-3 !text-base">View Menu</Button>
                </Stack>
            </FadeIn>
        </Box>
    );
}