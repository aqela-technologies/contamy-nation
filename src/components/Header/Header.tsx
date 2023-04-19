import {
    Box,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from "@material-ui/core";
import React, {useState} from "react";
import ArrowIcon from "../../assets/images/header-icons/arrow.png";
import BrainIcon from "../../assets/images/header-icons/brain.png";
import EyeIcon from "../../assets/images/header-icons/eye.png";
import FishIcon from "../../assets/images/header-icons/fish.png";
import {AqelaIcon, DiscordIcon, InstagramIcon, FacebookIcon} from "../Icons";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles, Theme} from "@material-ui/core/styles";
import useScrollDirection, {
    ScrollDirection,
} from "../../hooks/useScrollDirection";
import Image from "next/image";
import {scrollIntoView} from "../../utils";

const locations = [
    {
        name: "Contamy Nation",
        id: "mint-zone",
        icon: FishIcon,
    },
    {
        name: "Cards",
        id: "cards",
        icon: EyeIcon,
    },
    {
        name: "About Us",
        id: "about-us",
        icon: BrainIcon,
    },
    {
        name: "Upcoming",
        id: "upcoming",
        icon: ArrowIcon,
        disabled: true,
    },
];

interface StyleProps {
    scrollDirection: ScrollDirection;
}

export default function Header() {
    const scrollDirection = useScrollDirection();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (id: string) => {
        setTimeout(() => scrollIntoView(id));
        setAnchorEl(null);
    };

    return (
        <Box
            className={`${scrollDirection === "down" ? "sm:-top-[152px]" : "top-0"} ${scrollDirection === "down" ? "-top-[100px]" : "sm:top-0"} -h-[144px] sm:h-auto transition-all duration-500  bg-black h-[100px] w-full sticky z-header`}
            component="header" style={{
            background: "linear-gradient(black 80%,transparent)"
        }}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-6 lg:justify-start md:space-x-10">
                    <AqelaIcon width={40} height={40}/>
                    <div className="hidden sm:flex items-center justify-start lg:w-0 lg:flex-1 space-x-4">
                        {/* <TwitterIcon width={40} height={40} /> */}
                        <DiscordIcon width={40} height={40}/>
                        <InstagramIcon width={40} height={40}/>
                        <FacebookIcon width={40} height={40}/>
                    </div>
                    <div className="-mr-2 -my-2 lg:hidden">
                        <IconButton
                            id="fade-button"
                            aria-controls={open ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon
                                color="primary"
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </IconButton>
                    </div>
                    <nav className="hidden lg:flex space-x-10">
                        {locations.map((item) => {
                            const anchor = (
                                <a
                                    key={item.name}
                                    onClick={() => {
                                        scrollIntoView(item.id);
                                    }}
                                    className={`md:flex items-center flex-col text-base text-gray-300 opacity-80 max-h-[104px] ${
                                        item.disabled ? "" : "hover:opacity-100"
                                    } ${item.disabled ? "" : "hover:text-white"}  font-bold ${
                                        item.disabled ? "" : "cursor-pointer"
                                    }`}
                                >
                                    <span className="font-aaargh">{item.name}</span>
                                    <img
                                        className={`object-fill max-h-20 ${
                                            item.disabled ? "opacity-50" : ""
                                        }`}
                                        src={item.icon.src}
                                        alt={item.name}
                                    />
                                </a>
                            );
                            if (item.disabled)
                                return (
                                    <Tooltip key={item.name} title="Sometime in the future...">
                                        {anchor}
                                    </Tooltip>
                                );
                            return anchor;
                        })}
                    </nav>
                </div>
            </div>

            <Menu
                id="fade-menu"
                PaperProps={{
                    className: "bg-black",
                }}
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {locations.map((item) => (
                    <MenuItem
                        key={item.id}
                        className="flex items-center"
                        onClick={() => {
                            handleClose(item.id);
                        }}
                    >
                        <Image src={item.icon} width={50} height={50} alt={item.name}/>
                        <span
                            className={`ml-3 font-aaargh text-base font-medium text-white ${
                                item.disabled ? "opacity-50" : ""
                            }`}
                        >
              {item.name}
            </span>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
