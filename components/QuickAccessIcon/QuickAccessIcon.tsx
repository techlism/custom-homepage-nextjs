import Image from "next/image";
import styling from './QuickAccessIcon.module.css';
import Link from "next/link";

type IconSource = any;
type Title = string;
type Href = string;

interface QuickAccessIconProps {
    iconSrc: IconSource;
    title: Title;
    href : Href;
}

const QuickAccessIcon: React.FC<QuickAccessIconProps> = ({iconSrc, title, href}) => {
    return(
        
            <div className={styling.iconDiv}>
                <a href={href}>
                    <Image src={iconSrc} alt={iconSrc} className={styling.iconImage} height={42} width={42} loading="lazy"/>
                    <p className={styling.iconPara}>{title}</p>
                </a>
            </div>

    )
}

export default QuickAccessIcon;