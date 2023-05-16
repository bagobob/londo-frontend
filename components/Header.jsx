import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import Wrapper from "./Wrapper";
import Image from "next/image";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import logo from "../public/images/logo.png";


const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    });


    return (
        <>
            <div className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
                <Wrapper className="h-[60px] flex justify-between items-center">
                    <Link href="/">
                        <Image src={logo} alt="logo" width={80} style={{ height: 'auto', width: 'auto' }} />
                    </Link>

                    <Menu />

                    {mobileMenu && (
                        <MenuMobile  setMobileMenu={setMobileMenu}  />
                    )}

                    <div className="flex items-center gap-2 text-black">
                        {/* Mobile icon start */}
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                            {mobileMenu ? (
                                <VscChromeClose
                                    className="text-[16px]"
                                    onClick={() => setMobileMenu(false)}
                                />
                            ) : (
                                <BiMenuAltRight
                                    className="text-[20px]"
                                    onClick={() => setMobileMenu(true)}
                                />
                            )}
                        </div>
                        {/* Mobile icon end */}
                    </div>
                </Wrapper>
            </div>
        </>

    )
}

export default Header