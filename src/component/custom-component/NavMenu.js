import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaHome, FaInfoCircle, FaRss, FaPhone, FaBriefcase, FaGraduationCap, FaQuoteLeft, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import { AiTwotonePicture } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
const NavIcon = ({ icon }) => {
    const iconMap = {
        'fa-tachometer-alt': <FaTachometerAlt />,
        'fa-home': <FaHome />,
        'fa-info-circle': <FaInfoCircle />,
        'fa-rss': <FaRss />,
        'fa-phone': <FaPhone />,
        'fa-briefcase': <FaBriefcase />,
        'fa-graduation-cap': <FaGraduationCap />,
        'fa-quote-left': <FaQuoteLeft />,
        'fa-question-circle': <FaQuestionCircle />,
        'fa-user-circle-o': <FaUserCircle />,
        'fa-picture-o': <AiTwotonePicture />,
        'fa-landing-page': <MdLeaderboard />
    };
    return iconMap[icon] || null;
};

const NavMenu = ({ items }) => (
    <>
        {items.map((item, index) => (
            <React.Fragment key={index}>
                {item.isHeader ? (
                    <li className="nav-header">{item.title}</li>
                ) : (
                    <li className={`nav-item ${item.hasChildren ? 'has-treeview' : ''} ${item.isActive ? 'menu-open' : ''}`}>
                        <Link to={item.path || '#'} className={`nav-link ${item.isActive ? 'active' : ''}`}>
                            <NavIcon icon={item.icon} className="nav-icon" />
                            <p className='ps-2'>
                                {item.title}
                                {item.hasChildren && <><i className="fa fa-angle-left right" /><span className="badge badge-info right">{item.children.length}</span></>}
                            </p>
                        </Link>
                        {item.hasChildren && (
                            <ul className="nav nav-treeview">
                                <NavMenu items={item.children} />
                            </ul>
                        )}
                    </li>
                )}
            </React.Fragment>
        ))}
    </>
);

export default memo(NavMenu)