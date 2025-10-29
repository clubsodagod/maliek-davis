import { Box, Container, Typography, Grid2, Card, CardContent, Stack, Chip, Button } from "@mui/material";
import Link from "next/link";
import { FadeIn } from "../_utility";
import { MenuItem } from "../page";



export function SignatureMeals({ items }: { items: MenuItem[] }) {
    return (
        <Box id="menu" component="section" sx={{ py: { xs: 10, md: 14 } }}>
            <Container maxWidth="lg">
                <FadeIn>
                    <Typography variant="h4" className="font-bold text-center">Fan Favorites That Speak for Themselves</Typography>
                </FadeIn>
                <Grid2 container spacing={3} className="mt-6">
                    {items.map((m, i) => (
                        <Grid2 key={i} size={{ xs: 12, md: 6 }}>
                            <FadeIn delay={0.06 * i}>
                                <Card className="h-full shadow-md hover:shadow-lg transition-shadow"><CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" className="font-semibold">{m.name}</Typography>
                                        {m.tag && <Chip label={m.tag} size="small" variant="outlined" />}
                                    </Stack>
                                    <Typography className="mt-2 text-slate-600">{m.desc}</Typography>
                                </CardContent></Card>
                            </FadeIn>
                        </Grid2>
                    ))}
                </Grid2>
                <FadeIn delay={0.25}>
                    <Stack alignItems="center" className="mt-10">
                        <Button component={Link} href="#order" variant="outlined" size="large">Explore the Full Menu</Button>
                    </Stack>
                </FadeIn>
            </Container>
        </Box>
    );
}