// components/ServiceCard.tsx

import LottieEmbed from "@/app/sell-my-house/_components/LottieEmbed";


interface ServiceItem {
    name: string;
    price: string | React.ReactNode;
}

interface ServiceCardProps {
    title: string;
    icon: string;
    services: ServiceItem[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, services }) => (
    <div className="bg-(--foreground) text-(--background) p-6 rounded-4xl shadow sm:min-w-[400px] sm:max-w-[500px] w-full sm:w-full">
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
        <LottieEmbed src={icon} height={200} width="100%" title={title} />
        <ul className="list-disc pl-5 space-y-1">
            {services.map((item, index) => (
                <li key={index}>
                    {item.name}: {item.price}
                </li>
            ))}
        </ul>
    </div>
);

export default ServiceCard;
