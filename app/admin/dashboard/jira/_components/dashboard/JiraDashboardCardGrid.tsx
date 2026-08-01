import { Box } from "@mui/material";
import {
  JiraDashboardCard,
  type JiraDashboardCardProps,
} from "./JiraDashboardCard";

export interface JiraDashboardCardGridProps {
  cards: JiraDashboardCardProps[];
}

export function JiraDashboardCardGrid({ cards }: JiraDashboardCardGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {cards.map((card) => (
        <JiraDashboardCard key={card.title} {...card} />
      ))}
    </Box>
  );
}
