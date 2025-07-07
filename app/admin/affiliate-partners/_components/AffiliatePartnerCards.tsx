import { MotionDiv } from "@/components/motion/MotionDiv";
import { ContentManagerCard } from "../../_components/content-manager/ContentManagerCards";
import { adminSections } from "../../_library/copy.const";



const AffiliatePartnerCards = ({ }) => {
    const blogPostActions = adminSections[4]?.subSections ?? [];
    return (
        <MotionDiv
            className='w-full h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12'
        >
            {
                blogPostActions.map((s, i) => {
                    return (
                        <ContentManagerCard
                            key={`${s.name} : ${i}`}
                            section={s}
                        />
                    )
                })
            }
        </MotionDiv>
    )
}



export default AffiliatePartnerCards;