import QuickAccessIcon from "../QuickAccessIcon/QuickAccessIcon";
import githubIcon from '@/public/assets/github.svg';
import gmailIcon from '@/public/assets/gmail.png';
import youtubeIcon from '@/public/assets/youtube.png';
import leetcodeIcon from '@/public/assets/leetcode.png';
import hackerrankIcon from '@/public/assets/hackerrank.png';
import speedtestIcon from '@/public/assets/fast.png';
import instagramIcon from '@/public/assets/instagram.png';
import udemyIcon from '@/public/assets/udemy.png';
import excalidrawIcon from '@/public/assets/excalidraw.svg';
import linkedinIcon from '@/public/assets/linkedin.png';
import whatsappIcon from '@/public/assets/whatsapp.png';
import chatGptIcon from '@/public/assets/chatgpt.png';
import styling from './QuickAccess.module.css';

const linkObj = [
    {
        iconSrc: youtubeIcon,
        title: 'YouTube',
        href: 'https://www.youtube.com/',
        key:1
    },

    {
        iconSrc: gmailIcon,
        title: 'Gmail',
        href: 'https://mail.google.com/',
        key:2
    },
    {
        iconSrc: githubIcon,
        title: 'Github',
        href: 'https://github.com/techlism',
        key:3
    },

    {
        iconSrc: leetcodeIcon,
        title: 'LeetCode',
        href: 'https://leetcode.com/',
        key:4
    },
    
    {
        iconSrc: chatGptIcon,
        title: 'ChatGPT',
        href: 'https://chat.openai.com/',
        key:5
    },

    {
        iconSrc: hackerrankIcon,
        title: 'HackerRank',
        href: 'https://www.hackerrank.com/',
        key:6
    },

    {
        iconSrc: speedtestIcon,
        title: 'Speedtest',
        href: 'https://fast.com/',
        key:7
    },
    {
        iconSrc: instagramIcon,
        title: 'Instagram',
        href: 'https://www.instagram.com/',
        key:8
    },
    {
        iconSrc: udemyIcon,
        title: 'Udemy',
        href: 'https://www.udemy.com/',
        key:9
    },
    {
        iconSrc: excalidrawIcon,
        title: 'Excalidraw',
        href: 'https://excalidraw.com/',
        key:10
    },
    {
        iconSrc: linkedinIcon,
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/',
        key:11
    },
    {
        iconSrc: whatsappIcon,
        title: 'WhatsApp',
        href: 'https://web.whatsapp.com/',
        key:12
    },
];

const QuickAccess = function () {
    return(
        <div className={styling.quickAccessDiv}>
            {linkObj.map((obj)=>(
                <QuickAccessIcon href={obj.href} iconSrc={obj.iconSrc} title={obj.title} key={obj.key}/>
            ))}
        </div>
    )
}
export default QuickAccess;