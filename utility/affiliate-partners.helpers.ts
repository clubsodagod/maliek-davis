import { IAffiliatePartner } from "@/database/models/affiliate-partner.model";

export function calculateConversionRate(partner: IAffiliatePartner): number | null {
    if (!partner.performanceMetrics) return null;
    const { signups, clicks } = partner.performanceMetrics;
    if (!clicks || clicks === 0) return null;
    return parseFloat(((signups / clicks) * 100).toFixed(2));
}

export function getAffiliatePerformanceSummary(partner: IAffiliatePartner): string {
    const m = partner.performanceMetrics;
    if (!m) return "No data available.";
    return `Clicks: ${m.clicks}, Signups: ${m.signups}, Conversions: ${m.conversions}, Revenue: $${m.revenueGenerated || 0}`;
}
