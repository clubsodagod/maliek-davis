"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useSectionObserver(threshold: number = 0.6) {
    const pathname = usePathname();

    useEffect(() => {
        const sections = document.querySelectorAll("[id*='section']"); // Select elements with "section" in id

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute("id");
                        if (sectionId) {
                            const newUrl = `${pathname}#${sectionId}`;
                            window.history.pushState(null, "", newUrl);
                        }
                    }
                });
            },
            { threshold: threshold }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [pathname, threshold]);
}
